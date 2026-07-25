import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";

export default function UserList({ users, title, emptyMessage }) {
  if (!users.length) {
    return (
      <section className="rounded-xl border border-[#30363d] bg-[#161b22] p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-white">
          {title}
        </h2>

        <EmptyState title={emptyMessage} />
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-[#30363d] bg-[#161b22] p-6 shadow-md">

      <h2 className="mb-5 text-2xl font-bold text-white">
        {title}
        <span className="ml-2 text-gray-400">({users.length})</span>
      </h2>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <li key={user.id}>
            <Link
              to={`/profile/${user.login}`}
              className="
                flex
                items-center
                gap-4
                rounded-lg
                border
                border-[#30363d]
                bg-[#0d1117]
                p-4
                transition-all
                duration-200
                hover:bg-[#21262d]
                hover:border-[#58a6ff]
                hover:shadow-lg
              "
            >
              <img
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                className="
                  h-12
                  w-12
                  rounded-full
                  border
                  border-[#30363d]
                "
              />

              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-white">
                  {user.login}
                </p>

                <p className="text-sm text-gray-400">
                  View GitHub Profile
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

    </section>
  );
}