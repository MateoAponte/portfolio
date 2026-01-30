import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import profilePhoto from '@/assets/profile-photo.png';
import { useState, useEffect } from 'react';

export const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 50;
      const fadeEnd = 200;
      
      if (scrollY <= fadeStart) {
        setScrollOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setScrollOpacity(0);
      } else {
        setScrollOpacity(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div className={`mt-12 flex items-center gap-3 ${isVisible ? 'animate-fade-up stagger-4' : 'opacity-0'}`}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-200"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-200"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:hello@developer.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-200"
              >
                <Mail size={14} />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right - Profile Photo */}
          <div className={`order-1 lg:order-2 flex justify-center ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            <div className="relative">
              <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
                {/* Outer decorative ring with slow rotation */}
                <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_20s_linear_infinite]" />
                
                {/* Profile image container - circular crop */}
                <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-primary/30">
                  <img 
                    src={profilePhoto} 
                    alt="Profile photo" 
                    className="w-full h-full object-cover object-[center_30%]"
                  />
                </div>
                
                {/* Decorative dots on the ring with pulse animation */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary/70 animate-pulse" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary/70 animate-pulse [animation-delay:0.5s]" />
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary/50 animate-pulse [animation-delay:1s]" />
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary/50 animate-pulse [animation-delay:1.5s]" />
              </div>
              
              {/* Subtle glow behind */}
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="hidden lg:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-opacity duration-500"
          style={{ opacity: scrollOpacity }}
        >
          <div className="w-5 h-8 rounded-full border border-border/50 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-primary/60 animate-bounce" />
          </div>
          <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
        </div>
      </div>
    </section>
  );
};
