import { Zap } from 'lucide-react';
export default function SiteFooter() {
  return (
    <footer className="footer">
      <a href="#home" className="logo">
        <Zap fill="currentColor" size={23} />
        <strong>衡能</strong>
        <span>
          HENG
          <br />
          ENERGY
        </span>
      </a>
      <p>讓每一度電，都有更好的去處。</p>
      <span>© 2026 HENG · 原創概念網站</span>
    </footer>
  );
}
