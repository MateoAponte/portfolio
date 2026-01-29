import { Target, Zap, Wrench, Boxes } from 'lucide-react';
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
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className={`section-badge ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            Conocimientos
          </span>
          <h2 className={`mt-4 text-3xl md:text-4xl font-bold text-foreground ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            Stack Técnico por Nivel de Expertise
          </h2>
          <p className={`mt-4 text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            Tecnologías organizadas por profundidad de experiencia y responsabilidad técnica.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto mb-10">
          {skillTiers.map((tier, tierIndex) => {
            const Icon = iconMap[tier.icon] || Target;
            
            return (
              <div
                key={tier.id}
                className={`glass-card p-5 ${isVisible ? `animate-fade-up stagger-${tierIndex + 3}` : 'opacity-0'}`}
              >
                {/* Tier Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-md bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {tier.name}
                  </h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {tier.description}
                </p>

                {/* Skills List */}
                <div className="flex flex-wrap gap-1.5">
                  {tier.skills.map((skill) => (
                    <span key={skill} className="skill-tag text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture Patterns */}
        <div className={`glass-card p-5 max-w-4xl mx-auto ${isVisible ? 'animate-fade-up stagger-6' : 'opacity-0'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-md bg-accent/10 text-accent">
              <Boxes size={20} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Patrones Arquitectónicos
              </h3>
              <p className="text-xs text-muted-foreground">
                Patrones implementados en sistemas productivos
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {architecturePatterns.map((pattern) => (
              <span key={pattern} className="px-2.5 py-1 rounded text-xs font-medium bg-accent/10 border border-accent/20 text-accent">
                {pattern}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
