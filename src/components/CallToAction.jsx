import { useLanguage } from '@/i18n/LanguageContext';
import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';
export default function CallToAction({ placement, children, className = '' }) {
  const { t } = useLanguage();

  const buttonRef = useRef(null);
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const exposureObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          analytics.track('cta_view', { placement });
          exposureObserver.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    exposureObserver.observe(buttonRef.current);
    return () => exposureObserver.disconnect();
  }, [placement]);
  return (
    <Button ref={buttonRef} asChild className={className}>
      <a href="#assessment" onClick={() => analytics.track('cta_click', { placement })}>
        {children ?? t('申請初步評估')}
        <ArrowUpRight size={17} />
      </a>
    </Button>
  );
}
