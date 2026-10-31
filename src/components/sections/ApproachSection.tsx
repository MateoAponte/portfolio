import type { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { BotanicalSectionTag } from '@/components/BotanicalSectionTag';
import {
  GitBranch,
  FileCode,
  Users,
  BookOpen,
  Lightbulb,
  Shield,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const principles = [
  {
    icon: Lightbulb,
    title: 'Design before code',
    description:
      'I clarify the user flow and system constraints before choosing an implementation.',
  },
  {
    icon: GitBranch,
    title: 'Decisions with explicit trade-offs',
    description:
      'I compare alternatives and record why a choice fits the current constraints.',
  },
  {
    icon: Shield,
    title: 'Maintainability over cleverness',
    description:
      'I choose code the team can understand, review and change.',
  },
  {
    icon: BookOpen,
    title: 'Documentation as product',
    description:
      'I keep system diagrams and decision notes alongside the implementation.',
  },
  {
    icon: FileCode,
    title: 'DX as a multiplier',
    description:
      'I automate repeatable checks so reviews can focus on behavior and design.',
  },
  {
    icon: Users,
    title: 'Collaboration with product & design',
    description:
      'I discuss technical constraints with product and design before they become user-facing compromises.',
  },
];

export const ApproachSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });
  const trail = useRef<HTMLOListElement>(null);
  const revealed = useRef(new Set<number>());
  const [connections, setConnections] = useState<string[]>([]);
  useEffect(() => {
    const host = trail.current;
    if (!host) return;
    const measure = () => {
      const bounds = host.getBoundingClientRect();
      const nodes = [...host.querySelectorAll<HTMLElement>('[data-thought-node]')];
      const rows = [...host.children].filter(x => x.tagName === 'LI');
      setConnections(nodes.slice(0, -1).map((node, index) => {
        const from = node.getBoundingClientRect();
        const to = nodes[index + 1].getBoundingClientRect();
        const row = rows[index].getBoundingClientRect();
        const next = rows[index + 1].getBoundingClientRect();
        const x1 = from.left + from.width / 2 - bounds.left;
        const x2 = to.left + to.width / 2 - bounds.left;
        const y1 = from.bottom - bounds.top;
        const y2 = to.top - bounds.top;
        const mid = (row.bottom + next.top) / 2 - bounds.top;
        if (Math.abs(x2 - x1) < 1) return 'M' + x1 + ' ' + y1 + 'V' + y2;
        const d = x2 > x1 ? 1 : -1;
        return 'M' + x1 + ' ' + y1 + 'V' + (mid - 12) + 'Q' + x1 + ' ' + mid + ' ' + (x1 + d * 12) + ' ' + mid + 'H' + (x2 - d * 12) + 'Q' + x2 + ' ' + mid + ' ' + x2 + ' ' + (mid + 12) + 'V' + y2;
      }));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    host.querySelectorAll('li').forEach(node => observer.observe(node));
    measure();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = trail.current;
    if (!host || !connections.length) return;
    let disposed = false;
    let media: ReturnType<typeof gsap.matchMedia> | undefined;
    void import('gsap').then(({ gsap }) => {
      if (disposed) return;
      media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const nodes = [...host.querySelectorAll<HTMLElement>('[data-thought-node]')];
        const content = [...host.querySelectorAll<HTMLElement>('[data-thought-content]')];
        const paths = [...host.querySelectorAll<SVGPathElement>('[data-trail-path]')];
        const drawing = paths.map(path => {
          const length = path.getTotalLength();
          const start = path.getPointAtLength(0).y;
          const end = path.getPointAtLength(length).y;
          gsap.set(path, { strokeDasharray: length });
          const tween = gsap.fromTo(path, { strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1, ease: 'none', paused: true });
          return { tween, start, end };
        });
        const entrances = content.map((element, index) => {
          if (revealed.current.has(index)) {
            gsap.set([element, nodes[index]], { opacity: 1 });
            gsap.set(element, { x: 0 });
            return null;
          }
          const entrance = gsap.timeline({ paused: true });
          entrance.fromTo(nodes[index], { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0);
          entrance.fromTo(element, { opacity: 0, x: index % 2 ? 28 : -28 }, { opacity: 1, x: 0, duration: 0.65, ease: 'power2.out' }, 0);
          return entrance;
        });
        let frame = 0;
        const update = () => {
          frame = 0;
          const readingLine = window.innerHeight * 0.65;
          const cursor = readingLine - host.getBoundingClientRect().top;
          drawing.forEach(({ tween, start, end }) => {
            tween.progress(gsap.utils.clamp(0, 1, (cursor - start) / Math.max(1, end - start)));
          });
          nodes.forEach((node, index) => {
            if (!revealed.current.has(index) && node.getBoundingClientRect().top <= readingLine) {
              revealed.current.add(index);
              entrances[index]?.play();
            }
          });
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        update();
        return () => {
          cancelAnimationFrame(frame);
          window.removeEventListener('scroll', schedule);
          window.removeEventListener('resize', schedule);
        };
      }, host);
    }).catch(() => { /* The complete static trail remains available without GSAP. */ });
    return () => { disposed = true; media?.revert(); };
  }, [connections]);

  return (
    <section
      id="approach"
      className="py-20 md:py-24 relative overflow-hidden section-separator"
    >
      {/* Ambient background glow */}
      <div className="ambient-glow ambient-glow-right" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <BotanicalSectionTag label="Approach" />
          <h2
            className={`mt-4 text-3xl md:text-4xl font-bold text-foreground ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}
          >
            How I make decisions
          </h2>
          <p
            className={`mt-4 lg:text-lg text-base text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}
          >
            The questions and habits behind my technical choices.
          </p>
        </div>

        <ol ref={trail} className="relative isolate mx-auto flex max-w-5xl flex-col gap-10 md:gap-12">
          <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible" fill="none" stroke="#a5ad80" strokeOpacity="0.4" strokeWidth="1.2">
            {connections.map((path, index) => <path data-trail-path key={index} d={path} />)}
          </svg>
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <li key={principle.title} className={`approach-item w-full md:w-[calc(50%-1.5rem)] ${index % 2 ? 'self-end' : 'self-start'}`}>
                <div className="flex items-start gap-4">
                  <div data-thought-node className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#52664c] bg-[#14251e] text-primary">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div data-thought-content className="min-w-0 pt-1">
                    <div className="approach-hover origin-top-left">
                    <h3 className="mb-3 text-xl font-semibold text-foreground">{principle.title}</h3>
                    <p className="text-base leading-relaxed text-muted-foreground">{principle.description}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
