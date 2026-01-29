import { Target, Brain, Users, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const values = [
  {
    icon: Target,
    title: 'Soluciones Robustas',
    description: 'Código limpio, testeable y mantenible. Cada línea tiene un propósito y está diseñada para durar.',
  },
  {
    icon: Brain,
    title: 'Pensamiento Sistémico',
    description: 'Veo el panorama completo. Diseño arquitecturas que escalan y anticipan necesidades futuras.',
  },
  {
    icon: Users,
    title: 'Liderazgo Técnico',
    description: 'Guío equipos hacia mejores prácticas. Mentoría, code reviews y establecimiento de estándares.',
  },
];

export const ValueSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="propuesta" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-section-value)' }}
      />
      
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className={`section-badge ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            Propuesta de Valor
          </span>
          <h2 className={`mt-4 text-3xl md:text-4xl font-bold text-foreground ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            Lo Que Ofrezco
          </h2>
          <p className={`mt-4 text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            Más que código: un enfoque integral para resolver problemas complejos con soluciones elegantes.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            
            return (
              <div
                key={value.title}
                className={`text-center ${isVisible ? `animate-fade-up stagger-${index + 3}` : 'opacity-0'}`}
              >
                <div className="inline-flex p-4 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 mb-5">
                  <Icon size={28} className="text-primary" />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className={`mt-16 glass-card p-8 md:p-10 text-center max-w-3xl mx-auto ${isVisible ? 'animate-fade-up stagger-6' : 'opacity-0'}`}>
          <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-5">
            <MessageSquare size={24} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            ¿Enfrentas desafíos técnicos complejos?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm leading-relaxed">
            Escalabilidad, deuda técnica, arquitectura de sistemas distribuidos o MVPs con proyección real. Hablemos de cómo resolver problemas, no solo de escribir código.
          </p>
          <a href="#contacto" className="btn-primary">
            Conversemos sobre tu arquitectura
          </a>
        </div>
      </div>
    </section>
  );
};
