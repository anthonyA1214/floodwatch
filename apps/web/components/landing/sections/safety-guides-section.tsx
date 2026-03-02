'use client';

import { useState } from 'react';
import Image from 'next/image';
import SafetyGuideInfoCard from '../safety-guide-info-card';
import {
  IconAlertTriangle,
  IconBriefcase,
  IconClipboardText,
  IconClock,
  IconHome,
  IconRadio,
  IconRipple,
  IconRun,
  IconSparkles,
  IconSquareCheck,
  IconSquarePlus,
  IconWaterpolo,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const tabs = [
  {
    key: 'before',
    label: 'Before Flood',
    icon: IconSquarePlus,
    src: '/images/before_flood_image.jpg',
    alt: 'Preparation kit',
    heading: 'Before a flood',
    cards: [
      {
        icon: IconClipboardText,
        title: 'Create an emergency plan',
        bullets: [
          'Develop a family emergency plan including an emergency contact list and evacuation plan.',
          'Practice your plan regularly to avoid confusion.',
        ],
      },
      {
        icon: IconBriefcase,
        title: 'Prepare your emergency kit',
        bullets: [
          'Assemble essential items like non-perishable food, clean water, first-aid supplies, and battery-powered or hand-crank radio.',
        ],
      },
      {
        icon: IconHome,
        title: 'Store important documents',
        bullets: [
          'Keep critical documents such as insurance policies, identification, and medical records in a waterproof container.',
        ],
      },
    ],
  },
  {
    key: 'during',
    label: 'During Flood',
    icon: IconAlertTriangle,
    src: '/images/during_flood_image.jpg',
    alt: 'Flood evacuation',
    heading: 'During a flood',
    cards: [
      {
        icon: IconRun,
        title: 'Evacuate if ordered',
        bullets: [
          'If local authorities tell you to evacuate, do so immediately and take your emergency kit with you.',
          'Do not wait until the last minute.',
        ],
      },
      {
        icon: IconWaterpolo,
        title: 'Avoid contact with water',
        bullets: [
          "Do not walk, swim, or drive through flood water. Turn around, don't drown!",
          'Just six inches of moving water can knock you down and one foot of moving water can sweep your vehicle away.',
        ],
      },
      {
        icon: IconRadio,
        title: 'Stay informed',
        bullets: [
          'Monitor local news and weather reports for updates',
          'Listen to officials for information and instructions',
        ],
      },
    ],
  },
  {
    key: 'after',
    label: 'After Flood',
    icon: IconSquareCheck,
    src: '/images/after_flood_image.jpg',
    alt: 'Recovery and cleanup',
    heading: 'After a flood',
    cards: [
      {
        icon: IconClock,
        title: 'Wait for clearance',
        bullets: [
          'Do not return until authorities say it is safe.',
          'Be aware of areas where floodwaters have receded and watch for debris.',
          'Floodwaters may still be contaminated or unsafe.',
        ],
      },
      {
        icon: IconRipple,
        title: 'Avoid floodwater',
        bullets: [
          'Do not walk through moving water. Six inches of moving water can knock you down.',
          'Use a stick to check the firmness of the ground in front of you',
          "Do not drive through a flooded area. Don't drive around barricades.",
        ],
      },
      {
        icon: IconSparkles,
        title: 'Clean and disinfect',
        bullets: [
          'Clean and disinfect everything that got wet. Mud left from floodwater can contain sewage and chemicals',
          'Wear protective clothing including rubber boots, rubber gloves and masks',
          'Throw away items that cannot be washed or disinfected.',
        ],
      },
    ],
  },
];

export default function SafetyGuidesSection() {
  const [activeTab, setActiveTab] = useState('before');
  const current = tabs.find((t) => t.key === activeTab)!;

  return (
    <section className="bg-white py-20" id="safety-guides">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-10">
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

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 max-w-xs sm:max-w-none mx-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full border text-xs md:text-base font-semibold transition-all whitespace-nowrap',
                i === tabs.length - 1 &&
                  'col-span-2 sm:col-span-1 w-fit mx-auto',
                activeTab === tab.key
                  ? 'border-[#0066CC] text-white bg-[#0066CC] shadow-lg shadow-[#0066CC]/20'
                  : 'border-gray-200 text-gray-500 bg-white hover:border-[#0066CC]/40 hover:text-[#0066CC]',
              )}
            >
              <tab.icon className="w-[1.5em]! h-[1.5em]!" />
              <span>{tab.label.toUpperCase()}</span>
            </button>
          ))}
        </div>

        {/* Content Layout */}
        <div className="flex flex-col gap-8">
          {/* Hero Image */}
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
            {/* Overlay Tag */}
            <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 md:px-6 md:py-2 rounded-full shadow-lg border border-white/50">
                <span className="font-poppins font-bold text-[#0066CC] text-sm md:text-lg">
                  {current.heading.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Grid of Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[320px]">
            {current.cards.map((card, i) => (
              <SafetyGuideInfoCard
                key={i}
                icon={card.icon}
                title={card.title}
                bullets={card.bullets}
                className={cn(
                  current.cards.length % 2 !== 0 &&
                    i === current.cards.length - 1 &&
                    'sm:col-span-2 lg:col-span-1 sm:w-1/2 sm:mx-auto lg:w-auto lg:mx-0',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
