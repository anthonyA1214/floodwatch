import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <div className="flex h-screen w-full overflow-hidden">
        {children}

        {/* RIGHT SIDE */}
        <div className="relative w-1/2">
          {/* IMAGE */}
          <Image
            src="/images/flood_rescue_image.jpg"
            alt="Flood rescue"
            fill
            priority
            className="object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/50" />

          {/* CONTENT */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-12 text-white">
            <h2 className="mb-4 text-center text-4xl font-bold">
              Our flood <span className="text-blue-400">tracking</span> website
              ensures safety
            </h2>

            <p className="mb-8 max-w-xl text-center text-lg text-gray-200">
              Our website helps communities stay safe during floods with an
              interactive map showing real-time updates of affected areas. Users
              can also post reports and share updates, making it easier for
              everyone to stay informed and connected.
            </p>

            <Button variant="secondary" className="rounded-full text-lg px-8 py-6">
              Learn more...
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
