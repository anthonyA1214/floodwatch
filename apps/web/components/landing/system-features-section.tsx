import { UsersRound, MapPinned, ShieldCheck } from 'lucide-react';

export default function SystemFeatures() {
  return (
    <section className="py-10" id="features">
      <div className="max-w-356 mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-semibold text-center mb-16">
          System <span className="text-[#2F327D]">Features</span>
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1: Community Posting */}
          <div className="relative bg-gray-50 rounded-2xl px-8 py-20 text-center shadow-sm">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-sky-400 flex items-center justify-center shadow">
              <UsersRound className="text-white " width={40} height={50} />
            </div>

            <h3 className="mt-14 text-2xl font-semibold text-gray-800">
              Community Posting
            </h3>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Users can view the newsfeed, create posts, like, comment, and
              share updates with others.
            </p>
          </div>

          {/* Feature 2: Interactive Map */}
          <div className="relative bg-gray-50 rounded-2xl px-8 py-20 text-center shadow-sm">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-teal-400 flex items-center justify-center shadow">
              <MapPinned className="text-white " width={40} height={50} />
            </div>

            <h3 className="mt-14 text-2xl font-semibold text-gray-800">
              Interactive Map
            </h3>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Users can see flooded areas based on a selected location using an
              interactive map.
            </p>
          </div>

          {/* Feature 3: Safety Guides */}
          <div className="relative bg-gray-50 rounded-2xl px-8 py-20 text-center shadow-sm">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-indigo-400 flex items-center justify-center shadow">
              <ShieldCheck className="text-white " width={40} height={50} />
            </div>

            <h3 className="mt-14 text-2xl font-semibold text-gray-800">
              Safety Guides
            </h3>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Users can read safety tips and prevention guides that help protect
              lives during disasters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
