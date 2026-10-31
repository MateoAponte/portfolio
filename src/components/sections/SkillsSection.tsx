import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Layers, Monitor, Server, Database, Cloud, ShieldCheck, Bot, type LucideIcon } from 'lucide-react';
import { TechIcon } from '@/components/TechIcon';
import { BotanicalSectionTag } from '@/components/BotanicalSectionTag';
import { ContourWaves } from '@/components/BotanicalContours';
import { skillGroups } from '@/data/skills';

const groupIcons: Record<string, LucideIcon> = {
  architecture: Layers, frontend: Monitor, backend: Server, data: Database,
  infra: Cloud, quality: ShieldCheck, ai: Bot,
};

interface SkillGroupProps {
  title: string;
  description: string;
  skills: string[];
  icon: LucideIcon;
  wide?: boolean;
}

const SkillGroup = ({ title, description, skills, icon: Icon, wide = false }: SkillGroupProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15, rootMargin: '0px 0px -24px 0px' });
  return (
  <div ref={ref} data-skill-reveal className={`min-w-0 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:!translate-y-0 motion-reduce:!opacity-100 ${wide ? 'md:col-span-2' : ''} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
  <article className="skill-panel h-full min-w-0 rounded-2xl border border-border/50 bg-[#17271f] p-6 sm:p-8">
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#23392e] text-[#a4d9c6]">
        <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-xl min-[360px]:text-2xl font-semibold leading-tight text-[#f0f3eb] [text-wrap:balance]">{title}</h3>
        <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-[#bccdc3] [text-wrap:pretty]">{description}</p>
      </div>
    </div>
    <ul aria-label={title} className="mt-7 flex flex-wrap gap-2">
      {skills.map(skill => (
        <li key={skill} className="skill-chip inline-flex min-h-10 max-w-full items-center gap-2 rounded-md border border-transparent bg-[#23372d] px-3 py-2 text-sm font-medium leading-snug text-[#c7ded2] [&>svg]:h-4 [&>svg]:w-4 [&>span[aria-hidden]]:h-4 [&>span[aria-hidden]]:w-4">
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
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative isolate overflow-hidden py-20 md:py-28">
      <ContourWaves className="-right-20 bottom-0 -z-10 w-[700px] text-[#b69b5e]/20" />
      <div className="container mx-auto px-6 sm:px-10 xl:px-12">
        <BotanicalSectionTag label="Skills" className="mb-6" />
        <h2 id="skills-heading" className="mb-4 text-3xl font-bold leading-tight text-foreground md:text-4xl">My development toolkit</h2>
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground">I adapt to your stack and propose the technologies needed to build reliable, scalable software that feels intuitive to use.</p>
        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:gap-6">
          {skillGroups.map(group => (
            <SkillGroup key={group.id} title={group.name} description={group.description} skills={group.skills} icon={groupIcons[group.id]} wide={group.id === 'ai'} />
          ))}
        </div>
      </div>
    </section>
  );
};
