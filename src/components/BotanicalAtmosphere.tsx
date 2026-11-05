import { useEffect, useRef } from 'react';
import type { gsap } from 'gsap';
import { LeafClassic, LeafLance, LeafRound, LeafPair, LeafGinkgo } from '@/components/SectionTagOrnaments';

// Sparse accents keep the botanical identity behind the actual work.
// Deterministic variation avoids placement changes on remount.
const leafVariants = [LeafClassic, LeafLance, LeafRound, LeafPair, LeafGinkgo];
const accents = Array.from({ length: 9 }, (_, index) => {
  const leaf = index % 4 !== 1;
  const size = leaf ? [40, 58, 78, 96, 52, 66][index % 6] : [6, 9, 12][index % 3];
  return {
    x: [2, 94, 6, 91, 3, 96][index % 6], y: 3 + index * 11,
    leaf, size, angle: (index * 47) % 80 - 40,
  };
});

export const BotanicalAtmosphere = () => {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current) return;
    let disposed = false;
    let media: ReturnType<typeof gsap.matchMedia> | undefined;
    void import('gsap').then(({ gsap }) => {
      if (disposed) return;
      media = gsap.matchMedia();
    media.add({ motion: '(prefers-reduced-motion: no-preference)', mobile: '(max-width: 639px)' }, context => {
      if (!context.conditions?.motion) return;
      const mobile = context.conditions.mobile;
      const elements = Array.from(host.current!.querySelectorAll<HTMLElement>('[data-drift]'));
      const visible = new Set<Element>();
      const tweens = new Map<Element, gsap.core.Tween>();
      elements.forEach((element, index) => {
        const direction = index % 2 ? 1 : -1;
        const tween = gsap.to(element, {
          x: direction * (mobile ? 6 + index % 6 : 12 + index % 12),
          y: -(mobile ? 9 + index % 8 : 18 + index % 18),
          rotation: element.dataset.leaf === 'true' ? direction * (6 + index % 10) : direction * 3,
          duration: 6.5 + (index * 1.73) % 9, ease: 'sine.inOut', repeat: -1, yoyo: true,
          paused: true, transformOrigin: '50% 50%',
        });
        tween.progress((index * 0.17) % 1).pause();
        tweens.set(element, tween);
      });
      const update = () => tweens.forEach((tween, element) => {
        if (!document.hidden && visible.has(element)) tween.resume(); else tween.pause();
      });
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target); });
        update();
      }, { rootMargin: '80px' });
      elements.forEach(element => observer.observe(element));
      document.addEventListener('visibilitychange', update);
      return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
    }, host);
    }).catch(() => { /* Static artwork remains if the optional animation cannot load. */ });
    return () => { disposed = true; media?.revert(); };
  }, []);

  return (
    <div ref={host} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
      {accents.map((accent, index) => {
        const Leaf = leafVariants[index % leafVariants.length];
        return (
        <div key={index} className={index % 3 === 1 ? 'hidden sm:block' : ''} style={{ position: 'absolute', left: accent.x + '%', top: accent.y + '%', width: accent.size, height: accent.leaf ? accent.size * 28 / 48 : accent.size, transform: 'rotate(' + accent.angle + 'deg)' }}>
          <div data-drift data-leaf={accent.leaf} className="relative h-full w-full text-[#a5ad80]" style={{ opacity: accent.leaf ? 0.18 + (index % 4) * 0.03 : 0.22 }}>
            {accent.leaf ? <Leaf className="h-full w-full" /> : <svg viewBox="0 0 12 12" fill="none" className="h-full w-full"><path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" /></svg>}
          </div>
        </div>
        );
      })}
    </div>
  );
};
