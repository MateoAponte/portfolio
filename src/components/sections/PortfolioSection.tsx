import { useState } from 'react';
import { ExternalLink, Github, X, ChevronRight, AlertTriangle, CheckCircle, Zap, Layers } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <article
      onClick={onClick}
      className="glass-card-hover p-5 cursor-pointer group"
    >
      {/* Project visual */}
      <div className="aspect-[16/10] rounded-md bg-secondary/50 mb-5 overflow-hidden relative">
        <div className="w-full h-full bg-gradient-to-br from-primary/10 via-card to-accent/10 flex items-center justify-center">
          <span className="text-4xl font-bold gradient-text opacity-60">{project.title.charAt(0)}</span>
        </div>
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
        {project.shortDescription}
      </p>
      
      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.slice(0, 3).map((tech) => (
          <span key={tech} className="px-2 py-1 rounded text-xs font-medium bg-secondary/60 text-muted-foreground border border-border/30">
            {tech}
          </span>
        ))}
        {project.stack.length > 3 && (
          <span className="px-2 py-1 rounded text-xs font-medium bg-secondary/60 text-muted-foreground border border-border/30">
            +{project.stack.length - 3}
          </span>
        )}
      </div>
      
      {/* CTA */}
      <div className="flex items-center text-primary text-sm font-medium gap-1 group-hover:gap-2 transition-all">
        Ver decisiones técnicas
        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </article>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 animate-scale-in border-border/60">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        {/* Project header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {project.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        <div className="space-y-6">
          {/* Problem */}
          <div className="p-5 rounded-lg bg-secondary/30 border-l-2 border-l-destructive/40">
            <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
              <AlertTriangle size={16} className="text-destructive/70" />
              Problema
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.problem}</p>
          </div>

          {/* Solution */}
          <div className="p-5 rounded-lg bg-secondary/30 border-l-2 border-l-accent/40">
            <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
              <CheckCircle size={16} className="text-accent/80" />
              Solución Implementada
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.solution}</p>
          </div>

          {/* Impact */}
          <div className="p-5 rounded-lg bg-secondary/30 border-l-2 border-l-primary/40">
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <Zap size={16} className="text-primary/80" />
              Impacto Medible
            </h3>
            <ul className="space-y-2">
              {project.impact.map((item, index) => (
                <li key={index} className="text-muted-foreground text-sm flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Decisions */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <Layers size={16} className="text-primary/80" />
              Decisiones Técnicas Clave
            </h3>
            <div className="space-y-3">
              {project.technicalDecisions.map((decision, index) => (
                <div key={index} className="p-4 rounded-lg bg-secondary/20 border border-border/30">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div className="space-y-1.5">
                      <p className="text-foreground text-sm font-medium">{decision.decision}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-destructive/60">Alternativa descartada:</span> {decision.alternative}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="text-accent/70">Razón:</span> {decision.reasoning}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ownership */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3">Mi Rol y Ownership</h3>
            <ul className="space-y-2">
              {project.ownership.map((item, index) => (
                <li key={index} className="text-muted-foreground text-sm flex items-start gap-2">
                  <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Patterns & Stack */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Patrones Arquitectónicos</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.patterns.map((pattern) => (
                  <span key={pattern} className="px-2.5 py-1 rounded text-xs font-medium bg-primary/10 border border-primary/20 text-primary">
                    {pattern}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Stack Tecnológico</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded text-xs font-medium bg-secondary/60 text-muted-foreground border border-border/30">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-4 border-t border-border/30">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2.5"
              >
                <ExternalLink size={16} />
                Ver Proyecto
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary py-2.5"
              >
                <Github size={16} />
                Código
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="portafolio" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-section-portfolio)' }}
      />
      
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className={`section-badge ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            Portafolio
          </span>
          <h2 className={`mt-4 text-3xl md:text-4xl font-bold text-foreground ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            Decisiones Técnicas en Producción
          </h2>
          <p className={`mt-4 text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            Proyectos donde la arquitectura, trade-offs y criterio técnico fueron fundamentales para el éxito.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={isVisible ? `animate-fade-up stagger-${Math.min(index + 3, 6)}` : 'opacity-0'}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
