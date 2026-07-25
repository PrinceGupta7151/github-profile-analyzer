import { createContext, useContext, useMemo, useState } from "react";
import {
  getUser,
  getUserRepos,
  getFollowers,
  getFollowing,
} from "../services/githubApi";

const GitHubContext = createContext(null);

export function GitHubProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [repoSearch, setRepoSearch] = useState("");

  const fetchUser = async (username) => {
    const trimmed = username.trim();
    if (!trimmed) {
      setError("Please enter a GitHub username.");
      return false;
    }

    setLoading(true);
    setError(null);
    setProfile(null);
    setRepos([]);
    setFollowers([]);
    setFollowing([]);
    setRepoSearch("");

    try {
      const [userData, reposData, followersData, followingData] =
        await Promise.all([
          getUser(trimmed),
          getUserRepos(trimmed),
          getFollowers(trimmed),
          getFollowing(trimmed),
        ]);

      setProfile(userData);
      setRepos(reposData);
      setFollowers(followersData);
      setFollowing(followingData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  const filteredRepos = useMemo(() => {
    const query = repoSearch.trim().toLowerCase();
    if (!query) return repos;

    return repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(query) ||
        (repo.description && repo.description.toLowerCase().includes(query)) ||
        (repo.language && repo.language.toLowerCase().includes(query))
    );
  }, [repos, repoSearch]);

  const languageStats = useMemo(() => {
    const stats = {};

    repos.forEach((repo) => {
      if (repo.language) {
        stats[repo.language] = (stats[repo.language] || 0) + 1;
      }
    });

    return Object.entries(stats)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [repos]);

  const value = {
    profile,
    repos,
    followers,
    following,
    loading,
    error,
    repoSearch,
    setRepoSearch,
    filteredRepos,
    languageStats,
    fetchUser,
    clearError,
  };

  return (
    <GitHubContext.Provider value={value}>{children}</GitHubContext.Provider>
  );
}

export function useGitHub() {
  const context = useContext(GitHubContext);
  if (!context) {
    throw new Error("useGitHub must be used within a GitHubProvider");
  }
  return context;
}
