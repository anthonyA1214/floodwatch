import HeroSection from '@/components/landing/hero-section';
import SafetyGuidesSection from '@/components/landing/safety-guides-section';

export default function Page() {
  return (
    <div className="flex flex-col mx-auto py-8 md:py-0 pt-16">
      <HeroSection />
      {/* Features section */}
      <SafetyGuidesSection />
    </div>
  );
}
