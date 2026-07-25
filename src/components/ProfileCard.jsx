
import {
  FiBriefcase,
  FiCalendar,
  FiExternalLink,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import { formatDate, formatNumber } from "../utils/formatDate";

export default function ProfileCard({ profile }) {
  if (!profile) return null;

  const displayName = profile.name || profile.login;

  return (
    <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-6 shadow-lg">
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <img
          src={profile.avatar_url}
          alt={`${displayName} avatar`}
          className="h-40 w-40 rounded-full border-4 border-[#30363d] object-cover"
        />

        {/* Name */}
        <div className="mt-5 w-full">
          <h1 className="text-3xl font-bold text-white text-center">
            {displayName}
          </h1>

          <p className="mt-1 text-center text-lg text-gray-400">
            @{profile.login}
          </p>

          {/* Bio */}
          {profile.bio && (
            <p className="mt-5 text-center text-sm leading-6 text-gray-300">
              {profile.bio}
            </p>
          )}

          {/* Details */}
          <div className="mt-6 space-y-3 text-sm text-gray-400">
            {profile.location && (
              <div className="flex items-center gap-2">
                <FiMapPin className="text-gray-500" />
                <span>{profile.location}</span>
              </div>
            )}

            {profile.company && (
              <div className="flex items-center gap-2">
                <FiBriefcase className="text-gray-500" />
                <span>{profile.company}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <FiCalendar className="text-gray-500" />
              <span>Joined {formatDate(profile.created_at)}</span>
            </div>
          </div>

          {/* GitHub Button */}
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#30363d]"
          >
            View on GitHub
            <FiExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[#30363d] pt-6">
        <Stat
          label="Repos"
          value={formatNumber(profile.public_repos)}
        />

        <Stat
          label="Followers"
          value={formatNumber(profile.followers)}
          icon={FiUsers}
        />

        <Stat
          label="Following"
          value={formatNumber(profile.following)}
          icon={FiUsers}
        />
      </div>
    </div>
  );
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="rounded-lg border border-[#30363d] bg-[#21262d] px-3 py-4 text-center transition hover:border-[#58a6ff]">
      <p className="text-xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 flex items-center justify-center gap-1 text-xs text-gray-400">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </p>
    </div>
  );
}




