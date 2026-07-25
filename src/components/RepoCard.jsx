import { FiExternalLink, FiGitBranch, FiStar } from "react-icons/fi";
import { formatNumber } from "../utils/formatDate";

const languageColors = {
  JavaScript: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  TypeScript: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  Python: "bg-green-500/20 text-green-300 border border-green-500/30",
  Java: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  Go: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
  Rust: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  Ruby: "bg-red-500/20 text-red-300 border border-red-500/30",
  PHP: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
  CSS: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  HTML: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  Shell: "bg-gray-500/20 text-gray-300 border border-gray-500/30",
  C: "bg-slate-500/20 text-slate-300 border border-slate-500/30",
  "C++": "bg-slate-500/20 text-slate-300 border border-slate-500/30",
  "C#": "bg-violet-500/20 text-violet-300 border border-violet-500/30",
  Swift: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  Kotlin: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
};

function getLanguageBadgeClass(language) {
  return (
    languageColors[language] ||
    "bg-gray-500/20 text-gray-300 border border-gray-500/30"
  );
}

export default function RepoCard({ repo }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-[#30363d] bg-[#161b22] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#58a6ff] hover:shadow-lg">

      <div className="flex items-start justify-between gap-3">

        <h3 className="text-lg font-semibold text-[#58a6ff]">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:underline"
          >
            {repo.name}
            <FiExternalLink className="h-4 w-4 opacity-70" />
          </a>
        </h3>

        {repo.language && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getLanguageBadgeClass(
              repo.language
            )}`}
          >
            {repo.language}
          </span>
        )}
      </div>

      {repo.description ? (
        <p className="mt-3 flex-1 text-sm leading-6 text-gray-300">
          {repo.description}
        </p>
      ) : (
        <p className="mt-3 flex-1 text-sm italic text-gray-500">
          No description provided
        </p>
      )}

      <div className="mt-5 flex items-center gap-6 border-t border-[#30363d] pt-4 text-sm text-gray-400">

        <span className="flex items-center gap-1 hover:text-yellow-400">
          <FiStar className="h-4 w-4" />
          {formatNumber(repo.stargazers_count)}
        </span>

        <span className="flex items-center gap-1 hover:text-green-400">
          <FiGitBranch className="h-4 w-4" />
          {formatNumber(repo.forks_count)}
        </span>

      </div>

    </article>
  );
}