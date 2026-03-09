import Image from 'next/image';
import NoPhotoEmpty from '../shared/no-photo-empty';

export default function LatestNewsCard({
  src,
  variant = 'compact',
  title = 'Untitled News',
  description = 'No description available.',
  url,
}: {
  src?: string;
  variant?: 'featured' | 'compact';
  title?: string;
  description?: string;
  url?: string;
}) {
  // FEATURED CARD
  if (variant === 'featured') {
    return (
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='h-full block'
      >
        <div className='bg-white h-full flex flex-col rounded-2xl shadow-lg overflow-hidden'>
          {/* Image */}
          <div className='relative aspect-video'>
            {src ? (
              <Image
                src={src}
                alt={title}
                fill
                className='object-cover rounded-t-2xl'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            ) : (
              <NoPhotoEmpty />
            )}
          </div>

          {/* Content */}
          <div className='flex flex-1 flex-col gap-4 p-6 sm:p-6 md:p-8 rounded-b-2xl'>
            <span className='inline-block w-fit rounded-full bg-[#49BBBD] px-3 py-1 text-[10px] sm:text-xs font-semibold text-white'>
              FEATURED NEWS
            </span>

            <div className='space-y-1'>
              <h3 className='font-poppins text-lg sm:text-xl lg:text-2xl font-semibold leading-snug'>
                {title}
              </h3>

              <p className='text-sm sm:text-base text-gray-600 line-clamp-3'>
                {description}
              </p>
            </div>
          </div>
        </div>
      </a>
    );
  }

  // COMPACT CARD
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='h-full block'
    >
      <div className='bg-white h-full flex rounded-2xl shadow-lg p-3 sm:p-4 gap-3 sm:gap-4'>
        {/* Image */}
        <div className='relative flex h-full w-20 sm:w-24 md:w-28'>
          {src ? (
            <Image
              src={src}
              alt={title}
              fill
              className='object-cover rounded-2xl'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          ) : (
            <NoPhotoEmpty />
          )}
        </div>

        {/* Content */}
        <div className='flex flex-1 flex-col gap-2'>
          <span className='w-fit rounded-full bg-[#49BBBD] px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold text-white'>
            NEWS
          </span>
          <div className='space-y-1'>
            <h3 className='font-poppins text-sm sm:text-base leading-snug font-semibold'>
              {title}
            </h3>

            <p className='text-xs sm:text-sm text-gray-600 line-clamp-2'>
              {description}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
