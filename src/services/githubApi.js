import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

function handleApiError(error) {
  if (error.response) {
    const { status, headers } = error.response;

    if (status === 404) {
      throw new Error("User not found. Please check the username and try again.");
    }

    if (status === 403 && headers["x-ratelimit-remaining"] === "0") {
      const resetTime = headers["x-ratelimit-reset"];
      const resetDate = resetTime
        ? new Date(Number(resetTime) * 1000).toLocaleTimeString()
        : "later";
      throw new Error(
        `GitHub API rate limit exceeded. Try again after ${resetDate}.`
      );
    }

    if (status === 403) {
      throw new Error("Access forbidden. The API may be rate-limited.");
    }

    throw new Error(`GitHub API error (${status}). Please try again.`);
  }

  if (error.request) {
    throw new Error("Network error. Please check your connection and try again.");
  }

  throw new Error(error.message || "An unexpected error occurred.");
}

export async function getUser(username) {
  try {
    const { data } = await api.get(`/users/${encodeURIComponent(username)}`);
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getUserRepos(username) {
  try {
    const { data } = await api.get(`/users/${encodeURIComponent(username)}/repos`, {
      params: {
        sort: "updated",
        per_page: 100,
        type: "owner",
      },
    });
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getFollowers(username) {
  try {
    const { data } = await api.get(
      `/users/${encodeURIComponent(username)}/followers`,
      { params: { per_page: 100 } }
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getFollowing(username) {
  try {
    const { data } = await api.get(
      `/users/${encodeURIComponent(username)}/following`,
      { params: { per_page: 100 } }
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
}
