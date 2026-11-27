/**
 * GitHub Portfolio Projects Sync Engine
 * Fetches public repositories for user 'nik1062' tagged with the 'portfolio' topic,
 * validates metadata, de-duplicates against curated projects, and saves to
 * src/data/github-projects.generated.json.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CONFIG = {
  username: 'nik1062',
  topic: 'portfolio',
  outputPath: path.resolve(__dirname, '../src/data/github-projects.generated.json'),
  curatedDataPath: path.resolve(__dirname, '../src/data/portfolio.js'),
  excludedRepositories: [
    // Add any repository names to explicitly exclude from automatic discovery
  ]
};

/**
 * Filter repositories according to criteria:
 * - Public & not a fork
 * - Not archived
 * - Has the target topic (default: 'portfolio')
 * - Not in excluded list
 */
export function filterRepositories(repos, options = {}) {
  const targetTopic = (options.topic || CONFIG.topic).toLowerCase();
  const excluded = new Set((options.excludedRepositories || CONFIG.excludedRepositories).map(n => n.toLowerCase()));

  if (!Array.isArray(repos)) {
    return [];
  }

  return repos.filter(repo => {
    if (!repo || typeof repo !== 'object') return false;

    // Must be public, non-fork, non-archived
    if (repo.fork === true) return false;
    if (repo.archived === true) return false;
    if (repo.private === true || repo.visibility === 'private') return false;

    // Check exclusion list
    const name = String(repo.name || '').toLowerCase();
    if (excluded.has(name)) return false;

    // Must have the target topic
    const topics = Array.isArray(repo.topics) ? repo.topics.map(t => String(t).toLowerCase()) : [];
    return topics.includes(targetTopic);
  });
}

/**
 * Normalize repository strings for collision / de-duplication checks
 */
function normalizeIdentifier(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/^https?:\/\/(www\.)?github\.com\//i, '')
    .replace(/\/+$/, '')
    .replace(/[-_.]/g, '');
}

/**
 * De-duplicate discovered repositories against curated project catalog
 * Never duplicate a project that is already highlighted in curated work.
 */
export function deduplicateRepositories(discoveredRepos, curatedProjects = []) {
  if (!Array.isArray(discoveredRepos)) return [];
  if (!Array.isArray(curatedProjects) || curatedProjects.length === 0) return discoveredRepos;

  const curatedIdentities = new Set();

  for (const curated of curatedProjects) {
    if (curated.repo) {
      curatedIdentities.add(normalizeIdentifier(curated.repo));
      const repoNameOnly = String(curated.repo).split('/').filter(Boolean).pop();
      if (repoNameOnly) {
        curatedIdentities.add(normalizeIdentifier(repoNameOnly));
      }
    }
    if (curated.slug) curatedIdentities.add(normalizeIdentifier(curated.slug));
    if (curated.title) curatedIdentities.add(normalizeIdentifier(curated.title));
  }

  return discoveredRepos.filter(repo => {
    const repoUrlId = normalizeIdentifier(repo.html_url || repo.htmlUrl);
    const repoNameId = normalizeIdentifier(repo.name);

    if (curatedIdentities.has(repoUrlId)) return false;
    if (curatedIdentities.has(repoNameId)) return false;

    return true;
  });
}

/**
 * Transform raw GitHub API payload into clean portfolio project metadata
 */
export function transformRepository(raw) {
  const name = String(raw.name || 'Untitled Project');
  // Format readable display title (e.g. "my-cool-project" -> "My Cool Project")
  const displayName = name
    .replace(/^[-_]+/, '')
    .split(/[-_]/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Validate homepage link
  let homepage = null;
  if (raw.homepage && typeof raw.homepage === 'string') {
    const trimmed = raw.homepage.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      homepage = trimmed;
    }
  }

  return {
    id: raw.id || 0,
    name: name,
    displayName: displayName,
    description: raw.description ? String(raw.description).trim() : 'Project repository published on GitHub with #portfolio tag.',
    htmlUrl: raw.html_url || `https://github.com/${CONFIG.username}/${name}`,
    homepage: homepage,
    language: raw.language || 'Code',
    topics: Array.isArray(raw.topics) ? raw.topics : [],
    stars: typeof raw.stargazers_count === 'number' ? raw.stargazers_count : 0,
    forks: typeof raw.forks_count === 'number' ? raw.forks_count : 0,
    openIssues: typeof raw.open_issues_count === 'number' ? raw.open_issues_count : 0,
    createdAt: raw.created_at || new Date().toISOString(),
    updatedAt: raw.updated_at || new Date().toISOString(),
    pushedAt: raw.pushed_at || raw.updated_at || new Date().toISOString(),
    license: raw.license?.spdx_id || (typeof raw.license?.name === 'string' ? raw.license.name : null)
  };
}

/**
 * Extract curated project catalog from src/data/portfolio.js if available
 */
export async function loadCuratedProjects(filePath = CONFIG.curatedDataPath) {
  try {
    if (!fs.existsSync(filePath)) return [];
    const module = await import(`file://${filePath}`);
    return module.projects || [];
  } catch (err) {
    console.warn('[Sync] Could not read curated projects for deduplication:', err.message);
    return [];
  }
}

/**
 * Main execution function
 */
export async function syncGithubProjects(options = {}) {
  const username = options.username || CONFIG.username;
  const outputPath = options.outputPath || CONFIG.outputPath;
  const curatedProjects = options.curatedProjects || (await loadCuratedProjects());
  const token = process.env.GITHUB_TOKEN; // Optional token in CI if available

  console.log(`[Sync] Fetching public repositories for user '${username}'...`);

  const headers = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'portfolio-project-sync-engine'
  };

  // Add auth token only if available in CI environment (never required for public API)
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let repos = [];
  try {
    const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      if (res.status === 403) {
        console.warn('[Sync] Warning: GitHub API rate limit reached. Keeping previous generated data.');
      } else {
        console.warn(`[Sync] GitHub API returned status ${res.status}: ${res.statusText}`);
      }
      return { success: false, reason: `HTTP_${res.status}` };
    }

    repos = await res.json();
    if (!Array.isArray(repos)) {
      console.warn('[Sync] Unexpected response format (not an array). Keeping previous generated data.');
      return { success: false, reason: 'MALFORMED_RESPONSE' };
    }
  } catch (err) {
    console.warn('[Sync] Network error during GitHub fetch:', err.message);
    return { success: false, reason: err.message };
  }

  console.log(`[Sync] Fetched ${repos.length} total public repositories.`);

  // 1. Filter by topic='portfolio', non-fork, non-archived
  const filtered = filterRepositories(repos, options);
  console.log(`[Sync] Discovered ${filtered.length} repositories with topic '${options.topic || CONFIG.topic}'.`);

  // 2. De-duplicate against curated project list
  const deduplicated = deduplicateRepositories(filtered, curatedProjects);
  console.log(`[Sync] Retained ${deduplicated.length} after de-duplication with curated catalog.`);

  // 3. Transform to clean schema and sort by latest activity
  const transformed = deduplicated
    .map(transformRepository)
    .sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt));

  // 4. Compare with existing file to avoid unnecessary git diffs
  let existingData = null;
  if (fs.existsSync(outputPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    } catch {
      // Ignore corrupt existing file
    }
  }

  const existingProjectIds = (existingData?.projects || []).map(p => `${p.id}_${p.pushedAt}`).join('|');
  const newProjectIds = transformed.map(p => `${p.id}_${p.pushedAt}`).join('|');

  if (existingData && existingProjectIds === newProjectIds) {
    console.log('[Sync] Generated data is already up to date. No file changes needed.');
    return { success: true, changed: false, total: transformed.length };
  }

  // 5. Write updated JSON
  const outputPayload = {
    lastSynced: new Date().toISOString(),
    username: username,
    topic: options.topic || CONFIG.topic,
    totalDiscovered: transformed.length,
    projects: transformed
  };

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(outputPayload, null, 2) + '\n', 'utf8');
  console.log(`[Sync] Successfully updated ${outputPath} with ${transformed.length} discovered projects.`);

  return { success: true, changed: true, total: transformed.length };
}

// Auto-run if executed directly via CLI
if (process.argv[1] && process.argv[1].endsWith('sync-github-projects.js')) {
  syncGithubProjects()
    .then(result => {
      if (!result.success) {
        console.log('[Sync] Completed with fallback preserved.');
      } else {
        console.log(`[Sync] Done. ${result.total} project(s) ready.`);
      }
    })
    .catch(err => {
      console.error('[Sync] Fatal error:', err);
      process.exit(1);
    });
}
