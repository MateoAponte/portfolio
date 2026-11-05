import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  Monitor,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Bot,
  type LucideIcon,
} from 'lucide-react';
import { TechIcon } from '@/components/TechIcon';
import { BotanicalSectionTag } from '@/components/BotanicalSectionTag';
import { ContourWaves } from '@/components/BotanicalContours';
import { skillGroups } from '@/data/skills';

const groupIcons: Record<string, LucideIcon> = {
  architecture: Layers,
  frontend: Monitor,
  backend: Server,
  data: Database,
  infra: Cloud,
  quality: ShieldCheck,
  ai: Bot,
};

interface SkillGroupProps {
  title: string;
  description: string;
  skills: string[];
  icon: LucideIcon;
  wide?: boolean;
}

const SkillGroup = ({
  title,
  description,
  skills,
  icon: Icon,
  wide = false,
}: SkillGroupProps) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: '0px 0px -24px 0px',
  });
  return (
    <div
      ref={ref}
      data-skill-reveal
      className={`min-w-0 shrink-0 basis-[88%] snap-start translate-y-0 opacity-80 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:!translate-y-0 md:motion-reduce:!opacity-100 ${wide ? 'md:col-span-2' : ''} ${isVisible ? 'md:translate-y-0 md:opacity-100' : 'md:translate-y-8 md:opacity-100'}`}
    >
      <article
        tabIndex={0}
        className="skill-panel h-full min-w-0 rounded-2xl border border-border/50 bg-[#17271f] p-6 sm:p-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#23392e] text-[#a4d9c6]">
            <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl min-[360px]:text-2xl font-semibold leading-tight text-[#f0f3eb] [text-wrap:balance]">
              {title}
            </h3>
            <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-[#bccdc3] [text-wrap:pretty]">
              {description}
            </p>
          </div>
        </div>
        <ul aria-label={title} className="mt-7 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              tabIndex={0}
              className="skill-chip inline-flex min-h-10 max-w-full items-center gap-2 rounded-md border border-transparent bg-[#23372d] px-3 py-2 text-sm font-medium leading-snug text-[#c7ded2] [&>svg]:h-4 [&>svg]:w-4 [&>span[aria-hidden]]:h-4 [&>span[aria-hidden]]:w-4"
            >
              <TechIcon tech={skill} />
              <span className="min-w-0 [overflow-wrap:anywhere]">{skill}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
};

export const SkillsSection = () => {
  const carousel = useRef<HTMLDivElement>(null);
  const [activeGroup, setActiveGroup] = useState(0);

  useEffect(() => {
    const element = carousel.current;
    if (!element) return;
    const update = () => {
      const padding = parseFloat(getComputedStyle(element).paddingLeft);
      const cards = Array.from(element.children) as HTMLElement[];
      let closest = 0;
      cards.forEach((card, index) => {
        if (
          Math.abs(card.offsetLeft - element.scrollLeft - padding) <
          Math.abs(cards[closest].offsetLeft - element.scrollLeft - padding)
        )
          closest = index;
      });
      setActiveGroup(closest);
    };
    update();
    element.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      element.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const goTo = (index: number) => {
    const element = carousel.current;
    const card = element?.children[index] as HTMLElement | undefined;
    if (!element || !card) return;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    element.scrollTo({
      left: card.offsetLeft - parseFloat(getComputedStyle(element).paddingLeft),
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative isolate overflow-hidden py-20 md:py-28"
    >
      <ContourWaves className="-right-20 bottom-0 -z-10 w-[700px] text-[#b69b5e]/20" />
      <div className="container mx-auto px-6 sm:px-10 xl:px-12">
        <BotanicalSectionTag label="Skills" className="mb-6" />
        <h2
          id="skills-heading"
          className="mb-4 text-3xl font-bold leading-tight text-foreground md:text-4xl"
        >
          My development toolkit
        </h2>
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
          I adapt to your stack and propose the technologies needed to build
          reliable, scalable software that feels intuitive to use.
        </p>
        <div className="mb-4 flex items-center justify-between gap-3 md:hidden">
          <p
            id="skills-carousel-hint"
            className="flex items-center gap-2 text-sm font-medium text-primary"
          >
            Swipe to explore
            <ArrowRight size={18} aria-hidden="true" />
          </p>
          <span
            className="text-sm tabular-nums text-muted-foreground"
            aria-hidden="true"
          >
            {activeGroup + 1} / {skillGroups.length}
          </span>
        </div>
        <div
          ref={carousel}
          id="skills-carousel"
          role="region"
          aria-label="Skill categories"
          aria-describedby="skills-carousel-hint"
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              event.target !== event.currentTarget ||
              window.matchMedia('(min-width: 768px)').matches
            )
              return;
            const target =
              event.key === 'ArrowRight'
                ? Math.min(activeGroup + 1, skillGroups.length - 1)
                : event.key === 'ArrowLeft'
                  ? Math.max(activeGroup - 1, 0)
                  : event.key === 'Home'
                    ? 0
                    : event.key === 'End'
                      ? skillGroups.length - 1
                      : null;
            if (target !== null) {
              event.preventDefault();
              goTo(target);
            }
          }}
          className="relative -mx-6 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overscroll-x-contain bg-background px-6 pb-4 [scroll-padding-inline:1.5rem] [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-scrollbar]:hidden sm:-mx-10 sm:px-10 sm:[scroll-padding-inline:2.5rem] md:mx-0 md:grid md:gap-5 md:overflow-visible md:bg-transparent md:px-0 md:pb-0 lg:gap-6"
        >
          {skillGroups.map((group) => (
            <SkillGroup
              key={group.id}
              title={group.name}
              description={group.description}
              skills={group.skills}
              icon={groupIcons[group.id]}
              wide={group.id === 'ai'}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 md:hidden">
          <div className="min-w-0 flex-1">
            <p
              aria-live="polite"
              aria-atomic="true"
              className="mb-2 text-sm font-medium text-foreground"
            >
              {skillGroups[activeGroup].name}
              <span className="sr-only">
                , category {activeGroup + 1} of {skillGroups.length}
              </span>
            </p>
            <div
              className="h-1 overflow-hidden rounded-full bg-secondary"
              aria-hidden="true"
            >
              <div
                className="h-full origin-left bg-primary transition-transform duration-200 motion-reduce:transition-none"
                style={{
                  transform: `scaleX(${(activeGroup + 1) / skillGroups.length})`,
                }}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous skill category"
              aria-controls="skills-carousel"
              disabled={activeGroup === 0}
              onClick={() => goTo(activeGroup - 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-30 disabled:hover:bg-secondary disabled:hover:text-foreground"
            >
              <ArrowLeft size={19} />
            </button>
            <button
              type="button"
              aria-label="Next skill category"
              aria-controls="skills-carousel"
              disabled={activeGroup === skillGroups.length - 1}
              onClick={() => goTo(activeGroup + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-30"
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
