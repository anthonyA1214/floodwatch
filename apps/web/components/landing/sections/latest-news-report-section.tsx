import LatestNewsCard from '../latest-news-card';

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
const SIX_HOURS = 60 * 60 * 6;

interface GNewsArticle {
  title: string;
  description: string;
  url: string;
  image: string;
}

async function fetchFloodNews(): Promise<GNewsArticle[]> {
  try {
    const res = await fetch(
      `https://gnews.io/api/v4/search?q=flood+Philippines&lang=en&country=ph&max=10&apikey=${GNEWS_API_KEY}`,
      { next: { revalidate: SIX_HOURS } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles ?? [];
  } catch {
    return [];
  }
}

export default async function LatestNewsReportSection() {
  const articles = await fetchFloodNews();
  const [featured, ...rest] = articles;

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

        {/* News Cards */}
        {articles.length === 0 ? (
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-center text-gray-400">
            <p>No flood news found at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Featured card */}
            <LatestNewsCard
              variant="featured"
              src={featured.image}
              title={featured.title}
              description={featured.description}
              url={featured.url}
            />

            {/* Compact cards */}
            <div className="flex flex-col gap-6">
              {rest.slice(0, 3).map((article) => (
                <LatestNewsCard
                  key={article.url}
                  variant="compact"
                  src={article.image}
                  title={article.title}
                  description={article.description}
                  url={article.url}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}