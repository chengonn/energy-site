import { useEffect } from 'react';

export default function useSectionReveal() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const elements = document.querySelectorAll(
      '.section-intro, .principle-card, .deliverable',
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          target.classList.add('is-revealed');
          observer.unobserve(target);
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((element) => {
      // 不隱藏目前可見的內容，避免重載造成闪爍。
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        element.classList.add('reveal-on-scroll');
        observer.observe(element);
      }
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) =>
        element.classList.remove('reveal-on-scroll', 'is-revealed'),
      );
    };
  }, []);
}
