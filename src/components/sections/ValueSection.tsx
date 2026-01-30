import { Target, Brain, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const values = [
  {
    icon: Target,
    title: 'Robust Solutions',
    description: 'Clean, testable and maintainable code. Every line has a purpose and is designed to last.',
  },
  {
    icon: Brain,
    title: 'Systems Thinking',
    description: 'I see the big picture. I design architectures that scale and anticipate future needs.',
  },
  {
    icon: Users,
    title: 'Technical Leadership',
    description: 'I guide teams towards best practices. Mentoring, code reviews and establishing standards.',
  },
];

export const ValueSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="value" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-section-value)' }}
      />
      
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className={`section-badge ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            Value Proposition
          </span>
          <h2 className={`mt-4 text-3xl md:text-4xl font-bold text-foreground ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            What I Offer
          </h2>
          <p className={`mt-4 text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            More than code: a comprehensive approach to solving complex problems with elegant solutions.
          </p>
        </div>

        {/* Values with horizontal stepper line */}
        <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
          <div className="relative">
            {/* Horizontal stepper line connecting all values */}
            <div className="hidden md:block absolute top-5 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                
                return (
                  <div key={value.title} className="relative text-center">
                    {/* Stepper dot on the line - positioned at y=5 to align with line */}
                    <div className="hidden md:block absolute top-[0.3rem] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-background border-2 border-primary z-20" />
                    <div className="hidden md:block absolute top-[0.55rem] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary z-30" />
                    
                    {/* Icon below the line */}
                    <div className="relative inline-flex mb-5 mt-8 md:mt-10">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative z-10 bg-background">
                        <Icon size={20} className="text-primary" />
                      </div>
                    </div>
                    
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
