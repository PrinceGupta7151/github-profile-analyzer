# GitHub Profile Analyzer

A minimal React app for analyzing GitHub user profiles.

## Features

- **Search GitHub username** — Look up any public GitHub user
- **Profile information** — Avatar, name, bio, location, company, join date, and profile link
- **Public repositories** — Stars, forks, language, and description for each repo
- **Followers & following** — Counts and browsable user lists
- **Repository search** — Filter repos by name, description, or language
- **Programming language statistics** — Pie chart powered by Recharts

## Tech Stack

- React (JavaScript) with Vite
- Tailwind CSS
- React Router
- Context API for global state
- Axios for GitHub REST API requests
- Recharts for data visualization

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── EmptyState.jsx
│   ├── ErrorMessage.jsx
│   ├── LanguageChart.jsx
│   ├── Layout.jsx
│   ├── LoadingSpinner.jsx
│   ├── ProfileCard.jsx
│   ├── RepoCard.jsx
│   ├── RepoList.jsx
│   ├── SearchBar.jsx
│   └── UserList.jsx
├── context/
│   └── GitHubContext.jsx
├── pages/
│   ├── Home.jsx
│   └── Profile.jsx
├── services/
│   └── githubApi.js
├── utils/
│   └── formatDate.js
├── App.jsx
├── main.jsx
└── index.css
```

## GitHub API

This app uses the public [GitHub REST API](https://docs.github.com/en/rest) without authentication:

| Endpoint | Purpose |
|----------|---------|
| `GET /users/{username}` | User profile |
| `GET /users/{username}/repos` | Public repositories |
| `GET /users/{username}/followers` | Followers list |
| `GET /users/{username}/following` | Following list |

**Rate limit:** Unauthenticated requests are limited to 60 per hour per IP. The app displays a clear message when the limit is exceeded.

Language statistics are derived from each repository's primary `language` field to minimize API calls.

## License

MIT
