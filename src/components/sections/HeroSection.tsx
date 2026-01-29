import { ArrowDown, Github, Linkedin, Mail, Code2, Database, Layers } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-section-hero)' }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-accent/[0.02] rounded-full blur-3xl" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
              <span className="section-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Disponible para nuevos proyectos
              </span>
            </div>

            {/* Main Heading */}
            <h1 className={`mt-8 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
              <span className="text-foreground">Fullstack</span>
              <span className="gradient-text block mt-1">Developer</span>
            </h1>
            
            {/* Role emphasis */}
            <div className={`mt-4 flex items-center gap-3 ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
              <div className="h-px w-8 bg-primary/50" />
              <span className="text-lg font-medium text-muted-foreground">TypeScript Expert</span>
            </div>

            {/* Description */}
            <p className={`mt-6 text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
              Construyo soluciones robustas y escalables con enfoque en{' '}
              <span className="text-foreground">arquitectura limpia</span>,{' '}
              <span className="text-foreground">buenas prácticas</span> y{' '}
              <span className="text-foreground">pensamiento sistémico</span>.
            </p>

            {/* CTA Buttons */}
            <div className={`mt-10 flex flex-col sm:flex-row items-start gap-4 ${isVisible ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
              <a href="#portafolio" className="btn-primary">
                Ver Decisiones Técnicas
                <ArrowDown size={16} />
              </a>
              <a href="#contacto" className="btn-secondary">
                Hablemos de arquitectura
              </a>
            </div>

            {/* Social Links */}
            <div className={`mt-12 flex items-center gap-5 ${isVisible ? 'animate-fade-up stagger-4' : 'opacity-0'}`}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-md bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-md bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:hello@developer.com"
                className="p-2.5 rounded-md bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right - Visual Element */}
          <div className={`order-1 lg:order-2 flex justify-center lg:justify-end ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            <div className="relative">
              {/* Abstract geometric visual */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-border/30" />
                
                {/* Middle ring with gradient */}
                <div className="absolute inset-4 rounded-full border border-primary/20">
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary/40" />
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent/40" />
                </div>
                
                {/* Inner content area */}
                <div className="absolute inset-10 rounded-full bg-gradient-to-br from-card via-card/80 to-card/60 border border-border/40 flex items-center justify-center overflow-hidden">
                  {/* Floating icons */}
                  <div className="relative w-full h-full">
                    <div className="absolute top-1/4 left-1/4 p-3 rounded-lg bg-primary/10 text-primary animate-float">
                      <Code2 size={24} />
                    </div>
                    <div className="absolute top-1/2 right-1/4 p-3 rounded-lg bg-accent/10 text-accent animate-float" style={{ animationDelay: '1s' }}>
                      <Database size={24} />
                    </div>
                    <div className="absolute bottom-1/4 left-1/3 p-3 rounded-lg bg-primary/10 text-primary animate-float" style={{ animationDelay: '2s' }}>
                      <Layers size={24} />
                    </div>
                  </div>
                </div>
                
                {/* Decorative arcs */}
                <svg className="absolute inset-0 w-full h-full -rotate-45" viewBox="0 0 100 100">
                  <path
                    d="M 15 50 A 35 35 0 0 1 85 50"
                    fill="none"
                    stroke="hsl(var(--primary) / 0.15)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 50 A 30 30 0 0 1 80 50"
                    fill="none"
                    stroke="hsl(var(--accent) / 0.1)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              
              {/* Subtle glow behind */}
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>

        {/* Tech stack strip */}
        <div className={`mt-16 lg:mt-24 ${isVisible ? 'animate-fade-up stagger-5' : 'opacity-0'}`}>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 text-muted-foreground/60 text-sm font-medium">
            <span>TypeScript</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <span>React</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <span>Node.js</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <span>NestJS</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <span>PostgreSQL</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <span>AWS</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`hidden lg:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground ${isVisible ? 'animate-fade-up stagger-6' : 'opacity-0'}`}>
          <div className="w-5 h-8 rounded-full border border-border/50 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-primary/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
