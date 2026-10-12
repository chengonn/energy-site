import { useEffect, useState } from 'react';

// 以原生捲動計算區塊進度；不攔截滾輪或觸控操作。
export default function useScrollProgress(elementRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const element = elementRef.current;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - window.innerHeight);
      const value = Math.max(0, Math.min(1, -bounds.top / distance));
      setProgress(Math.round(value * 1000) / 1000);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [elementRef]);

  return progress;
}
