import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import ErrorMessage from "../components/ErrorMessage";
import { useGitHub } from "../context/GitHubContext";

export default function Home() {
  const navigate = useNavigate();
  const { loading, error, fetchUser, clearError } = useGitHub();
  const [searching, setSearching] = useState(false);

  const handleSearch = async (username) => {
    clearError();
    setSearching(true);
    const success = await fetchUser(username);
    setSearching(false);

    if (success) {
      navigate(`/profile/${username.trim()}`);
    }
  };

  const isLoading = loading || searching;

  return (
    <Layout>
      <div className="mx-auto max-w-xl pt-16">
        <h1 className="mb-6 text-center text-3xl font-semibold text-white">
          GitHub Profile Analyzer
        </h1>
        <SearchBar onSearch={handleSearch} loading={isLoading} />
        {error && (
          <div className="mt-4">
            <ErrorMessage message={error} onDismiss={clearError} />
          </div>
        )}
      </div>
    </Layout>
  );


 
}

