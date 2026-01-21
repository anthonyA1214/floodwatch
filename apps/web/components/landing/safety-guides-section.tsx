import Image from 'next/image';

export default function SafetyGuidesSection() {
  return (
    <section className="py-10" id="safety-guides">
      <div className="max-w-356 mx-auto bg-white rounded-2xl px-12 py-16">
        {/* Title */}
        <h2 className="text-4xl font-semibold text-center text-[#2E2F35]">
          Safety <span className="text-[#2F327D]">Guides</span>
        </h2>

        {/* Description */}
        <p className="text-center text-[#696984] text-lg mt-6 max-w-4xl mx-auto leading-relaxed">
          Educational resources are essential in helping people prepare for and
          respond to floods effectively. They provide important knowledge about
          safety measures, emergency actions, and prevention tips that can save
          lives.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
          {/* Card 1 */}
          <div className="relative h-[260px] rounded-2xl overflow-hidden">
            <Image
              src="/images/first-aid-kit.jpg"
              alt="Prepare before flood"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-10">
              <h3 className="text-3xl font-semibold mb-6">
                Important things to ready before flood
              </h3>

              <button className="px-10 py-3 border border-white rounded-full text-sm hover:bg-white hover:text-black transition">
                Click here
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative h-[260px] rounded-2xl overflow-hidden">
            <Image
              src="/images/flood-pushing-boat.jpg"
              alt="During flood"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-10">
              <h3 className="text-3xl font-semibold mb-6">
                What to do during flood
              </h3>

              <button className="px-10 py-3 border border-white rounded-full text-sm hover:bg-white hover:text-black transition">
                Click here
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
