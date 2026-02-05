import SafetyGuideCard from '../safety-guide-card';

export default function SafetyGuidesSection() {
  return (
    <section className="bg-white" id="safety-guides">
      <div className="flex flex-col gap-6 md:gap-10 py-20 max-w-7xl mx-auto px-4">
        <div className="space-y-2">
          {/* Title */}
          <h2 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-semibold text-center">
            Safety <span className="text-[#2F327D]">Guides</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 text-center">
            Educational resources are essential in helping people prepare for
            and respond to floods effectively. They provide important knowledge
            about safety measures, emergency actions, and prevention tips that
            can save lives.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <SafetyGuideCard
            src="/images/before_flood_image.jpg"
            alt="Before flood"
            title="What to do BEFORE a flood"
            href="https://8list.ph/flood-safety-guide-what-to-do-during-flood/#before"
          />

          <SafetyGuideCard
            src="/images/during_flood_image.jpg"
            alt="During flood"
            title="What to do DURING a flood"
            href="https://8list.ph/flood-safety-guide-what-to-do-during-flood/#during"
          />

          <SafetyGuideCard
            src="/images/after_flood_image.jpg"
            alt="After flood"
            title="What to do AFTER a flood"
            href="https://8list.ph/flood-safety-guide-what-to-do-during-flood/#after"
          />
        </div>
      </div>
    </section>
  );
}
