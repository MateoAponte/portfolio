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
      className="w-full h-full relative min-h-screen flex items-center overflow-hidden bg-secondary/50"
    >
      <div className="w-full h-full py-48 min-h-screen bg-gradient-to-br from-primary/20 via-card to-accent/20">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-accent/[0.02] rounded-full blur-3xl" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-1 h-1 rounded-full bg-primary/80 animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute top-[25%] right-[15%] w-1.5 h-1.5 rounded-full bg-primary/60 animate-[float_10s_ease-in-out_infinite_1s]" />
          <div className="absolute top-[45%] left-[5%] w-1 h-1 rounded-full bg-primary/50 animate-[float_12s_ease-in-out_infinite_2s]" />
          <div className="absolute top-[60%] right-[8%] w-0.5 h-0.5 rounded-full bg-primary/80 animate-[float_9s_ease-in-out_infinite_0.5s]" />
          <div className="absolute top-[70%] left-[40%] w-1 h-1 rounded-full bg-primary/60 animate-[float_11s_ease-in-out_infinite_3s]" />
          <div className="absolute top-[35%] right-[25%] w-0.5 h-0.5 rounded-full bg-primary/80 animate-[float_7s_ease-in-out_infinite_1.5s]" />
          <div className="absolute top-[80%] right-[20%] w-1 h-1 rounded-full bg-primary/50 animate-[float_13s_ease-in-out_infinite_2.5s]" />
          <div className="absolute top-[20%] left-[30%] w-0.5 h-0.5 rounded-full bg-primary/80 animate-[float_9s_ease-in-out_infinite_4s]" />
        </div>

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
              <h1
                className={`mt-8 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}
              >
                <span className="text-foreground">Fullstack</span>
                <span className="gradient-text block mt-1">Developer</span>
              </h1>

              {/* Role emphasis */}
              <div
                className={`mt-4 flex items-center gap-3  ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}
              >
                <div className="h-px w-8 bg-primary/50" />
                <span className="text-lg font-medium text-muted-foreground ">
                  TypeScript Expert
                </span>
              </div>

              {/* Description */}
              <p
                className={`mt-6 text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}
              >
                I build robust and scalable solutions with a focus on{' '}
                <span className="text-foreground">clean architecture</span>,{' '}
                <span className="text-foreground">best practices</span> and{' '}
                <span className="text-foreground">systems thinking</span>.
              </p>

              {/* CTA Button */}
              <div
                className={`mt-10 ${isVisible ? 'animate-fade-up stagger-3' : 'opacity-0'}`}
              >
                <a
                  href="#portfolio"
                  className="btn-primary lg:text-base text-sm"
                >
                  Know more about my approach
                  <ArrowDown size={16} />
                </a>
              </div>

              {/* Social Links */}
              <div
                className={`mt-12 flex items-center gap-3 ${isVisible ? 'animate-fade-up stagger-4' : 'opacity-0'}`}
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-200"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-200"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:hello@developer.com"
                  className="inline-flex items-center gap-1.5 px-4 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-200"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Right - Profile Photo */}
            <div
              className={`order-1 lg:order-2 flex justify-center ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}
            >
              <div className="relative">
                <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-[31rem] lg:h-[31rem]">
                  {/* Outer decorative ring with dots - all rotating together */}
                  <div className="absolute inset-0 animate-[spin_35s_linear_infinite]">
                    <div className="absolute inset-0 rounded-full border border-primary/20" />
                    {/* Decorative dots on the ring */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary/70 animate-pulse" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary/70 animate-pulse [animation-delay:0.5s]" />
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary/50 animate-pulse [animation-delay:1s]" />
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary/50 animate-pulse [animation-delay:1.5s]" />
                  </div>

                  {/* Profile image container - circular crop */}
                  <div className="absolute inset-4 rounded-full overflow-hidden">
                    <img
                      src={profilePhoto}
                      alt="Profile photo"
                      className="w-full h-full object-cover object-[center_30%]"
                    />
                  </div>
                </div>

                {/* Subtle glow behind */}
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className="hidden lg:flex absolute -bottom-36 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-opacity duration-500 "
            style={{ opacity: scrollOpacity }}
          >
            <div className="w-5 h-8 rounded-full border border-border/50 flex items-start justify-center p-1 ">
              <div className="w-1 h-2 rounded-full bg-primary/60 animate-[bounce_2s_infinite]" />
            </div>
            <span className="lg:text-base text-sm font-medium uppercase tracking-wider animate-[bounce_2s_infinite]">
              Scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
