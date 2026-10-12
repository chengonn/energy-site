import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import HeroSection from '@/components/sections/HeroSection';
import ScopeBar from '@/components/sections/ScopeBar';
import TrustSection from '@/components/sections/TrustSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import FaqSection from '@/components/sections/FaqSection';
import AssessmentSection from '@/components/sections/AssessmentSection';
import useSectionReveal from '@/hooks/useSectionReveal';

// 閱讀順序：看到 → 信任 → 理解 → 行動。
export default function App() {
  useSectionReveal();
  useEffect(() => {
    if (!analytics.events.some((event) => event.event === 'page_view'))
      analytics.track('page_view');
  }, []);
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ScopeBar />
        <TrustSection />
        <SolutionsSection />
        <ProcessSection />
        <FaqSection />
        <AssessmentSection />
      </main>
      <SiteFooter />
    </>
  );
}
