const GITHUB_USERNAME = "nik1062";

export const githubService = {
  async getUserStats() {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!response.ok) throw new Error("Failed to fetch GitHub stats");
      const data = await response.json();
      return {
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        bio: data.bio,
        avatar_url: data.avatar_url,
        html_url: data.html_url
      };
    } catch (error) {
      console.error("GitHub API Error:", error);
      return null;
    }
  },

  async getRecentRepos() {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
      if (!response.ok) throw new Error("Failed to fetch repos");
      return await response.json();
    } catch (error) {
      console.error("GitHub Repos Error:", error);
      return [];
    }
  }
};
