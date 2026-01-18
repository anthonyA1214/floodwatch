import AboutUs from '@/components/landing/about-us-section';
import HeroSection from '@/components/landing/hero-section';
import LatestNewsReport from '@/components/landing/latest-news-report-section';
import SafetyGuidesSection from '@/components/landing/safety-guides-section';
import SystemFeatures from '@/components/landing/system-features-section';

export default function Page() {
  return (
    <div className="flex flex-col mx-auto py-8 md:py-0 pt-16">
      <HeroSection />
      <div className="px-4 md:px-0">
        <SystemFeatures />
        <SafetyGuidesSection />
        <LatestNewsReport />
        <AboutUs />
      </div>
    </div>
  );
}
 