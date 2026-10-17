import { useLanguage } from '@/i18n/LanguageContext';
import { Zap } from 'lucide-react';
export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <a href="#home" className="logo">
        <Zap fill="currentColor" size={23} />
        <strong>{t('衡能')}</strong>
        <span>
          HENG
          <br />
          ENERGY
        </span>
      </a>
      <p>{t('讓每一度電，都有更好的去處。')}</p>
      <span>{t('© 2026 HENG · 原創概念網站')}</span>
    </footer>
  );
}
