"use client";

export default function LatestNewsCard({
  variant = "compact",
  title = "Untitled News",
  description = "No description available.",
}) {
  // FEATURED (LEFT BIG CARD)
  if (variant === "featured") {
    return (
      <div className="rounded-2xl bg-white shadow-md">
        {/* Image */}
        <div className="flex h-[320px] items-center justify-center rounded-t-2xl bg-gray-300 text-white font-semibold">
          Image
        </div>

        {/* Content */}
        <div className="p-6">
          <span className="inline-block rounded-full bg-[#49BBBD] px-4 py-1 text-xs font-semibold text-white">
            NEWS
          </span>

          <h3 className="mt-4 text-xl font-semibold text-[#2E2F35]">
            {title}
          </h3>

          <p className="mt-2 text-[#696984]">
            {description}
            <span className="ml-1 cursor-pointer font-medium text-[#2F327D]">
              Read more...
            </span>
          </p>
        </div>
      </div>
    );
  }

  // COMPACT (RIGHT SIDE CARDS)
  return (
    <div className="flex h-[220px] w-full gap-5 rounded-2xl bg-white p-5 shadow-md">
      {/* Image */}
      <div className="flex w-[40%] items-center justify-center overflow-hidden rounded-xl bg-gray-300 text-sm font-semibold text-white">
        Image
      </div>

      {/* Content */}
      <div className="flex w-[60%] flex-col justify-between">
        <div>
          <span className="inline-block rounded-full bg-[#49BBBD] px-4 py-1 text-xs font-semibold text-white">
            NEWS
          </span>

          <h4 className="mt-3 line-clamp-2 text-lg font-semibold text-[#2E2F35]">
            {title}
          </h4>

          <p className="mt-2 line-clamp-3 text-sm text-[#696984]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
