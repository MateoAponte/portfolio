import { useState, type FormEvent } from 'react';
import { BranchHero } from '@/components/BotanicalContours';
import { Mail, Github, Linkedin, MapPin, Send, FileText, Download } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const prepareEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setDraft('');
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    if (!name || !email || !message) {
      setError('Please add your name, email and a message.');
      return;
    }
    const subject = encodeURIComponent('Portfolio inquiry from ' + name);
    const body = encodeURIComponent(
      message + '\n\nFrom: ' + name + '\nReply to: ' + email,
    );
    setDraft(
      'mailto:mateo2aponte@hotmail.com?subject=' + subject + '&body=' + body,
    );
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient background glow - stronger for final section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-32 bottom-0 w-[600px] h-[600px] rounded-full blur-[120px] bg-primary/[0.08]" />
        <div className="absolute -right-32 top-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-primary/[0.06]" />
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2
            className={`mt-4 text-3xl md:text-4xl font-bold text-foreground ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}
          >
            Let’s work together
          </h2>
          <p
            className={`mt-4 lg:text-lg text-base text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}
          >
            My work spans IT support, frontend development and backend integration. I’m interested in Full-stack and AI engineering opportunities where I can help shape and deliver a product.
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
              What we can talk about
            </h3>

            {/* Topics with vertical stepper */}
            <div className="relative mb-8">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />

              <div className="space-y-3">
                {[
                  'Full-stack and AI engineering roles',
                  'User experience and product planning',
                  'Software architecture and API integrations',
                  'Testing, QA and delivery automation',
                  'MVPs and ongoing product improvement',
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
              <div className="glass-card p-4">
                <a
                  href="/documents/mateo-aponte-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <div className="rounded-md bg-primary/10 p-2.5 text-primary">
                    <FileText size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Experience & background</p>
                    <p className="text-sm font-medium text-foreground hover:text-primary">View my CV <span className="text-xs text-muted-foreground">(PDF)</span></p>
                  </div>
                </a>
                <a
                  href="/documents/mateo-aponte-cv.pdf"
                  download="Mateo Aponte - CV.pdf"
                  className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <Download size={16} aria-hidden="true" /> Download CV
                </a>
              </div>
              <a
                href="mailto:mateo2aponte@hotmail.com"
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
                    Remote / Colombia
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
                  href="https://github.com/MateoAponte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mateo-aponte-murcia/"
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
            <form
              onSubmit={prepareEmail}
              onChange={() => {
                setDraft('');
                setError('');
              }}
              className="glass-card p-5 space-y-5"
              aria-describedby="contact-email-help"
            >
              <p
                id="contact-email-help"
                className="text-sm leading-relaxed text-muted-foreground"
              >
                Prepare a draft, then open it in your email app to send it to
                me.
              </p>
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
                  What would you like to discuss?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2.5 rounded-md bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project, team or opportunity..."
                />
              </div>

              <button type="submit" className="btn-primary w-full py-2.5">
                <Send size={16} />
                Prepare email
              </button>
              <div
                role="status"
                aria-live="polite"
                className="text-sm leading-relaxed"
              >
                {error && <p className="text-[#f5c874]">{error}</p>}
                {draft && (
                  <div className="space-y-3">
                    <p className="text-muted-foreground">
                      Your draft is ready. It has not been sent yet.
                    </p>
                    <a
                      href={draft}
                      className="inline-flex min-h-11 items-center text-[var(--nature-link)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      Open email app
                    </a>
                    <p className="text-muted-foreground">
                      If it does not open, email{' '}
                      <a
                        href="mailto:mateo2aponte@hotmail.com"
                        className="text-[var(--nature-link)] underline underline-offset-4"
                      >
                        mateo2aponte@hotmail.com
                      </a>{' '}
                      directly. Your message stays in this form.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <BranchHero
        flip="x"
        className="-right-40 bottom-0 h-[520px] w-[440px] text-[#a5ad80]/25"
      />
    </section>
  );
};
