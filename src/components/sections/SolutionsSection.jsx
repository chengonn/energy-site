import { useLanguage } from '@/i18n/LanguageContext';
import { Check } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { scenarios as originalScenarios } from '@/data/siteContent';
import { analytics } from '@/lib/analytics';
import ImprovementGallery from '@/components/ImprovementGallery';
import CallToAction from '@/components/CallToAction';
import SectionHeading from '@/components/SectionHeading';
export default function SolutionsSection() {
  const { t, localize } = useLanguage();
  const scenarios = localize(originalScenarios);

  return (
    <section className="section solution-section" id="solutions">
      <SectionHeading number="03" english="FIND YOUR STARTING POINT">
        {t('理解方案')}
      </SectionHeading>
      <div className="section-intro">
        <h2>
          {t('現場各有不同，')}
          <br />
          <span>{t('解法也應該如此。')}</span>
        </h2>
        <p>
          {t(
            '選擇你的場域，看看評估可以從哪裡切入。實際範圍依設備、資料與營運需求確認。',
          )}
        </p>
      </div>
      <Tabs
        defaultValue="factory"
        onValueChange={(scenario) => analytics.track('scenario_select', { scenario })}
      >
        <TabsList className="scenario-tabs">
          {scenarios.map((scenario) => (
            <TabsTrigger value={scenario.id} key={scenario.id}>
              <scenario.icon size={17} />
              {scenario.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {scenarios.map((scenario) => (
          <TabsContent key={scenario.id} value={scenario.id} className="scenario-panel">
            <div className="facility-visual">
              <div className="facility-kicker">FACILITY / SYSTEM VIEW</div>
              <scenario.icon size={110} strokeWidth={0.7} />
              <div className="facility-nodes">
                {[t('需求'), t('設備'), t('資料')].map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
              <div className="facility-foot">
                <span className="live-dot" />
                {t('從系統關係，找到改善切入點')}
              </div>
            </div>
            <div className="scenario-copy">
              <span className="eyebrow">{scenario.id.toUpperCase()} / ENERGY REVIEW</span>
              <h3>{scenario.title}</h3>
              <p>{scenario.description}</p>
              <ul>
                {scenario.items.map((x) => (
                  <li key={x}>
                    <Check size={14} />
                    {x}
                  </li>
                ))}
              </ul>
              <CallToAction placement={'solution-' + scenario.id} className="outline-cta">
                {t('評估我的場域')}
              </CallToAction>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <ImprovementGallery />
    </section>
  );
}
