import { useEffect, useRef, useState } from 'react';

const layers = [
  { name: 'sky', speed: 0.28 },
  { name: 'landscape', speed: 0.11 },
  { name: 'foreground', speed: -0.12 },
];

export const HeroParallax = () => {
  const host = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [loaded, setLoaded] = useState<string[]>([]);
  const ready = loaded.length === layers.length;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: no-preference) and (min-width: 768px)');
    const updatePreference = () => setEnabled(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (!enabled || !ready) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = host.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      // Bound travel to the overscan area so no empty edges become visible.
      const distance = Math.min(Math.max(-rect.top, 0), rect.height * 0.2);
      element.style.setProperty('--hero-travel', `${distance}px`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled, ready]);

  return (
    <div ref={host} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      <img src="/images/hero-workspace.png" alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[65%_center] lg:object-center" />
      {enabled && layers.map(layer => (
        <div key={layer.name} className={`absolute inset-0 origin-center transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`} style={{ transform: `translate3d(0, calc(var(--hero-travel, 0px) * ${layer.speed}), 0) scaleY(1.12)` }}>
          <img src={`/images/hero-parallax-${layer.name}.png`} alt="" onLoad={() => setLoaded(current => current.includes(layer.name) ? current : [...current, layer.name])} className="h-full w-full object-cover object-[65%_center] lg:object-center" />
        </div>
      ))}
    </div>
  );
};
