export default function SystemFeatures() {
  return (
    <section className="py-20">
      <div className="max-w-356 mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-16">
          System <span className="text-[#2F327D]">Features</span>
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1: Community Posting */}
          <div className="relative bg-gray-50 rounded-2xl px-8 py-12 text-center shadow-sm">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-sky-400 flex items-center justify-center shadow">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {/* Users/Community Icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>

            <h3 className="mt-10 text-lg font-semibold text-gray-800">
              Community Posting
            </h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Users can view the newsfeed, create posts, like, comment, and
              share updates with others.
            </p>
          </div>

          {/* Feature 2: Interactive Map */}
          <div className="relative bg-gray-50 rounded-2xl px-8 py-12 text-center shadow-sm">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-teal-400 flex items-center justify-center shadow">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {/* Map with Pin Icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.446l1.972-1.101a.75.75 0 00.425-.666V6.308a.75.75 0 00-.422-.668l-1.928-1.002a.75.75 0 00-.69 0L10.714 6.015a.75.75 0 01-.69 0L8.328 4.775a.75.75 0 00-.69 0L5.422 5.64a.75.75 0 00-.422.668v10.66c0 .287.163.551.425.665l1.972 1.102a.75.75 0 00.69 0l2.356-1.102a.75.75 0 01.69 0l2.356 1.102a.75.75 0 00.69 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11.25c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                />
              </svg>
            </div>

            <h3 className="mt-10 text-lg font-semibold text-gray-800">
              Interactive Map
            </h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Users can see flooded areas based on a selected location using an
              interactive map.
            </p>
          </div>

          {/* Feature 3: Safety Guides */}
          <div className="relative bg-gray-50 rounded-2xl px-8 py-12 text-center shadow-sm">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-indigo-400 flex items-center justify-center shadow">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3l7 4v5c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V7l7-4z"
                />
              </svg>
            </div>

            <h3 className="mt-10 text-lg font-semibold text-gray-800">
              Safety Guides
            </h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Users can read safety tips and prevention guides that help protect
              lives during disasters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
