import { useState } from 'react';
import { Zap, Menu, X, ArrowUpRight } from 'lucide-react';
import { Dialog } from 'radix-ui';
import { Button } from '@/components/ui/button';
import CallToAction from '@/components/CallToAction';
import { navigation } from '@/data/siteContent';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="logo" href="#home">
        <Zap fill="currentColor" size={26} />
        <strong>衡能</strong>
        <span>
          HENG
          <br />
          ENERGY
        </span>
      </a>
      <nav className="nav" aria-label="主要導覽">
        {navigation.map(({ id, label }) => (
          <a key={id} href={'#' + id}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <CallToAction placement="nav" className="header-cta" />
        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="menu-trigger"
              aria-label="開啟全螢幕導覽"
            >
              <Menu />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay" />
            <Dialog.Content className="fullscreen-menu">
              <div className="menu-top">
                <Dialog.Title>HENG / 探索衡能</Dialog.Title>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" aria-label="關閉全螢幕導覽">
                    <X />
                  </Button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="menu-description">
                從看見可能，到採取行動。
              </Dialog.Description>
              <nav aria-label="全螢幕導覽">
                {[...navigation, { id: 'assessment', label: '申請初步評估' }].map(
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
                <span>企業節能服務 / 概念網站</span>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
