import Image from 'next/image';

export default function SafetyGuideCard({
  src,
  alt,
  title,
  href,
}: {
  src: string;
  alt: string;
  title: string;
  href: string;
}) {
  return (
    <div className="relative rounded-2xl aspect-square overflow-hidden">
      <Image src={src} alt={alt} fill className="object-cover" />

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 md:px-10">
        <div className="space-y-6">
          <h3 className="font-poppins font-semibold text-2xl md:text-3xl">
            {title}
          </h3>

          <a
            className="block mt-auto"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="px-8 py-3 border border-white rounded-full text-sm sm:text-base md:text-lg
             hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition"
            >
              Click here
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
