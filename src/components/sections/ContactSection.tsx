import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Send,
  MessageCircle,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Ambient background glow - stronger for final section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-32 bottom-0 w-[600px] h-[600px] rounded-full blur-[120px] bg-primary/[0.08]" />
        <div className="absolute -right-32 top-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-primary/[0.06]" />
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span
            className={`section-badge ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            Contact
          </span>
          <h2
            className={`mt-4 text-3xl md:text-4xl font-bold text-foreground ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}
          >
            Let's Talk Architecture
          </h2>
          <p
            className={`mt-4 lg:text-lg text-base text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}
          >
            Have a technical challenge? I'm interested in hearing about
            scalability issues, technical debt or architectural decisions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div
            className={
              isVisible ? 'animate-slide-right stagger-3' : 'opacity-0'
            }
          >
            <h3 className="text-lg font-semibold text-foreground mb-5">
              Let's discuss
            </h3>

            {/* Topics with vertical stepper */}
            <div className="relative mb-8">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />

              <div className="space-y-3">
                {[
                  'Distributed systems architecture',
                  'Monolith to microservices migration',
                  'Scalability and performance',
                  'Technical debt and strategic refactoring',
                  'MVPs with solid foundation to scale',
                ].map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-muted-foreground text-sm"
                  >
                    <div className="w-[15px] h-[15px] rounded-full border-2 border-primary/50 bg-background flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
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
                  <p className="text-foreground text-sm font-medium">
                    mateo2aponte@hotmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-4 glass-card hover:border-primary/25 transition-colors">
                <div className="p-2.5 rounded-md bg-primary/10 text-primary">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-foreground text-sm font-medium">
                    Remote / Global
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                Also on
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={isVisible ? 'animate-slide-left stagger-4' : 'opacity-0'}
          >
            <form className="glass-card p-5 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 rounded-md bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 rounded-md bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  What technical challenge are you facing?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2.5 rounded-md bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about the technical problem you want to solve..."
                />
              </div>

              <button type="submit" className="btn-primary w-full py-2.5">
                <Send size={16} />
                Start Conversation
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
