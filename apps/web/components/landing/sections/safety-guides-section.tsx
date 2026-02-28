'use client';

import { useState } from 'react';
import Image from 'next/image';
import SafetyGuideInfoCard from '../safety-guide-card';

const PlusBoxIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="3" strokeWidth={2} /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" /></svg>
);
const TriangleAlertIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" /><circle cx="12" cy="17" r="0.5" fill="currentColor" /></svg>
);
const CheckSquareIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="3" strokeWidth={2} /><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>
);
const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);
const BagIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
);
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
const RunIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
);
const WaterDropIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C12 2 5 10 5 15a7 7 0 0014 0c0-5-7-13-7-13z" /></svg>
);
const RadioIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3" /><path strokeLinecap="round" d="M8.5 8.5a5 5 0 017 7M5 5a9 9 0 0114 14" /></svg>
);
const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const WavesIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3-4 6-4 6 4 6 4 3-4 6-4" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 17s3-4 6-4 6 4 6 4 3-4 6-4" /></svg>
);
const SparklesIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3l1.5 4.5L11 9l-4.5 1.5L5 15l-1.5-4.5L-1 9l4.5-1.5L5 3z" /></svg>
);

const tabs = [
  {
    key: 'before',
    label: 'Before Flood',
    icon: <PlusBoxIcon />,
    src: '/images/before_flood_image.jpg',
    alt: 'Preparation kit',
    heading: 'Before a flood',
    cards: [
      { icon: <DocumentIcon />, title: 'Create an emergency plan', bullets: ['Develop a family emergency plan and contact list.', 'Practice your plan regularly.'] },
      { icon: <BagIcon />, title: 'Prepare your emergency kit', bullets: ['Assemble food, water, first-aid supplies, and radio.'] },
      { icon: <HomeIcon />, title: 'Store important documents', bullets: ['Keep policies and IDs in a waterproof container.'] },
    ],
  },
  {
    key: 'during',
    label: 'During Flood',
    icon: <TriangleAlertIcon />,
    src: '/images/during_flood_image.jpg',
    alt: 'Flood evacuation',
    heading: 'During a flood',
    cards: [
      { icon: <RunIcon />, title: 'Evacuate if ordered', bullets: ['Leave immediately if authorities tell you.', 'Do not wait until the last minute.'] },
      { icon: <WaterDropIcon />, title: 'Avoid contact with water', bullets: ["Don't walk or drive through flood water.", 'Turn around, don\'t drown!'] },
      { icon: <RadioIcon />, title: 'Stay informed', bullets: ['Monitor local news and weather reports.', 'Listen to officials for instructions.'] },
    ],
  },
  {
    key: 'after',
    label: 'After Flood',
    icon: <CheckSquareIcon />,
    src: '/images/after_flood_image.jpg',
    alt: 'Recovery and cleanup',
    heading: 'After a flood',
    cards: [
      { icon: <ClockIcon />, title: 'Wait for clearance', bullets: ['Return only when authorities say it is safe.', 'Watch for receded waters and debris.'] },
      { icon: <WavesIcon />, title: 'Avoid floodwater', bullets: ["Don't walk through moving water.", 'Use a stick to check ground firmness.'] },
      { icon: <SparklesIcon />, title: 'Clean and disinfect', bullets: ['Clean everything that got wet.', 'Wear protective boots and gloves.'] },
    ],
  },
];

export default function SafetyGuidesSection() {
  const [activeTab, setActiveTab] = useState('before');
  const current = tabs.find((t) => t.key === activeTab)!;

  return (
    <section className="bg-white py-20" id="safety-guides">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-10">
        
        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className=" text-4xl md:text-5xl font-bold text-center">
            Safety <span className="text-[#2F327D]">Guides</span>
          </h1>
          <p className="text-lg text-gray-500 text-center leading-relaxed">
            Educational resources are essential in helping people prepare for
            and respond to floods effectively. They provide important knowledge
            that can save lives.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border text-sm md:text-base font-semibold transition-all
                ${
                  activeTab === tab.key
                    ? 'border-[#2F327D] text-white bg-[#2F327D] shadow-lg shadow-[#2F327D]/20'
                    : 'border-gray-200 text-gray-500 bg-white hover:border-[#2F327D]/40 hover:text-[#2F327D]'
                }`}
            >
              <span className="shrink-0">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Layout */}
        <div className="flex flex-col gap-8">
          {/* Hero Image */}
          <div className="relative w-full h-64 md:h-96 rounded-[2.5rem] overflow-hidden shadow-xl">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
            {/* Overlay Tag */}
            <div className="absolute bottom-6 left-6">
              <div className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-white/50">
                <span className="font-poppins font-bold text-[#2F327D] text-lg">
                  {current.heading}
                </span>
              </div>
            </div>
          </div>

          {/* Grid of Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {current.cards.map((card, i) => (
              <SafetyGuideInfoCard
                key={i}
                icon={card.icon}
                title={card.title}
                bullets={card.bullets}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}