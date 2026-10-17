import { useLanguage } from '@/i18n/LanguageContext';
import { scenarios as originalScenarios } from '@/data/siteContent';
export default function ScopeBar() {
  const { t, localize } = useLanguage();
  const scenarios = localize(originalScenarios);

  return (
    <div className="scope-bar">
      <span>{t('為不同現場，找到合適起點')}</span>
      {scenarios.map((scenario) => (
        <span key={scenario.id}>
          <scenario.icon size={16} />
          {scenario.label}
        </span>
      ))}
    </div>
  );
}
