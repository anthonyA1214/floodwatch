import LatestNewsCard from '../latest-news-card';
export default function LatestNewsReport() {
  return (
    <section id="latest-news">
      <div className="flex flex-col gap-6 md:gap-10 py-20 max-w-7xl mx-auto px-4">
        <div className="space-y-2">
          {/* Title */}
          <h2 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-semibold text-center">
            Latest <span className="text-[#2F327D]">News Report</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 text-center">
            Be updated on latest news for the whole week
          </p>
        </div>

        {/* Cards Layout */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Big Card */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white shadow-md">
              <div className="h-[320px] rounded-t-2xl bg-gray-300 flex items-center justify-center text-white font-semibold">
                Image
              </div>

              <div className="p-6">
                <span className="inline-block rounded-full bg-[#49BBBD] px-4 py-1 text-xs font-semibold text-white">
                  NEWS
                </span>

                <h3 className="mt-4 text-xl font-semibold text-[#2E2F35]">
                  Caloocan declare State of Calamity due to Typhoon
                </h3>

                <p className="mt-2 text-[#696984]">
                  Work and class is suspended for 1 week now due to the damage
                  caused by heavy flooding.
                  <span className="ml-1 cursor-pointer font-medium text-[#2F327D]">
                    Read more...
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Cards */}
          <div className="flex flex-col gap-6">
            <LatestNewsCard />
            <LatestNewsCard />
          </div>
        </div>
      </div>
    </section>
  );
}
