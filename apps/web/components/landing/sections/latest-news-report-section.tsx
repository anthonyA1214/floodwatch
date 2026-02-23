import LatestNewsCard from '../latest-news-card';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  source: string;
  publishedAt: string;
  externalUrl: string;
}

async function getFloodNews(): Promise<NewsArticle[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const FALLBACK_IMAGE = '/images/chloe.jpg';

export default async function LatestNewsReportSection() {
  const news = await getFloodNews();
  const [featured, ...rest] = news;

  return (
    <section id="latest-news">
      <div className="flex flex-col gap-6 md:gap-10 py-20 max-w-7xl mx-auto px-4">
        <div className="space-y-2">
          <h2 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-semibold text-center">
            Latest <span className="text-[#2F327D]">News Report</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 text-center">
            Be updated on latest news for the whole week
          </p>
        </div>

        {!featured ? (
          <p className="text-center text-gray-400">
            No flood news available yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <a href={featured.externalUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                <LatestNewsCard
                  variant="featured"
                  src={featured.imageUrl ?? FALLBACK_IMAGE}
                  title={featured.title}
                  description={featured.description}
                />
              </a>
            </div>
            <div className="flex flex-col gap-6">
              {rest.slice(0, 3).map((article) => (
                <a key={article.id} href={article.externalUrl} target="_blank" rel="noopener noreferrer">
                  <LatestNewsCard
                    src={article.imageUrl ?? FALLBACK_IMAGE}
                    title={article.title}
                    description={article.description}
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}