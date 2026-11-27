import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterRepositories,
  deduplicateRepositories,
  transformRepository,
  CONFIG
} from '../scripts/sync-github-projects.js';

test('GitHub Sync Engine - filterRepositories', async (t) => {
  await t.test('filters out repositories without the target topic', () => {
    const repos = [
      { name: 'repo-one', topics: ['react', 'portfolio'], fork: false, archived: false, private: false },
      { name: 'repo-two', topics: ['nodejs', 'express'], fork: false, archived: false, private: false },
      { name: 'repo-three', topics: ['PORTFOLIO', 'ai'], fork: false, archived: false, private: false }
    ];

    const result = filterRepositories(repos, { topic: 'portfolio' });
    assert.equal(result.length, 2);
    assert.equal(result[0].name, 'repo-one');
    assert.equal(result[1].name, 'repo-three');
  });

  await t.test('filters out forked repositories even if they have the topic', () => {
    const repos = [
      { name: 'forked-repo', topics: ['portfolio'], fork: true, archived: false, private: false },
      { name: 'original-repo', topics: ['portfolio'], fork: false, archived: false, private: false }
    ];

    const result = filterRepositories(repos);
    assert.equal(result.length, 1);
    assert.equal(result[0].name, 'original-repo');
  });

  await t.test('filters out archived repositories', () => {
    const repos = [
      { name: 'old-repo', topics: ['portfolio'], fork: false, archived: true, private: false },
      { name: 'active-repo', topics: ['portfolio'], fork: false, archived: false, private: false }
    ];

    const result = filterRepositories(repos);
    assert.equal(result.length, 1);
    assert.equal(result[0].name, 'active-repo');
  });

  await t.test('filters out private repositories', () => {
    const repos = [
      { name: 'secret-repo', topics: ['portfolio'], fork: false, archived: false, private: true },
      { name: 'public-repo', topics: ['portfolio'], fork: false, archived: false, private: false }
    ];

    const result = filterRepositories(repos);
    assert.equal(result.length, 1);
    assert.equal(result[0].name, 'public-repo');
  });

  await t.test('filters out explicitly excluded repositories', () => {
    const repos = [
      { name: 'ignore-me', topics: ['portfolio'], fork: false, archived: false, private: false },
      { name: 'keep-me', topics: ['portfolio'], fork: false, archived: false, private: false }
    ];

    const result = filterRepositories(repos, { excludedRepositories: ['ignore-me'] });
    assert.equal(result.length, 1);
    assert.equal(result[0].name, 'keep-me');
  });

  await t.test('handles null, empty, or malformed repository lists gracefully', () => {
    assert.deepEqual(filterRepositories(null), []);
    assert.deepEqual(filterRepositories(undefined), []);
    assert.deepEqual(filterRepositories('not an array'), []);
    assert.deepEqual(filterRepositories([null, undefined, { invalid: true }]), []);
  });
});

test('GitHub Sync Engine - deduplicateRepositories', async (t) => {
  const curatedProjects = [
    {
      slug: 'spendlens-ai-spend-audit',
      title: 'SpendLens AI Spend Audit',
      repo: 'https://github.com/nik1062/spendlens'
    },
    {
      slug: 'restropro-saas-pos',
      title: 'RESTROPro SaaS POS',
      repo: 'https://github.com/nik1062/RestroPro'
    }
  ];

  await t.test('excludes discovered repos that match a curated repo URL', () => {
    const discovered = [
      { name: 'spendlens', html_url: 'https://github.com/nik1062/spendlens/' },
      { name: 'brand-new-project', html_url: 'https://github.com/nik1062/brand-new-project' }
    ];

    const result = deduplicateRepositories(discovered, curatedProjects);
    assert.equal(result.length, 1);
    assert.equal(result[0].name, 'brand-new-project');
  });

  await t.test('excludes discovered repos that match a curated slug or normalized title', () => {
    const discovered = [
      { name: 'restropro', html_url: 'https://github.com/nik1062/restropro-extra' },
      { name: 'unique-tool', html_url: 'https://github.com/nik1062/unique-tool' }
    ];

    const result = deduplicateRepositories(discovered, curatedProjects);
    assert.equal(result.length, 1);
    assert.equal(result[0].name, 'unique-tool');
  });

  await t.test('keeps all discovered repos if curated list is empty', () => {
    const discovered = [
      { name: 'project-a', html_url: 'https://github.com/nik1062/project-a' }
    ];

    const result = deduplicateRepositories(discovered, []);
    assert.equal(result.length, 1);
    assert.equal(result[0].name, 'project-a');
  });

  await t.test('handles malformed inputs safely', () => {
    assert.deepEqual(deduplicateRepositories(null, curatedProjects), []);
    assert.deepEqual(deduplicateRepositories(undefined, curatedProjects), []);
  });
});

test('GitHub Sync Engine - transformRepository', async (t) => {
  await t.test('transforms raw GitHub repository object into clean portfolio schema', () => {
    const raw = {
      id: 987654321,
      name: 'ai-doc-summarizer',
      description: 'An intelligent PDF summarizer built with Python and LangChain.',
      html_url: 'https://github.com/nik1062/ai-doc-summarizer',
      homepage: 'https://summarizer.demo.app',
      language: 'Python',
      topics: ['portfolio', 'ai', 'langchain'],
      stargazers_count: 14,
      forks_count: 3,
      open_issues_count: 1,
      created_at: '2026-01-10T12:00:00Z',
      updated_at: '2026-02-15T18:30:00Z',
      pushed_at: '2026-02-15T19:00:00Z',
      license: { spdx_id: 'MIT' }
    };

    const transformed = transformRepository(raw);
    assert.equal(transformed.id, 987654321);
    assert.equal(transformed.name, 'ai-doc-summarizer');
    assert.equal(transformed.displayName, 'Ai Doc Summarizer');
    assert.equal(transformed.description, 'An intelligent PDF summarizer built with Python and LangChain.');
    assert.equal(transformed.htmlUrl, 'https://github.com/nik1062/ai-doc-summarizer');
    assert.equal(transformed.homepage, 'https://summarizer.demo.app');
    assert.equal(transformed.language, 'Python');
    assert.deepEqual(transformed.topics, ['portfolio', 'ai', 'langchain']);
    assert.equal(transformed.stars, 14);
    assert.equal(transformed.forks, 3);
    assert.equal(transformed.license, 'MIT');
  });

  await t.test('safely discards invalid homepage URLs', () => {
    const rawWithInvalidHomepage = {
      name: 'cli-tool',
      homepage: 'not-a-valid-url'
    };

    const transformed = transformRepository(rawWithInvalidHomepage);
    assert.equal(transformed.homepage, null);
  });

  await t.test('provides fallbacks for missing fields', () => {
    const rawEmpty = {};
    const transformed = transformRepository(rawEmpty);

    assert.equal(transformed.name, 'Untitled Project');
    assert.equal(typeof transformed.description, 'string');
    assert.equal(transformed.language, 'Code');
    assert.equal(transformed.stars, 0);
    assert.equal(transformed.forks, 0);
    assert.equal(transformed.license, null);
  });
});
