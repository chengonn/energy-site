import { useLanguage } from '@/i18n/LanguageContext';
import { lazy, Suspense } from 'react';
import { ArrowDown, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
const EnergyScene = lazy(() => import('@/components/EnergyScene'));
import CallToAction from '@/components/CallToAction';
export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="home">
      <div className="hero-watermark" aria-hidden="true">
        HENG
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <Badge className="hero-badge">
            <span className="live-dot" /> BETTER ENERGY. BETTER BUSINESS.
          </Badge>
          <h1>
            {t('每一度電，')}
            <br />
            {t('都值得')}
            <span>
              {t('更好的')}
              <br className="desktop-br" />
              {t('去處。')}
            </span>
          </h1>
          <p>
            {t('看清企業的用能盲點，找出值得先做的改善。')}
            <br />
            {t('先理解現場，再決定下一筆投入。')}
          </p>
          <div className="hero-actions">
            <CallToAction placement="hero" />
            <a className="quiet-link" href="#method">
              {t('探索評估方法')}
              <ArrowDown size={15} />
            </a>
          </div>
          <div className="hero-note">
            <ShieldCheck size={14} />
            {t('從需求出發，不需要先決定設備方案')}
          </div>
        </div>
        <div className="hero-visual">
          <Suspense fallback={<div className="scene-loading">ENERGY SYSTEM</div>}>
            <EnergyScene />
          </Suspense>
          <div className="visual-caption">
            <span>{t('01 / 看見可能')}</span>
            <span>INTERACTIVE ENERGY CORE</span>
          </div>
        </div>
      </div>
      <div className="hero-footer">
        <span>{t('企業節能，從清楚的第一步開始。')}</span>
        <a href="#method">
          {t('向下探索')}
          <ArrowDown size={13} />
        </a>
      </div>
    </section>
  );
}
