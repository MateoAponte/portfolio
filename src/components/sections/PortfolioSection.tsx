import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ProjectCard = ({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) => {
  return (
    <article
      onClick={onClick}
      className="glass-card-hover p-5 cursor-pointer group"
    >
      {/* Project visual */}
      <div className="aspect-[16/10] rounded-md bg-secondary/50 mb-5 overflow-hidden relative">
        <div className="w-full h-full bg-gradient-to-br from-primary/10 via-card to-accent/10 flex items-center justify-center">
          <span className="text-4xl font-bold gradient-text opacity-60">
            {project.title.charAt(0)}
          </span>
        </div>
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>

      <p className="text-muted-foreground lg:text-base text-sm mb-4 line-clamp-2 leading-relaxed">
        {project.shortDescription}
      </p>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 rounded text-xs font-medium bg-secondary/60 text-muted-foreground border border-border/80 hover:text-primary/80 hover:border-primary/20"
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 3 && (
          <span className="px-2 py-1 rounded text-xs font-medium bg-secondary/60 text-muted-foreground border border-border/80 hover:text-primary/80 hover:border-primary/20">
            +{project.stack.length - 3}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="flex items-center text-primary text-sm font-medium gap-1 group-hover:gap-2 transition-all">
        View technical decisions
        <ChevronRight
          size={14}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </div>
    </article>
  );
};

export const PortfolioSection = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const handleProjectClick = (projectId: string) => {
    window.scrollTo(0, 0);
    navigate(`/project/${projectId}`);
  };

  return (
    <>
      <section
        id="portfolio"
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
              Portfolio
            </span>
            <h2
              className={`mt-4 text-3xl md:text-4xl font-bold text-foreground ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}
            >
              Technical Decisions in Production
            </h2>
            <p
              className={`mt-4 lg:text-lg text-base text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}
            >
              Projects where architecture, trade-offs and technical judgment
              were key to success.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={
                  isVisible
                    ? `animate-fade-up stagger-${Math.min(index + 3, 6)}`
                    : 'opacity-0'
                }
              >
                <ProjectCard
                  project={project}
                  onClick={() => handleProjectClick(project.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[30%] w-1.5 h-1.5 rounded-full bg-primary/80 animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute top-[25%] right-[25%] w-1.5 h-1.5 rounded-full bg-primary/60 animate-[float_10s_ease-in-out_infinite_1s]" />
          <div className="absolute top-[45%] left-[5%] w-1 h-1 rounded-full bg-primary/50 animate-[float_12s_ease-in-out_infinite_2s]" />
          <div className="absolute top-[60%] right-[2%] w-0.5 h-0.5 rounded-full bg-primary/80 animate-[float_9s_ease-in-out_infinite_0.5s]" />
          <div className="absolute top-[80%] right-[10%] w-1 h-1 rounded-full bg-primary/50 animate-[float_13s_ease-in-out_infinite_2.5s]" />
          <div className="absolute top-[80%] left-[12%] w-0.5 h-0.5 rounded-full bg-primary/80 animate-[float_9s_ease-in-out_infinite_4s]" />
        </div>
      </section>
    </>
  );
};
