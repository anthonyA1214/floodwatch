import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center bg-[#0066CC] w-full min-h-screen px-4">
      <div className="flex flex-col-reverse md:flex-row gap-10 items-center max-w-356 w-full">
        {/* TEXT */}
        <div className="max-w-xl text-left order-2 md:order-1">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            <p className="text-white">
              <span className="text-[#2F327D]">Our flood</span> tracking website
              ensures safety
            </p>
          </h1>

          <p className="text-white text-base md:text-lg font-light mb-6">
            Our website helps communities stay safe during floods with an
            interactive map showing real-time updates of affected areas. Users
            can also post reports and share updates.
          </p>

          {/* Button below text */}
          <div className="w-full md:w-auto">
            <Link href="/map">
              <button className="w-full md:w-auto bg-[#5c9ce6] hover:bg-[#4d8cd1] text-white font-medium py-3 px-10 rounded-full transition-all duration-300 shadow-md">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        <div className="w-full flex justify-center order-1 md:order-2">
          <Image
            src="/hero-image.svg"
            alt="boat"
            width={1440}
            height={1024}
            className="w-full max-w-sm md:max-w-lg lg:max-w-none h-auto object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full leading-none overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] md:h-[150px] fill-[#EAEAEA]"
        >
          <path d="M0,120V0C150,80,450,120,600,120C750,120,1050,80,1200,0V120H0Z"></path>
        </svg>
      </div>
    </section>
  );
}
