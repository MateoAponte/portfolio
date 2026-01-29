import { GitBranch, FileCode, Users, BookOpen, Lightbulb, Shield } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const principles = [
  {
    icon: Lightbulb,
    title: 'Diseño antes de código',
    description: 'Invierto tiempo en entender el problema y diseñar la solución antes de escribir la primera línea. El código más barato de mantener es el que nunca se escribe.'
  },
  {
    icon: GitBranch,
    title: 'Decisiones con trade-offs explícitos',
    description: 'Cada decisión arquitectónica documenta alternativas consideradas y razones de descarte. Facilita revisiones futuras y onboarding de nuevos miembros.'
  },
  {
    icon: Shield,
    title: 'Mantenibilidad sobre cleverness',
    description: 'Priorizo código que cualquier desarrollador del equipo pueda entender y modificar. La complejidad accidental es deuda técnica oculta.'
  },
  {
    icon: BookOpen,
    title: 'Documentación como producto',
    description: 'ADRs, diagramas de arquitectura y guías de contribución son parte del entregable. Un sistema sin documentación es un sistema con fecha de expiración.'
  },
  {
    icon: FileCode,
    title: 'DX como multiplicador',
    description: 'Invierto en tooling, linting y automatización. Un equipo con buena DX entrega más rápido y con menos fricción.'
  },
  {
    icon: Users,
    title: 'Colaboración con producto y diseño',
    description: 'Participo activamente en definición de producto. Entender el "por qué" permite proponer soluciones técnicas que habilitan mejor experiencia de usuario.'
  }
];

export const ApproachSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="enfoque" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-section-approach)' }}
      />
      
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className={`section-badge ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            Enfoque
          </span>
          <h2 className={`mt-4 text-3xl md:text-4xl font-bold text-foreground ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            Cómo Tomo Decisiones Técnicas
          </h2>
          <p className={`mt-4 text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            Principios que guían mi trabajo y definen cómo abordo problemas complejos.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            
            return (
              <div
                key={principle.title}
                className={`glass-card p-5 ${isVisible ? `animate-fade-up stagger-${Math.min(index + 3, 6)}` : 'opacity-0'}`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-md bg-primary/10 text-primary shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
