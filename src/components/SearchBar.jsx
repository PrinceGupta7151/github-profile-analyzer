import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({
  onSearch,
  loading = false,
  placeholder = "Enter GitHub username...",
  buttonText = "Search",
  initialValue = "",
}) {
  const [username, setUsername] = useState(initialValue);

  useEffect(() => {
    setUsername(initialValue);
  }, [initialValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(username.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">

        {/* Search Input */}
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder={placeholder}
            disabled={loading}
            aria-label="GitHub username"
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
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="
            rounded-lg
            bg-[#238636]
            px-7
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-[#2ea043]
            hover:shadow-lg
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? "Searching..." : buttonText}
        </button>

      </div>
    </form>
  );
}