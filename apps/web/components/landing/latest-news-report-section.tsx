import LatestNewsCard from './latest-news-card';

export default function LatestNewsReport() {
  return (
    <section className="pb-20">
      <div className="max-w-356 mx-auto bg-white rounded-2xl px-8 py-12 h-[500px]">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center">
          <span className="text-[#2E2F35]">Latest </span>
          <span className="text-[#2F327D]">News Report</span>
        </h2>

        {/* Subtitle */}
        <p className="text-[#696984] text-center mt-4">
          Be updated on latest news for the whole week
        </p>

        <div>
          <LatestNewsCard />
        </div>
      </div>
    </section>
  );
}
