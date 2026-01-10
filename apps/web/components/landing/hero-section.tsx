import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="flex items-center justify-center bg-[#0066CC] min-h-screen ">
      <div className="flex gap-8 items-center">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <p className="text-white">
              <span className="text-[#2F327D]">Our flood</span> tracking website
              ensures safety
            </p>
          </h1>

          <p className="text-white text-lg md:text-l font-light mb-10 max-w-xl">
            Our website helps communities stay safe during floods with an
            interactive map showing real-time updates of affected areas. Users
            can also post reports and share updates, making it easier for
            everyone to stay informed and connected.
          </p>

          <button className="bg-[#5c9ce6] hover:bg-[#4d8cd1] text-white font-medium py-3 px-10 rounded-full transition-all duration-300 shadow-md">
            Get Started
          </button>
        </div>
        <div>
          <Image
            src="/hero-image.svg"
            alt="boat"
            width={1440}
            height={1024}
            className="w-full max-w-md md:max-w-none object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
