import { useLanguage } from '@/i18n/LanguageContext';
import { useState } from 'react';
import { Zap, Menu, X, ArrowUpRight } from 'lucide-react';
import { Dialog } from 'radix-ui';
import { Button } from '@/components/ui/button';
import CallToAction from '@/components/CallToAction';
import { navigation as originalNavigation } from '@/data/siteContent';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function SiteHeader() {
  const { t, localize } = useLanguage();
  const navigation = localize(originalNavigation);

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="logo" href="#home">
        <Zap fill="currentColor" size={26} />
        <strong>{t('衡能')}</strong>
        <span>
          HENG
          <br />
          ENERGY
        </span>
      </a>
      <nav className="nav" aria-label={t('主要導覽')}>
        {navigation.map(({ id, label }) => (
          <a key={id} href={'#' + id}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <LanguageSwitcher />
        <CallToAction placement="nav" className="header-cta" />
        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="menu-trigger"
              aria-label={t('開啟全螢幕導覽')}
            >
              <Menu />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay" />
            <Dialog.Content className="fullscreen-menu">
              <div className="menu-top">
                <LanguageSwitcher />
                <Dialog.Title>{t('HENG / 探索衡能')}</Dialog.Title>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" aria-label={t('關閉全螢幕導覽')}>
                    <X />
                  </Button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="menu-description">
                {t('從看見可能，到採取行動。')}
              </Dialog.Description>
              <nav aria-label={t('全螢幕導覽')}>
                {[...navigation, { id: 'assessment', label: t('申請初步評估') }].map(
                  ({ id, label }, index) => (
                    <Dialog.Close asChild key={id}>
                      <a href={'#' + id}>
                        <span>0{index + 1}</span>
                        <strong>{label}</strong>
                        <ArrowUpRight />
                      </a>
                    </Dialog.Close>
                  ),
                )}
              </nav>
              <div className="menu-bottom">
                <span>BETTER ENERGY. BETTER BUSINESS.</span>
                <span>{t('企業節能服務 / 概念網站')}</span>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
