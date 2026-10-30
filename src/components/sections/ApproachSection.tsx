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

        {/* One row-major grid preserves reading order at every breakpoint. */}
        <div className={`grid md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10 max-w-5xl mx-auto ${isVisible ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
          {principles.map(principle => {
            const Icon = principle.icon;
            return (
              <div key={principle.title} className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-card border border-border flex items-center justify-center">
                  <Icon size={18} className="text-primary" aria-hidden="true" />
                </div>
                <div className="min-w-0 pt-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{principle.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{principle.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
