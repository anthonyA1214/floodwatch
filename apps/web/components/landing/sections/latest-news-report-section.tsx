'use client';

import LatestNewsCard from '@/components/landing/latest-news-card';
import { useNews } from '@/hooks/use-news';
import LatestNewsCardSkeleton from '../skeletons/latest-news-card-skeleton';
import { IconArticleOff } from '@tabler/icons-react';

export default function LatestNewsReportSection() {
  const { news, isLoading } = useNews();

  return (
    <section id='latest-news'>
      <div className='flex flex-col gap-6 md:gap-10 py-20 max-w-7xl mx-auto px-4'>
        <div className='space-y-2'>
          {/* Title */}
          <h2 className='font-poppins text-3xl sm:text-4xl md:text-5xl font-semibold text-center'>
            Latest <span className='text-[#2F327D]'>News Report</span>
          </h2>

          {/* Subtitle */}
          <p className='text-lg sm:text-xl text-gray-600 text-center'>
            Be updated on latest news for the whole week
          </p>
        </div>

        {/* News Cards */}
        {isLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
            <div>
              <LatestNewsCardSkeleton variant='featured' />
            </div>
            <div className='flex flex-col gap-6'>
              <LatestNewsCardSkeleton />
              <LatestNewsCardSkeleton />
              <LatestNewsCardSkeleton />
            </div>
          </div>
        ) : news && news.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
            <div>
              <LatestNewsCard
                variant='featured'
                src={news[0].image ?? undefined}
                title={news[0].title}
                description={news[0].description ?? undefined}
                url={news[0].url}
              />
            </div>
            <div className='flex flex-col gap-6'>
              {news.slice(1).map((article) => (
                <LatestNewsCard
                  key={article.id}
                  src={article.image ?? undefined}
                  title={article.title}
                  description={article.description ?? undefined}
                  url={article.url}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-16 gap-3 text-gray-600'>
            <IconArticleOff className='w-[1.5em]! h-[1.5em]!' />
            <p className='text-lg font-medium'>
              No news available at the moment
            </p>
            <p className='text-sm'>Check back later for the latest updates</p>
          </div>
        )}
      </div>
    </section>
  );
}
