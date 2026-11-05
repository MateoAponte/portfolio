import { BotanicalAtmosphere } from '@/components/BotanicalAtmosphere';
import { BotanicalSectionTag } from '@/components/BotanicalSectionTag';
import { BranchHero } from '@/components/BotanicalContours';
import { useEffect, useState, type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ExternalLink, Github, Monitor, ChevronRight, TriangleAlert, Settings2, Lightbulb } from 'lucide-react';
import { projects } from '@/data/projects';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArchitectureGallery } from '@/components/ArchitectureGallery';
import { TechIcon } from '@/components/TechIcon';
import { ProjectScreenshots } from '@/components/ProjectScreenshots';
import { ProjectProcess } from '@/components/ProjectProcess';

const sections = [
  { id: 'problem', label: 'The Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'my-role', label: 'My Role' },
  { id: 'key-decisions', label: 'Key Tech Decisions' },
  { id: 'process', label: 'Process' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'impact', label: 'Impact' },
  { id: 'challenges', label: 'Challenges & Learnings' },
  { id: 'tech-stack', label: 'Tech Stack & Patterns' },
];

const CaseSection = ({ id, children }: { id: string; children: ReactNode }) => {
  const index = sections.findIndex(section => section.id === id);
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-10 sm:py-14">
      <h2 id={`${id}-title`} className="mb-7"><BotanicalSectionTag label={sections[index].label} /></h2>
      {children}
    </section>
  );
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find(item => item.id === projectId);
  const [activeSection, setActiveSection] = useState('problem');

  useEffect(() => {
    setActiveSection('problem');
    const updateSection = () => {
      // Short final sections may never reach the header's activation line.
      // Follow the reading area instead, and select the last section at page end.
      const readingLine = Math.max(160, window.innerHeight * 0.4);
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const current = sections.filter(section => {
        const element = document.getElementById(section.id);
        return element && element.getBoundingClientRect().top <= readingLine;
      }).at(-1);
      const lastSection = sections.filter(section => document.getElementById(section.id)).at(-1);
      setActiveSection(atPageEnd ? lastSection?.id ?? 'problem' : current?.id ?? 'problem');
    };
    updateSection();
    window.addEventListener('scroll', updateSection, { passive: true });
    window.addEventListener('resize', updateSection);
    const observer = new ResizeObserver(updateSection);
    observer.observe(document.body);
    return () => {
      window.removeEventListener('scroll', updateSection);
      window.removeEventListener('resize', updateSection);
      observer.disconnect();
    };
  }, [projectId]);

  if (!project) {
    return (
      <div className="nature-main project-detail min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project not found</h1>
          <Link to="/#portfolio" className="btn-primary"><ArrowLeft size={16} />Back to Portfolio</Link>
        </div>
      </div>
    );
  }

  const visibleSections = sections.filter(section =>
    (section.id !== 'challenges' || project.challenges?.length) &&
    (section.id !== 'tech-stack' || project.stack.length || project.patterns.length)
  );

  return (
    <div className="nature-main project-detail min-h-screen bg-background text-foreground">
      <Header key={project.id} projectLinks={visibleSections.map(section => ({ href: `#${section.id}`, label: section.label }))} activeSection={activeSection} />
      <main className="relative isolate pb-16 pt-24">
        <BotanicalAtmosphere key={project.id} />
        <div className="container relative z-20 mx-auto px-6 sm:px-10 xl:px-12">
          <Link to="/#portfolio" className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />Back to Portfolio
          </Link>

          <section aria-labelledby="project-title" className="relative isolate grid items-center gap-10 py-12 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-2 lg:gap-14 lg:py-16">
            <BranchHero className="-left-40 top-0 -z-10 h-[500px] w-[440px] text-[#a5ad80]/20" />
            <div className="relative min-w-0">
              <BotanicalSectionTag label={project.presentation === 'platform' ? 'Platform' : 'Case Study'} className="mb-6" />
              <h1 id="project-title" className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl xl:text-6xl">{project.title}</h1>
              <p className="mt-4 text-lg font-medium leading-relaxed text-[#d3dfc5] sm:text-xl">{project.shortDescription}</p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{project.fullDescription}</p>
              <div className="mt-8 flex flex-wrap gap-3 [&>a]:focus-visible:outline [&>a]:focus-visible:outline-2 [&>a]:focus-visible:outline-offset-4 [&>a]:focus-visible:outline-ring">
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Live Project<ExternalLink size={15} /></a>
                ) : (
                  <button disabled className="btn-primary cursor-not-allowed opacity-40" title="Live project URL is not available">Live Project<ExternalLink size={15} /></button>
                )}
                {!project.hideSource && (project.repoUrl ? (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">View Source<Github size={15} /></a>
                ) : (
                  <button disabled className="btn-secondary cursor-not-allowed opacity-40" title="Source repository URL is not available">View Source<Github size={15} /></button>
                ))}
                <a href="#problem" className="btn-secondary border-primary/40">{project.presentation === 'platform' ? 'Explore Project' : 'Explore Case Study'}<ArrowDown size={15} /></a>
              </div>
            </div>
            {(project.appShowcase || project.thumbnail) ? (
              <figure className="relative min-w-0 rounded-2xl bg-[radial-gradient(ellipse_at_50%_48%,#2b4935_0%,#203c2c_30%,#172b22_65%,#112119_100%)] p-4 sm:p-6">
                <img src={project.appShowcase ?? project.thumbnail} alt={project.appShowcase ? `${project.title} app: rewards, home and recovery management screens` : `${project.title} shared login and dashboard shown on two laptops`} fetchPriority="high" className="h-auto w-full object-contain" />
              </figure>
            ) : project.image === '/placeholder.svg' ? (
              <figure className="rounded-2xl bg-[#17271f] p-6 sm:p-10">
                <figcaption className="mb-6 text-base font-medium text-[#b9cba3]">Architecture overview</figcaption>
                <ol className="space-y-3 text-base text-foreground">
                  {['Event ingestion', 'ClickHouse analytics', 'WebSocket updates', 'Virtualized interface'].map(stage => <li key={stage} className="rounded-lg bg-[#23372d] px-5 py-4">{stage}</li>)}
                </ol>
              </figure>
            ) : <figure className="glass-card relative min-w-0 overflow-hidden shadow-xl">
              <div className="flex items-center gap-3 border-b border-border/60 bg-secondary/30 px-4 py-3">
                <div className="flex gap-1.5" aria-hidden="true"><span className="h-2 w-2 rounded-full bg-primary" /><span className="h-2 w-2 rounded-full bg-primary/50" /><span className="h-2 w-2 rounded-full bg-muted-foreground/40" /></div>
                <figcaption className="min-w-0 flex-1 truncate text-center text-xs text-muted-foreground">{project.title} / Project preview</figcaption>
                <Monitor size={15} className="shrink-0 text-primary" aria-hidden="true" />
              </div>
              <div className="aspect-[4/3] bg-secondary/20 sm:aspect-[16/11]">
                <img src={project.image} alt={project.image === '/placeholder.svg' ? `Preview placeholder for ${project.title}` : `${project.title} project preview`} className="h-full w-full object-contain" />
              </div>
            </figure>}
          </section>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_260px] xl:gap-20">
            <aside className="lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1">
              <nav aria-label={project.presentation === 'platform' ? 'Project sections' : 'Case study sections'} className="glass-card p-5 lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto lg:p-6">
                <p className="mb-5 text-sm font-semibold text-muted-foreground">On this page</p>
                <ol className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
                  {visibleSections.map((section, index) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} aria-current={activeSection === section.id ? 'location' : undefined} className={`flex items-baseline gap-3 rounded-md border-l-2 px-3 py-2.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${activeSection === section.id ? 'border-primary bg-primary/10 text-primary' : 'border-transparent text-muted-foreground hover:bg-secondary/40 hover:text-foreground'}`}>
                        <span className="text-xs opacity-60" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{section.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
              <CaseSection id="problem"><p className="text-base leading-8 text-muted-foreground sm:text-lg">{project.problem}</p></CaseSection>
              <CaseSection id="solution">
                <p className="text-base leading-8 text-muted-foreground sm:text-lg">{project.solution}</p>
              </CaseSection>
              <CaseSection id="my-role">
                <ul className="space-y-4">{project.ownership.map(item => <li key={item} className="flex items-start gap-3 text-muted-foreground"><ChevronRight size={17} className="mt-1 shrink-0 text-primary" /><span className="leading-relaxed">{item}</span></li>)}</ul>
              </CaseSection>
              <CaseSection id="key-decisions">
                <p className="mb-6 text-sm text-muted-foreground">Technical choices I owned and the reasoning behind each decision.</p>
                <ol className="space-y-4">{project.technicalDecisions.map((decision, index) => (
                  <li key={decision.decision} tabIndex={0} className="glass-card detail-border-feedback grid grid-cols-[1.5rem_minmax(0,1fr)] gap-4 border-primary/20 bg-gradient-to-br from-primary/[0.035] to-transparent p-5 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-6 sm:p-7">
                    <div className="flex flex-col items-center" aria-hidden="true">
                      <span className="text-lg font-semibold leading-7 text-primary">{String(index + 1).padStart(2, '0')}</span>
                      <div className="relative mt-2 w-px min-h-14 flex-1 bg-gradient-to-b from-primary/70 via-primary/30 to-transparent">
                        <span className="absolute -left-px top-0 h-[3px] w-[3px] rounded-full bg-primary" />
                        <span className="absolute -left-[2.5px] top-8 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.35)]" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-2 text-base font-bold leading-7 text-foreground sm:text-lg">{decision.decision}</h3>
                      <dl className="space-y-3 text-sm leading-relaxed">
                        <div><dt className="font-semibold text-primary">Why I chose this</dt><dd className="mt-1 text-muted-foreground">{decision.reasoning}</dd></div>
                        {decision.alternative && <div><dt className="font-medium text-foreground">Alternative considered</dt><dd className="mt-1 text-muted-foreground">{decision.alternative}</dd></div>}
                      </dl>
                    </div>
                  </li>
                ))}</ol>
              </CaseSection>
              <CaseSection id="process">
                <ProjectProcess steps={project.process} />
                {project.screenshots && <ProjectScreenshots screenshots={project.screenshots} name={project.title} format={project.screenshotFormat} />}
              </CaseSection>
              <CaseSection id="architecture">
                <p className="text-base leading-8 text-muted-foreground sm:text-lg">{project.architecture}</p>
                {project.architectureDiagrams && <ArchitectureGallery diagrams={project.architectureDiagrams} />}
              </CaseSection>
              <CaseSection id="impact">
                {project.impactContext && <p className="mb-6 text-base leading-8 text-muted-foreground">{project.impactContext}</p>}
                {!!project.researchInsights?.length && (
                  <div className="mb-8">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">Key Research Insights</h3>
                    <ul className="space-y-4">{project.researchInsights.map(insight => (
                      <li key={insight.finding} tabIndex={0} className="glass-card detail-border-feedback border-primary/20 p-5 sm:p-6">
                        <h4 className="font-semibold text-foreground">{insight.finding}</h4>
                        {insight.quote && <blockquote className="mt-3 border-l-2 border-primary/50 pl-4 text-sm italic leading-relaxed text-muted-foreground">{insight.quote}</blockquote>}
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground"><span className="font-medium text-primary">Design response: </span>{insight.designResponse}</p>
                      </li>
                    ))}</ul>
                  </div>
                )}
                <ul className="grid gap-4 sm:grid-cols-2">{project.impact.map(item => <li key={item} tabIndex={0} className="glass-card detail-border-feedback border-t-2 border-t-primary/60 p-6 text-base font-medium leading-relaxed text-foreground">{item}</li>)}</ul>
              </CaseSection>
              {!!project.challenges?.length && <CaseSection id="challenges">
                <div className="space-y-8">{project.challenges.map((item, index) => (
                  <article key={item.title} tabIndex={0} className="glass-card detail-border-feedback border-primary/20 bg-gradient-to-br from-primary/[0.035] to-transparent p-5 sm:p-7">
                    <div className="mb-6 flex items-start gap-4">
                      <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">{String(index + 1).padStart(2, '0')}</span>
                      <h3 className="max-w-xl pt-0.5 text-base font-bold leading-snug text-foreground sm:text-lg">{item.title}</h3>
                    </div>
                    <dl className="relative ml-4 space-y-5 border-l border-primary/25 py-1 pl-5 sm:pl-6">
                      {[
                        { label: 'Challenge', text: item.challenge, icon: TriangleAlert },
                        { label: 'Approach', text: item.approach, icon: Settings2 },
                        { label: 'Learning', text: item.learning, icon: Lightbulb },
                      ].map(({ label, text, icon: Icon }) => (
                        <div key={label} className="relative grid grid-cols-[1.75rem_minmax(0,1fr)] items-start gap-x-3 gap-y-1 sm:grid-cols-[2rem_5rem_minmax(0,1fr)] sm:gap-x-4">
                          <span aria-hidden="true" className="absolute -left-[23.5px] top-3 h-1.5 w-1.5 rounded-full bg-primary sm:-left-[27.5px]" />
                          <span aria-hidden="true" className="row-span-2 flex h-7 w-7 items-center justify-center rounded-lg border border-primary/10 bg-primary/[0.065] text-primary sm:row-span-1 sm:h-8 sm:w-8"><Icon size={16} strokeWidth={1.7} /></span>
                          <dt className="pt-1 text-xs font-semibold text-primary sm:pt-1.5">{label}</dt>
                          <dd className="col-start-2 text-sm leading-relaxed text-muted-foreground sm:col-start-auto sm:pt-1">{text}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                ))}</div>
              </CaseSection>}
              {!!(project.stack.length || project.patterns.length) && <CaseSection id="tech-stack">
                <div className="space-y-6"><div><h3 className="mb-3 text-sm font-semibold text-foreground">Tech Stack</h3><ul className="flex flex-wrap gap-2">{project.stack.map(tech => <li key={tech} tabIndex={0} className="skill-chip inline-flex min-h-10 items-center gap-2.5 rounded-md border border-transparent bg-[#23372d] px-3 py-2 text-sm text-[#c7ded2]"><TechIcon tech={tech} />{tech}</li>)}</ul></div><div><h3 className="mb-3 text-sm font-semibold text-foreground">Patterns</h3><ul className="flex flex-wrap gap-2">{project.patterns.map(pattern => <li key={pattern} tabIndex={0} className="skill-chip inline-flex min-h-10 items-center rounded-md border border-transparent bg-[#23372d] px-3 py-2 text-sm text-[#c7ded2]">{pattern}</li>)}</ul></div></div>
              </CaseSection>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
