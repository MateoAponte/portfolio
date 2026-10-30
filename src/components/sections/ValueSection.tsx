import { BotanicalSectionTag } from '@/components/BotanicalSectionTag';
import { ContourWaves } from '@/components/BotanicalContours';
import { Target, Brain, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const values = [
  {
    icon: Target,
    title: 'Connected interfaces and services',
    description:
      'I work across frontend and backend to connect screens, APIs and the data behind each user flow.',
  },
  {
    icon: Brain,
    title: 'Decisions your team can follow',
    description:
      'I document system boundaries and technical choices so the team has context when requirements change.',
  },
  {
    icon: Users,
    title: 'A second pair of eyes',
    description:
      'I review code and user flows, share actionable feedback and help bring the pieces of an application together.',
  },
];

const ValueItem = ({ value }: { value: typeof values[number] }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, rootMargin: '0px 0px -24px 0px' });
  const Icon = value.icon;
  return (
    <div ref={ref} data-value-item className={`value-item transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:!translate-x-0 motion-reduce:!opacity-100 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
      <div className="value-hover flex items-start gap-4">
      <Icon size={24} className="text-primary mt-1 shrink-0" aria-hidden="true" />
      <div>
        <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed max-w-xl">{value.description}</p>
      </div>
      </div>
    </div>
  );
};

export const ValueSection = () => {
  return (
    <section id="value" className="py-20 md:py-28 relative overflow-hidden bg-secondary/20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-20 items-start">
          <div>
            <BotanicalSectionTag label="My Value" className="mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What I bring to a team</h2>
            <p className="mt-5 text-base lg:text-lg text-muted-foreground max-w-lg leading-relaxed">
              I contribute through implementation, technical documentation and reviews that help the team move work forward.
            </p>
          </div>
          <div className="space-y-8 md:space-y-10">
            {values.map(value => <ValueItem key={value.title} value={value} />)}
          </div>
        </div>
      </div>
      <ContourWaves className="-right-32 bottom-0 w-[600px] text-[#a5ad80]/25" />
    </section>
  );
};
