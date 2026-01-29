import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-border/40">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <span>© {currentYear} Hecho con</span>
            <Heart size={12} className="text-primary fill-primary" />
            <span>y TypeScript</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:hello@developer.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
