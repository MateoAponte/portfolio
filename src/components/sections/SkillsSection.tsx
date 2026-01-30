import { Target, Zap, Wrench, Boxes, Code2, Database, Layers } from 'lucide-react';
import { skillTiers, architecturePatterns } from '@/data/skills';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const iconMap: Record<string, React.ElementType> = {
  Target,
  Zap,
  Wrench,
};

export const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-section-skills)' }}
      />
      
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header with Visual Element */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <span className={`section-badge ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
              Skills
            </span>
            <h2 className={`mt-4 text-3xl md:text-4xl font-bold text-foreground ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
              Technical Stack by Expertise Level
            </h2>
            <p className={`mt-4 text-muted-foreground max-w-2xl ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
              Technologies organized by depth of experience and technical responsibility.
            </p>
          </div>
          
          {/* Geometric Visual Element (moved from Hero) */}
          <div className={`hidden lg:flex justify-center lg:justify-end ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            <div className="relative w-56 h-56">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-border/30" />
              
              {/* Middle ring with gradient */}
              <div className="absolute inset-3 rounded-full border border-primary/20">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/40" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent/40" />
              </div>
              
              {/* Inner content area */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-card via-card/80 to-card/60 border border-border/40 flex items-center justify-center overflow-hidden">
                {/* Floating icons */}
                <div className="relative w-full h-full">
                  <div className="absolute top-1/4 left-1/4 p-2 rounded-lg bg-primary/10 text-primary animate-float">
                    <Code2 size={18} />
                  </div>
                  <div className="absolute top-1/2 right-1/4 p-2 rounded-lg bg-accent/10 text-accent animate-float" style={{ animationDelay: '1s' }}>
                    <Database size={18} />
                  </div>
                  <div className="absolute bottom-1/4 left-1/3 p-2 rounded-lg bg-primary/10 text-primary animate-float" style={{ animationDelay: '2s' }}>
                    <Layers size={18} />
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
              
              {/* Subtle glow behind */}
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>

        {/* Skills Grid - Card per tier */}
        <div className={`grid md:grid-cols-3 gap-6 max-w-5xl mx-auto ${isVisible ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
          {skillTiers.map((tier) => {
            const Icon = iconMap[tier.icon] || Target;
            
            return (
              <div key={tier.id} className="glass-card p-5">
                {/* Tier Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {tier.description}
                    </p>
                  </div>
                </div>

                {/* Skills as compact grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  {tier.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-2 py-1.5 rounded text-xs font-medium bg-secondary/50 text-muted-foreground border border-primary/20 text-center truncate"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Architecture Patterns - Card */}
        <div className={`glass-card p-5 max-w-5xl mx-auto mt-6 ${isVisible ? 'animate-fade-up stagger-4' : 'opacity-0'}`}>
          <div className="flex items-start gap-3">
            <div className="shrink-0">
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Boxes size={18} className="text-accent" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Architectural Patterns
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Patterns implemented in production systems
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {architecturePatterns.map((pattern) => (
                  <span key={pattern} className="px-2 py-1.5 rounded text-xs font-medium bg-secondary/50 text-muted-foreground border border-primary/20 text-center truncate">
                    {pattern}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
