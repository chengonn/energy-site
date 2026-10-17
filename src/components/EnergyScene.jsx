import { useLanguage } from '@/i18n/LanguageContext';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function EnergyScene() {
  const { t } = useLanguage();

  const mount = useRef(null);
  const [enabled, setEnabled] = useState(true);
  const [fallback, setFallback] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = mount.current;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    let disposeScene = () => {};
    setReady(false);
    if (reducedMotion || !enabled) return;

    // 只有需要動畫時才載入 Three.js；卸載後不再建立場景。
    import('@/lib/createEnergyScene')
      .then(({ createEnergyScene }) => {
        if (cancelled) return;
        disposeScene = createEnergyScene(host, {
          onReady: () => setReady(true),
          onError: () => {
            setFallback(true);
            setReady(false);
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFallback(true);
      });

    return () => {
      cancelled = true;
      disposeScene();
    };
  }, [enabled]);

  return (
    <div className="scene-wrap">
      <div
        className="scene-static"
        style={{ visibility: ready ? 'hidden' : 'visible' }}
        aria-hidden="true"
      >
        <div className="static-ring" />
        <div className="static-core">H</div>
      </div>
      <div
        className="scene-canvas"
        ref={mount}
        role="img"
        aria-label={t('互動 3D 能源核心與環繞軌道')}
      />
      <div className="scene-label top">
        <span className="live-dot" /> ENERGY SYSTEM / 001
      </div>
      <div className="scene-label bottom">DISCOVER → PRIORITIZE → VERIFY</div>
      <button
        className="scene-toggle"
        onClick={() => setEnabled(!enabled)}
        aria-label={enabled ? t('暫停 3D 動畫') : t('播放 3D 動畫')}
      >
        {enabled ? <Pause size={13} /> : <Play size={13} />}{' '}
        {fallback ? t('靜態視覺') : enabled ? t('暫停動畫') : t('播放動畫')}
      </button>
    </div>
  );
}
