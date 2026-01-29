import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, ChevronRight, AlertTriangle, CheckCircle, Layers, Code } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface ProjectImage {
  src: string;
  caption: string;
}

const ProjectGallery = ({ images }: { images: ProjectImage[] }) => {
  if (images.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Code size={18} className="text-primary" />
        Project Gallery
      </h3>
      <div className="space-y-6">
        {images.map((image, index) => (
          <figure key={index} className="glass-card overflow-hidden">
            <div className="aspect-video bg-secondary/50">
              <img 
                src={image.src} 
                alt={image.caption}
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="px-4 py-3 text-sm text-muted-foreground border-t border-border/40">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project not found</h1>
          <Link to="/#portfolio" className="btn-primary">
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Placeholder images - these would come from project data in a real scenario
  const projectImages: ProjectImage[] = [
    { src: '/placeholder.svg', caption: 'System architecture overview showing microservices communication patterns' },
    { src: '/placeholder.svg', caption: 'Dashboard interface with real-time metrics visualization' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Back navigation */}
          <button
            onClick={() => navigate('/#portfolio')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>
          
          {/* Project header */}
          <div className="mb-12">
            <span className="section-badge mb-4">Case Study</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column - Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Problem */}
              <article className="glass-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-destructive/70" />
                  The Problem
                </h2>
                <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
              </article>

              {/* Solution */}
              <article className="glass-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle size={18} className="text-primary" />
                  Solution Implemented
                </h2>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </article>

              {/* Technical Decisions with stepper */}
              <article className="glass-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Layers size={18} className="text-primary" />
                  Key Technical Decisions
                </h2>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
                  
                  <div className="space-y-6">
                    {project.technicalDecisions.map((decision, index) => (
                      <div key={index} className="relative pl-10">
                        {/* Step indicator */}
                        <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        
                        <div className="glass-card p-4 bg-secondary/20">
                          <h3 className="text-foreground font-medium mb-2">{decision.decision}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            <span className="text-destructive/70 font-medium">Discarded:</span> {decision.alternative}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="text-primary font-medium">Why:</span> {decision.reasoning}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>


              {/* My Role */}
              <article className="glass-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">My Role & Ownership</h2>
                <ul className="space-y-2">
                  {project.ownership.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <ChevronRight size={16} className="text-primary mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* Project Gallery */}
              <article className="glass-card p-6">
                <ProjectGallery images={projectImages} />
              </article>
            </div>

            {/* Right column - Sidebar */}
            <aside className="space-y-6">
              {/* Tech Stack */}
              <div className="glass-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Tech Stack</h3>
                <ul className="space-y-2">
                  {project.stack.map((tech) => (
                    <li key={tech} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Patterns */}
              <div className="glass-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Architectural Patterns</h3>
                <ul className="space-y-2">
                  {project.patterns.map((pattern) => (
                    <li key={pattern} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {pattern}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              {(project.liveUrl || project.repoUrl) && (
                <div className="glass-card p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Links</h3>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center py-2.5"
                    >
                      <ExternalLink size={16} />
                      View Live
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full justify-center py-2.5"
                    >
                      <Github size={16} />
                      View Code
                    </a>
                  )}
                </div>
              )}

              {/* Measurable Impact - Last */}
              <div className="glass-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                  Measurable Impact
                </h3>
                <ul className="space-y-2">
                  {project.impact.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
