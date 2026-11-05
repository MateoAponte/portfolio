import { Layers, Monitor, Server, Database, Cloud, ShieldCheck, Bot, type LucideIcon } from 'lucide-react';
import { TechIcon } from '@/components/TechIcon';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { skillGroups } from '@/data/skills';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const groupIcons: Record<string, LucideIcon> = {
  architecture: Layers,
  frontend: Monitor,
  backend: Server,
  data: Database,
  infra: Cloud,
  quality: ShieldCheck,
  ai: Bot,
};

export const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative isolate overflow-hidden pb-12 pt-20 md:py-28">
      <div ref={ref} className={`container mx-auto px-6 transition-[opacity,transform] duration-700 ease-out motion-reduce:!translate-x-0 motion-reduce:!opacity-100 motion-reduce:transition-none sm:px-10 xl:px-12 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
        <h2 id="skills-heading" className="mb-4 text-3xl font-bold leading-tight text-foreground md:text-4xl">My development toolkit</h2>
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground">I adapt to your stack and propose the technologies needed to build reliable, scalable software that feels intuitive to use.</p>
        <Tabs defaultValue="frontend" orientation="horizontal" className="grid min-w-0 items-start gap-4">
          <TabsList aria-label="Skill categories" className="flex h-auto w-full justify-start gap-1 overflow-x-auto rounded-none bg-transparent p-1">
            {skillGroups.map(group => {
              const Icon = groupIcons[group.id];
              return (
                <TabsTrigger key={group.id} value={group.id} aria-label={group.name} title={group.name} className="flex h-11 min-w-11 flex-1 shrink-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-none md:flex-none md:px-4">
                  <Icon size={20} strokeWidth={1.7} className="shrink-0" aria-hidden="true" />
                  <span className="hidden md:inline">{group.id === 'data' ? 'Data' : group.id === 'ai' ? 'AI' : group.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {skillGroups.map(group => (
            <TabsContent key={group.id} value={group.id} className="skill-panel m-0 min-h-[14rem] min-w-0 rounded-2xl bg-[#17271f]/80 p-6 sm:p-8 md:bg-[#17271f]">
              <h3 className="text-2xl font-semibold leading-tight text-foreground">{group.name}</h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{group.description}</p>
              <ul aria-label={`${group.name} technologies`} className="mt-7 flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <li key={skill} className="skill-chip inline-flex min-h-10 max-w-full items-center gap-2 rounded-md border border-transparent bg-[#23372d] px-3 py-2 text-sm font-medium leading-snug text-[#c7ded2] [&>svg]:h-4 [&>svg]:w-4 [&>span[aria-hidden]]:h-4 [&>span[aria-hidden]]:w-4">
                    <TechIcon tech={skill} />
                    <span className="min-w-0 [overflow-wrap:anywhere]">{skill}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
