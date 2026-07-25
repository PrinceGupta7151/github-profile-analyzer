import { FiSearch } from "react-icons/fi";
import EmptyState from "./EmptyState";
import RepoCard from "./RepoCard";

export default function RepoList({
  repos,
  search,
  onSearchChange,
  totalCount,
}) {
  return (
    <section className="rounded-xl border border-[#30363d] bg-[#161b22] p-6 shadow-md">

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Public Repositories
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            {repos.length} of {totalCount} repositories
            {search && " matching your search"}
          </p>
        </div>

        <div className="relative w-full md:max-w-sm">

          <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search repositories..."
            aria-label="Search repositories"
            className="
              w-full
              rounded-lg
              border
              border-[#30363d]
              bg-[#0d1117]
              py-3
              pl-12
              pr-4
              text-white
              placeholder:text-gray-500
              outline-none
              transition-all
              duration-200
              focus:border-[#58a6ff]
              focus:ring-2
              focus:ring-[#1f6feb]/30
            "
          />

        </div>

      </div>

      {repos.length === 0 ? (
        <EmptyState
          title={search ? "No repositories found" : "No public repositories"}
          description={
            search
              ? "Try adjusting your search terms."
              : "This user has no public repositories to display."
          }
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
            />
          ))}
        </div>
      )}

    </section>
  );
}