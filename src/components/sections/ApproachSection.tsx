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
      'I invest time understanding the problem and designing the solution before writing the first line. The cheapest code to maintain is code that was never written.',
  },
  {
    icon: GitBranch,
    title: 'Decisions with explicit trade-offs',
    description:
      'Every architectural decision documents alternatives considered and reasons for rejection. Facilitates future reviews and onboarding.',
  },
  {
    icon: Shield,
    title: 'Maintainability over cleverness',
    description:
      'I prioritize code that any team developer can understand and modify. Accidental complexity is hidden technical debt.',
  },
  {
    icon: BookOpen,
    title: 'Documentation as product',
    description:
      'ADRs, architecture diagrams and contribution guides are part of the deliverable. A system without documentation is a system with an expiration date.',
  },
  {
    icon: FileCode,
    title: 'DX as a multiplier',
    description:
      'I invest in tooling, linting and automation. A team with good DX delivers faster with less friction.',
  },
  {
    icon: Users,
    title: 'Collaboration with product & design',
    description:
      'I actively participate in product definition. Understanding the "why" allows proposing technical solutions that enable better user experience.',
  },
];

export const ApproachSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="approach"
      className="py-24 md:py-32 relative overflow-hidden section-separator"
    >
      {/* Ambient background glow */}
      <div className="ambient-glow ambient-glow-right" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span
            className={`section-badge ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            Approach
          </span>
          <h2
            className={`mt-4 text-3xl md:text-4xl font-bold text-foreground ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}
          >
            How I Make Technical Decisions
          </h2>
          <p
            className={`mt-4 lg:text-lg text-base text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}
          >
            Principles that guide my work and define how I approach complex
            problems.
          </p>
        </div>

        {/* Principles with stepper/timeline design - staggered columns */}
        <div
          className={`max-w-4xl w-full min-w-full ${isVisible ? 'animate-fade-up stagger-3' : 'opacity-0'}`}
        >
          <div className="grid md:grid-cols-2 lg:gap-x-24 gap-x-12 gap-y-0">
            {/* Left column */}
            <div className="relative">
              {/* Vertical line for left column */}
              <div className="hidden lg:h-5/6 md:block absolute right-0 top-0 w-px h-full bg-gradient-to-b from-border/50 via-border to-border/50" />

              {principles
                .filter((_, i) => i % 2 === 0)
                .map((principle, idx) => {
                  const Icon = principle.icon;
                  const originalIndex = idx * 2;
                  const isLast =
                    idx === principles.filter((_, i) => i % 2 === 0).length - 1;

                  return (
                    <div
                      key={principle.title}
                      className="relative py-6 md:pr-8"
                    >
                      {/* Horizontal connector dot */}
                      <div className="hidden md:block absolute top-8 -right-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />

                      {/* Mobile vertical line */}
                      {!isLast && (
                        <div className="md:hidden absolute left-5 top-12 w-px h-[calc(100%-1.5rem)] bg-gradient-to-b from-border via-border to-border/50" />
                      )}

                      {/* Content */}
                      <div className="flex items-start gap-4 md:gap-3">
                        <div className="relative shrink-0 z-10">
                          <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
                            <Icon size={18} className="text-primary" />
                          </div>
                          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                            {originalIndex + 1}
                          </span>
                        </div>

                        <div className="flex-1 pt-1">
                          <h3 className="lg:text-lg text-md font-semibold text-foreground mb-1.5">
                            {principle.title}
                          </h3>
                          <p className="text-muted-foreground lg:text-base text-sm leading-relaxed">
                            {principle.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Right column - offset down */}
            <div className="relative lg:mt-24 mt-20">
              {/* Vertical line for right column */}
              <div className="hidden md:block absolute left-0 top-0 w-px h-full bg-gradient-to-b from-border/50 via-border to-border/50" />
              {principles
                .filter((_, i) => i % 2 === 1)
                .map((principle, idx) => {
                  const Icon = principle.icon;
                  const originalIndex = idx * 2 + 1;
                  const isLast =
                    idx === principles.filter((_, i) => i % 2 === 1).length - 1;

                  return (
                    <div
                      key={principle.title}
                      className="relative py-6 md:pl-8"
                    >
                      {/* Horizontal connector dot */}
                      <div className="hidden md:block absolute top-8 -left-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />

                      {/* Mobile vertical line */}
                      {!isLast && (
                        <div className="md:hidden absolute left-5 top-12 w-px h-[calc(100%-1.5rem)] bg-gradient-to-b from-border via-border to-border/50" />
                      )}

                      {/* Content */}
                      <div className="flex items-start gap-4 md:gap-3">
                        <div className="relative shrink-0 z-10">
                          <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
                            <Icon size={18} className="text-primary" />
                          </div>
                          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                            {originalIndex + 1}
                          </span>
                        </div>

                        <div className="flex-1 pt-1">
                          <h3 className="lg:text-lg text-md font-semibold text-foreground mb-1.5">
                            {principle.title}
                          </h3>
                          <p className="text-muted-foreground lg:text-base text-sm leading-relaxed">
                            {principle.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-1.5 h-1.5 rounded-full bg-primary/80 animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute top-[25%] right-[20%] w-1.5 h-1.5 rounded-full bg-primary/60 animate-[float_10s_ease-in-out_infinite_2s]" />
        <div className="absolute top-[15%] right-[8%] w-1 h-1 rounded-full bg-primary/40 animate-[float_10s_ease-in-out_infinite_1.5s]" />
        <div className="absolute top-[50%] left-[8%] w-1 h-1 rounded-full bg-primary/70 animate-[float_10s_ease-in-out_infinite_3s]" />
        <div className="absolute top-[80%] right-[8%] w-2 h-2 rounded-full bg-primary/80 animate-[float_10s_ease-in-out_infinite]" />
        <div className="absolute top-[93%] right-[15%] w-1 h-1 rounded-full bg-primary/40 animate-[float_10s_ease-in-out_infinite_1.5s]" />
        <div className="absolute top-[80%] left-[25%] w-1 h-1 rounded-full bg-primary/50 animate-[float_10s_ease-in-out_infinite_2.5s]" />
        <div className="absolute top-[20%] left-[35%] w-1.5 h-1.5 rounded-full bg-primary/80 animate-[float_10s_ease-in-out_infinite_3s]" />
      </div>
    </section>
  );
};
