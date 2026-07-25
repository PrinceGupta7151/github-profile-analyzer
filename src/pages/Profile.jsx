import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import ProfileCard from "../components/ProfileCard";
import RepoList from "../components/RepoList";
import LanguageChart from "../components/LanguageChart";
import UserList from "../components/UserList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useGitHub } from "../context/GitHubContext";

const TABS = [
  { id: "repos", label: "Repositories" },
  { id: "followers", label: "Followers" },
  { id: "following", label: "Following" },
];

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("repos");

  const {
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
  } = useGitHub();

  useEffect(() => {
    if (
      username &&
      profile?.login?.toLowerCase() !== username.toLowerCase()
    ) {
      fetchUser(username);
    }
  }, [username, profile?.login]);

  const handleSearch = async (newUsername) => {
    clearError();
    navigate(`/profile/${newUsername.trim()}`);
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-slate-900"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to search
        </Link>

        <div className="w-full sm:max-w-md">
          <SearchBar
            onSearch={handleSearch}
            loading={loading}
            initialValue={username}
            buttonText="Search"
            placeholder="Search another user..."
          />
        </div>
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} onDismiss={clearError} />
        </div>
      )}

      {loading && !profile && (
        <LoadingSpinner message={`Loading @${username}'s profile...`} />
      )}

      {profile && (
        <div className="space-y-6">
          <ProfileCard profile={profile} />

          <LanguageChart data={languageStats} />

          <div className="border-b border-slate-200">
            <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Profile tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                    activeTab === tab.id
                      ? "border-slate-900 text-slate-100"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-100"
                  }`}
                >
                  {tab.label}
                  {tab.id === "repos" && ` (${repos.length})`}
                  {tab.id === "followers" && ` (${followers.length})`}
                  {tab.id === "following" && ` (${following.length})`}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === "repos" && (
            <RepoList
              repos={filteredRepos}
              search={repoSearch}
              onSearchChange={setRepoSearch}
              totalCount={repos.length}
            />
          )}

          {activeTab === "followers" && (
            <UserList
              users={followers}
              title="Followers"
              emptyMessage="No followers to display"
            />
          )}

          {activeTab === "following" && (
            <UserList
              users={following}
              title="Following"
              emptyMessage="Not following anyone yet"
            />
          )}
        </div>
      )}

      {!loading && !profile && !error && (
        <LoadingSpinner message="Preparing profile..." />
      )}
    </Layout>
  );
}
