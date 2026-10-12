import { useRef } from 'react';
import { ArrowLeft, ArrowRight, MoveHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';
import { improvementDirections } from '@/data/improvementDirections';

export default function ImprovementGallery() {
  const railRef = useRef(null);
  const dragRef = useRef(null);

  function moveGallery(direction) {
    const rail = railRef.current;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.scrollBy({
      left: direction * rail.clientWidth * 0.75,
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  }

  function startDrag(event) {
    // 觸控使用瀏覽器原生滑動，保留正常的上下捲動。
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const rail = railRef.current;
    dragRef.current = { x: event.clientX, left: rail.scrollLeft, recorded: false };
    rail.setPointerCapture(event.pointerId);
    rail.classList.add('is-dragging');
  }

  function drag(event) {
    const start = dragRef.current;
    if (!start) return;
    railRef.current.scrollLeft = start.left - (event.clientX - start.x);
    if (Math.abs(event.clientX - start.x) > 12 && !start.recorded) {
      analytics.track('improvement_gallery_drag');
      start.recorded = true;
    }
  }

  function stopDrag() {
    dragRef.current = null;
    railRef.current.classList.remove('is-dragging');
  }

  return (
    <div className="improvement-gallery">
      <div className="gallery-heading">
        <div>
          <span className="eyebrow">EXPLORE THE POSSIBILITIES</span>
          <h3>改善，可能從這裡開始。</h3>
        </div>
        <div className="gallery-controls">
          <span>
            <MoveHorizontal size={15} /> 拖曳探索
          </span>
          <Button
            variant="outline"
            size="icon"
            aria-label="上一個改善方向"
            onClick={() => moveGallery(-1)}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="下一個改善方向"
            onClick={() => moveGallery(1)}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div
        ref={railRef}
        className="gallery-rail"
        tabIndex={0}
        role="region"
        aria-label="改善方向，可左右滑動或使用方向鍵"
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onLostPointerCapture={stopDrag}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            moveGallery(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
      >
        {improvementDirections.map(
          ({ icon: Icon, label, title, description, visual }, index) => (
            <article className="gallery-card" key={label}>
              <div className={'gallery-art ' + visual} aria-hidden="true">
                <div className="gallery-grid" />
                <Icon size={105} strokeWidth={0.7} />
                <span>0{index + 1} / ENERGY OPPORTUNITY</span>
                <div className="gallery-orbit" />
              </div>
              <div className="gallery-card-copy">
                <span className="eyebrow">{label}</span>
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
            </article>
          ),
        )}
      </div>
      <p className="gallery-note">
        以上為評估切入點示意，實際改善方向需依場域與資料確認。
      </p>
    </div>
  );
}
