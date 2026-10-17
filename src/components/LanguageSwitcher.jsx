import { useLanguage } from '@/i18n/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      className="language-switcher"
      role="group"
      aria-label={language === 'en' ? 'Website language' : '網站語言'}
    >
      <button
        type="button"
        lang="zh-Hant"
        aria-pressed={language === 'zh-Hant'}
        onClick={() => setLanguage('zh-Hant')}
      >
        中
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        lang="en"
        aria-pressed={language === 'en'}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}
