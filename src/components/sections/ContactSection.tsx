import { Mail, Github, Linkedin, MapPin, Send, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="contacto" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-section-contact)' }}
      />
      
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className={`section-badge ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            Contacto
          </span>
          <h2 className={`mt-4 text-3xl md:text-4xl font-bold text-foreground ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            Hablemos de Arquitectura
          </h2>
          <p className={`mt-4 text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            ¿Tienes un desafío técnico? Me interesa escuchar sobre problemas de escalabilidad, deuda técnica o decisiones arquitectónicas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className={isVisible ? 'animate-slide-right stagger-3' : 'opacity-0'}>
            <h3 className="text-lg font-semibold text-foreground mb-5">
              Conversemos sobre
            </h3>
            
            <div className="space-y-2.5 mb-8">
              {[
                'Arquitectura de sistemas distribuidos',
                'Migración de monolitos a microservicios',
                'Escalabilidad y performance',
                'Deuda técnica y refactoring estratégico',
                'MVPs con base sólida para escalar'
              ].map((topic, index) => (
                <div key={index} className="flex items-center gap-2.5 text-muted-foreground text-sm">
                  <MessageCircle size={14} className="text-primary shrink-0" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <a
                href="mailto:hello@developer.com"
                className="flex items-center gap-3 p-4 glass-card hover:border-primary/25 transition-colors"
              >
                <div className="p-2.5 rounded-md bg-primary/10 text-primary">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-foreground text-sm font-medium">hello@developer.com</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-4 glass-card">
                <div className="p-2.5 rounded-md bg-primary/10 text-primary">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ubicación</p>
                  <p className="text-foreground text-sm font-medium">Remoto / Global</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                También en
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={isVisible ? 'animate-slide-left stagger-4' : 'opacity-0'}>
            <form className="glass-card p-5 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 rounded-md bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 rounded-md bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  ¿Qué desafío técnico enfrentas?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2.5 rounded-md bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                  placeholder="Cuéntame sobre el problema técnico que quieres resolver..."
                />
              </div>

              <button type="submit" className="btn-primary w-full py-2.5">
                <Send size={16} />
                Iniciar Conversación
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
