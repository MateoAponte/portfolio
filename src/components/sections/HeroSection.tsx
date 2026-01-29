import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import profilePhoto from '@/assets/profile-photo.png';
export const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="home"
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
                Available for new projects
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
              I build robust and scalable solutions with a focus on{' '}
              <span className="text-foreground">clean architecture</span>,{' '}
              <span className="text-foreground">best practices</span> and{' '}
              <span className="text-foreground">systems thinking</span>.
            </p>

            {/* CTA Button */}
            <div className={`mt-10 ${isVisible ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
              <a href="#portfolio" className="btn-primary">
                View Technical Decisions
                <ArrowDown size={16} />
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

          {/* Right - Profile Photo */}
          <div className={`order-1 lg:order-2 flex justify-center ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            <div className="relative">
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Outer decorative ring */}
                <div className="absolute inset-0 rounded-full border border-primary/20" />
                
                {/* Profile image container - circular crop */}
                <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-primary/30">
                  <img 
                    src={profilePhoto} 
                    alt="Profile photo" 
                    className="w-full h-full object-cover object-center scale-125"
                  />
                </div>
                
                {/* Decorative dots on the ring */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary/70" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary/70" />
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary/50" />
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary/50" />
              </div>
              
              {/* Subtle glow behind */}
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`hidden lg:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground ${isVisible ? 'animate-fade-up stagger-5' : 'opacity-0'}`}>
          <div className="w-5 h-8 rounded-full border border-border/50 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-primary/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
