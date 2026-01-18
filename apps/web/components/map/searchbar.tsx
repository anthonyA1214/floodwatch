export default function Searchbar() {
  return (
    <div className="absolute top-6 left-6 z-40">
      <div
        className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md
                   w-[60vw] max-w-[900px]"
      >
        {/* Search Icon */}
        <svg
          className="w-5 h-[22px] text-gray-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 0 0114 0z"
          />
        </svg>

        {/* Input */}
        <input
          type="text"
          placeholder="Search Location"
          className="w-full text-sm md:text-base text-gray-700 outline-none placeholder-gray-400"
        />

        {/* Dropdown Icon */}
        <svg
          className="w-4 h-4 text-gray-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}