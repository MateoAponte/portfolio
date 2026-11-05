import { BotanicalSectionTag } from '@/components/BotanicalSectionTag';
import { ContourWaves } from '@/components/BotanicalContours';
import { Target, Brain, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const values = [
  {
    icon: Target,
    title: 'A shared entry point for CPaaS',
    description:
      'I built the login and home microfrontends, with a shared dashboard layout and configurable widgets for different products.',
    project: 'CPaaS',
    href: '/project/cpaas',
  },
  {
    icon: Brain,
    title: 'Backend and AI working together',
    description:
      'For EcoGiro, I defined system boundaries, developed the backend and integrated Gemini into the hackathon prototype.',
    project: 'EcoGiro',
    href: '/project/ecogiro',
  },
  {
    icon: ShieldCheck,
    title: 'Tests the team can build on',
    description:
      'I set up Vitest and Playwright tests for CPaaS, with reusable fixtures and testing guidelines for the team.',
    project: 'CPaaS',
    href: '/project/cpaas',
  },
];

const ValueItem = ({ value }: { value: typeof values[number] }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, rootMargin: '0px 0px -24px 0px' });
  const Icon = value.icon;
  return (
    <div ref={ref} tabIndex={0} data-value-item className={`value-item transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:!translate-x-0 motion-reduce:!opacity-100 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
      <div className="value-hover flex items-start gap-4">
      <Icon size={24} className="text-primary mt-1 shrink-0" aria-hidden="true" />
      <div>
        <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed max-w-xl">{value.description}</p>
        <Link to={value.href} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Explore {value.project}<ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      </div>
    </div>
  );
};

export const ValueSection = () => {
  return (
    <section id="value" className="py-12 md:py-28 relative overflow-hidden bg-secondary/20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-20 items-start">
          <div>
            <BotanicalSectionTag label="My Value" className="mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What I’ve put into practice</h2>
            <p className="mt-5 text-base lg:text-lg text-muted-foreground max-w-lg leading-relaxed">
              My contributions span interfaces, backend integration and testing. Here’s where you can see that work.
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
