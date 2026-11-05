import { GitBranch, Users, BookOpen, Lightbulb, Shield } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const principles = [
  { icon: Lightbulb, title: 'Understand the context', description: 'I clarify customer needs and business constraints with stakeholders, then define an MVP the team can deliver and learn from.' },
  { icon: GitBranch, title: 'Design before code', description: 'I map user flows and system boundaries with product and design, weighing delivery effort, user experience and maintenance.' },
  { icon: Shield, title: 'Build for reliable delivery', description: 'I pair clear architecture with tests and QA. AI and automation support engineering judgment and help the team deliver consistently.' },
  { icon: BookOpen, title: 'Make systems understandable', description: 'I keep diagrams and decision notes alongside the code, using monitoring to understand behavior and guide changes.' },
  { icon: Users, title: 'Keep improving after launch', description: 'I review feedback and production behavior with product and design, turning what we learn into the next iteration.' },
];

const PrincipleContent = ({ principle, index }: { principle: typeof principles[number]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15, rootMargin: '0px 0px -24px 0px' });
  const Icon = principle.icon;
  return (
    <div ref={ref} className={`min-w-0 transition-[opacity,transform] duration-700 ease-out motion-reduce:!translate-x-0 motion-reduce:!opacity-100 motion-reduce:transition-none md:py-1 ${index % 2 === 0 ? 'md:col-start-1 md:pr-4' : 'md:col-start-2 md:pl-4'} ${isVisible ? 'translate-x-0 opacity-100' : index % 2 === 0 ? '-translate-x-8 opacity-0' : 'translate-x-8 opacity-0'}`}>
      <Icon size={20} className="mb-3 text-primary" aria-hidden="true" />
      <h3 className="text-xl font-semibold leading-tight text-foreground">{principle.title}</h3>
      <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">{principle.description}</p>
    </div>
  );
};

export const ApproachSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!timelineRef.current || !progressRef.current) return;
      const { top, height } = timelineRef.current.getBoundingClientRect();
      const progress = motion.matches ? 1 : Math.max(0, Math.min(1, (innerHeight * 0.65 - top) / height));
      progressRef.current.style.transform = `scaleY(${progress})`;
      timelineRef.current.querySelectorAll<SVGPathElement>('[data-connector-progress]').forEach(path => {
        const bounds = path.closest('svg')!.getBoundingClientRect();
        const filled = motion.matches ? 1 : Math.max(0, Math.min(1, (innerHeight * 0.65 - bounds.top) / bounds.height));
        path.style.strokeDashoffset = String(1 - filled);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    if (timelineRef.current) observer.observe(timelineRef.current);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
    };
  }, []);
  return (
  <section id="approach" aria-labelledby="approach-heading" className="relative overflow-hidden py-12 md:py-24">
    <div className="container mx-auto px-6 sm:px-10 xl:px-12">
      <div>
        <h2 id="approach-heading" className="text-3xl font-bold text-foreground md:text-4xl">How I work</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">I question assumptions and connect user experience with software design, keeping each iteration focused on business value.</p>
      </div>
      <div ref={timelineRef} className="relative mt-10 md:mt-14">
        <div aria-hidden="true" className="absolute bottom-0 left-2 top-0 w-px md:hidden">
          <div ref={progressRef} className="h-full w-full origin-top bg-primary" />
        </div>
      <ol className="space-y-8 md:space-y-20">
        {principles.map((principle, index) => (
          <li key={principle.title} className="relative pl-10 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
            <span aria-hidden="true" className="absolute left-[3px] top-2 h-[11px] w-[11px] rounded-full border border-primary bg-background md:hidden" />
            <PrincipleContent principle={principle} index={index} />
            {index < principles.length - 1 && (
              <svg aria-hidden="true" viewBox="0 0 1000 80" preserveAspectRatio="none" className={`pointer-events-none absolute -bottom-16 left-[20%] hidden h-12 w-[60%] overflow-visible text-primary md:block ${index % 2 ? '-scale-x-100' : ''}`} fill="none" stroke="currentColor" strokeWidth="1" >
                <path data-connector-progress pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M 0 0 V 8 Q 0 40 48 40 H 952 Q 1000 40 1000 72 V 80" vectorEffect="non-scaling-stroke" />
              </svg>
            )}
          </li>
        ))}
      </ol>
      </div>
    </div>
  </section>
  );
};
