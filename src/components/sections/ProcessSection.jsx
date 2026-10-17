import { useLanguage } from '@/i18n/LanguageContext';
import { useRef } from 'react';
import { ArrowDown, ArrowUpRight, MessageSquare, ScanLine, Route } from 'lucide-react';
import { processSteps as originalProcessSteps } from '@/data/siteContent';
import SectionHeading from '@/components/SectionHeading';
import useScrollProgress from '@/hooks/useScrollProgress';
import useMediaQuery from '@/hooks/useMediaQuery';

const stepIcons = [MessageSquare, ScanLine, Route];

export default function ProcessSection() {
  const { t, localize } = useLanguage();
  const processSteps = localize(originalProcessSteps);

  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);
  const cinematic = useMediaQuery(
    '(min-width: 901px) and (prefers-reduced-motion: no-preference)',
  );
  const activeStep = Math.min(2, Math.floor(progress * 3));

  function goToStep(index) {
    const section = sectionRef.current;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const distance = section.offsetHeight - window.innerHeight;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: top + (index / 3 + 0.08) * distance,
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  }

  return (
    <section className="section process-story" id="process" ref={sectionRef}>
      <div className="story-sticky">
        <SectionHeading number="→" english="SCROLL TO DISCOVER">
          {t('合作流程')}
        </SectionHeading>
        <div className="story-top">
          <h2>
            {t('把下一步，')}
            <br />
            <span>{t('一點一點變清楚。')}</span>
          </h2>
          <a href="#questions" className="story-skip">
            {t('跳過流程')}
            <ArrowDown size={14} />
          </a>
        </div>
        <div className="story-stage">
          <div className="story-navigation" aria-label={t('流程階段')}>
            {processSteps.map((step, index) => (
              <button
                key={step.label}
                className={activeStep === index ? 'active' : ''}
                aria-current={activeStep === index ? 'step' : undefined}
                onClick={() => goToStep(index)}
              >
                <span>0{index + 1}</span>
                {step.label}
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
          <div className="story-cards">
            {processSteps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <article
                  key={step.label}
                  className={'story-card ' + (activeStep === index ? 'active' : '')}
                  aria-hidden={cinematic && activeStep !== index ? true : undefined}
                >
                  <div className="story-visual">
                    <span>0{index + 1}</span>
                    <Icon size={110} strokeWidth={0.7} />
                    <div className="story-visual-ring" />
                  </div>
                  <div className="story-description">
                    <span className="eyebrow">
                      STEP 0{index + 1} / {step.label}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    <small>{t('深入診斷與執行方案另行討論。')}</small>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="story-bottom">
          <span>{t('滾動，探索每一步')}</span>
          <div
            className="story-progress"
            role="progressbar"
            aria-label={t('流程瀏覽進度')}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
          <strong>0{activeStep + 1} / 03</strong>
        </div>
      </div>
    </section>
  );
}
