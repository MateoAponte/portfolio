import { BranchDecoration, VineDecoration, TwigDecoration } from '@/components/ProjectPlantDecorations';
import { BotanicalSectionTag } from '@/components/BotanicalSectionTag';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { TechIcon } from '@/components/TechIcon';
import { CornerRipples, LeafScatter } from '@/components/BotanicalContours';

const linkStyle =
  'project-card relative isolate group block rounded-2xl border border-transparent bg-[#182722] text-[#f0f3eb] transition-colors duration-150 active:bg-[#253b30] focus-visible:bg-[#20332b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9cba3] motion-reduce:transition-none';

const ProjectMedia = ({ project }: { project: Project }) => {
  const src = project.appShowcase ?? project.thumbnail ??
    (project.image !== '/placeholder.svg' ? project.image : undefined);
  if (!src)
    return (
      <figure aria-label="Analytics architecture overview" className="relative z-10 flex h-full flex-col justify-center gap-4 p-6 sm:p-8">
        <figcaption className="text-sm font-medium text-[#b9cba3]">Architecture overview</figcaption>
        <ol className="flex flex-col items-center text-center text-sm text-[#e5eddf]">
          {['Event ingestion', 'ClickHouse analytics', 'WebSocket updates', 'Virtualized interface'].map((stage, index) => (
            <li key={stage} className="flex w-full flex-col items-center">
              {index > 0 && <ArrowDown size={18} className="my-1 text-[#809b86]" aria-hidden="true" />}
              <span className="w-full max-w-56 rounded-lg bg-[#213c2d] px-4 py-2">{stage}</span>
            </li>
          ))}
        </ol>
      </figure>
    );
  return (
    <img
      src={src}
      alt={
        project.id === 'ecogiro'
          ? 'EcoGiro recycling app shown on three mobile screens'
          : project.id === 'cpaas'
            ? 'CPaaS shared login and dashboard shown on two laptops'
            : project.title + ' interface'
      }
      loading="lazy"
      decoding="async"
      className="project-image relative z-10 h-full w-full object-contain p-2"
    />
  );
};

const ProjectPlants = () => (
  <div aria-hidden="true" className="project-plants pointer-events-none absolute inset-0 z-0 overflow-hidden text-[#b9cba3]">
    <TwigDecoration className="absolute bottom-0 right-0 w-[30%] max-w-36" />
    <VineDecoration className="absolute left-1/2 top-0 w-[42%] max-w-72 -translate-x-1/2" />
    <BranchDecoration className="absolute left-0 top-0 w-[35%] max-w-44" />
  </div>
);

const ProjectCopy = ({ project }: { project: Project }) => (
  <div className="relative z-10 flex min-w-0 flex-col justify-center p-5 sm:p-9 lg:p-12">
    <h3 className="text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug tracking-tight [text-wrap:balance] group-hover:text-[var(--nature-link-hover)]">
      {project.title}
    </h3>
    <p className="mt-3 max-w-lg text-base leading-relaxed text-[#c1cdc5] [text-wrap:pretty]">
      {project.shortDescription}
    </p>
    <ul
      aria-label={project.title + ' technologies'}
      className="mt-4 flex flex-wrap gap-1.5 text-xs text-[var(--nature-link)]"
    >
      {project.stack.slice(0, 3).map((tech) => (
        <li
          key={tech}
          className="inline-flex items-center gap-1.5 rounded-md bg-[#24352e] px-2 py-1.5"
        >
          <TechIcon tech={tech} />
          {tech}
        </li>
      ))}
      {project.stack.length > 3 && (
        <li
          className="inline-flex items-center rounded-md bg-[#24352e] px-2 py-1.5"
          aria-label={String(project.stack.length - 3) + ' more technologies'}
        >
          +{project.stack.length - 3}
        </li>
      )}
    </ul>
    <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-[var(--nature-active)] underline-offset-4 group-hover:underline group-focus-visible:underline">
      Explore project
      <ArrowRight size={18} aria-hidden="true" />
    </span>
  </div>
);

const ProjectEntry = ({ project, index }: { project: Project; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15, rootMargin: '0px 0px -32px 0px' });
  return (
    <div ref={ref} className={`w-full md:w-[94%] lg:w-[90%] ${index % 2 ? 'self-end' : 'self-start'}`}>
      <article data-project={project.id} className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:!translate-x-0 motion-reduce:!opacity-100 focus-within:!translate-x-0 focus-within:!opacity-100 ${isVisible ? 'translate-x-0 opacity-100' : index % 2 ? 'translate-x-12 opacity-0' : '-translate-x-12 opacity-0'}`}>
        <Link to={'/project/' + project.id} onClick={() => window.scrollTo(0, 0)} className={linkStyle + ' grid grid-cols-1 overflow-hidden md:min-h-[48vh] md:grid-cols-[1fr_1.2fr]'}>
          <div className="relative min-w-0 h-[clamp(20rem,65vw,24rem)] md:h-auto overflow-hidden bg-[radial-gradient(ellipse_at_50%_48%,#2b4935_0%,#203c2c_30%,#172b22_65%,#112119_100%)]"><ProjectMedia project={project} /></div>
          <ProjectCopy project={project} />
          <ProjectPlants />
        </Link>
      </article>
    </div>
  );
};

export const PortfolioSection = () => (
  <section id="portfolio" aria-labelledby="portfolio-heading" className="relative isolate overflow-hidden bg-[#101c19] py-20 text-[#f0f3eb] md:py-28">
    <CornerRipples className="left-0 top-0 -z-10 w-64 text-[#a5ad80]/30" />
    <LeafScatter className="-right-12 bottom-0 -z-10 w-64 text-[#a5ad80]/35" />
    <div className="container mx-auto px-6 sm:px-10 xl:px-12">
      <BotanicalSectionTag label="Portfolio" className="mb-6" />
      <div className="mb-12 flex flex-col gap-5 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <h2 id="portfolio-heading" className="text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl [text-wrap:balance]">Selected projects</h2>
        <p className="max-w-md text-base leading-relaxed text-[#c1cdc5] sm:text-lg [text-wrap:pretty]">What I built, the decisions I made and where I contributed to each project.</p>
      </div>
      <div className="flex flex-col gap-12 md:gap-20">
        {projects.map((project, index) => <ProjectEntry key={project.id} project={project} index={index} />)}
      </div>
    </div>
  </section>
);
