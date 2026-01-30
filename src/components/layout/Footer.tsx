import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-border/40">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <span>© {currentYear} Made with</span>
            <Heart size={12} className="text-primary fill-primary" />
            <span>and TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
