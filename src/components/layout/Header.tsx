import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/#home', label: 'Home' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#approach', label: 'Approach' },
  { href: '/#contact', label: 'Contact' },
];

interface HeaderProps {
  projectLinks?: { href: string; label: string }[];
  activeSection?: string;
}

export const Header = ({ projectLinks, activeSection }: HeaderProps) => {
  const menuButton = useRef<HTMLButtonElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      onKeyDown={event => {
        if (event.key === 'Escape' && isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/40'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a
            href="/#home"
            className="text-lg font-bold text-foreground hover:text-primary transition-colors"
          >
            {'<Mateo />'}
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 lg:text-base text-sm font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="/#contact"
            className="hidden md:inline-flex btn-primary text-sm py-2 px-5"
          >
            Let's Talk
          </a>

          {/* Mobile Menu Button */}
          <button
            ref={menuButton}
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-11 w-11 items-center justify-center text-foreground"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="project-mobile-navigation"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div id="project-mobile-navigation" className="md:hidden absolute top-full left-0 right-0 max-h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain bg-background/95 backdrop-blur-xl border-b border-border/40">
            <ul className="flex flex-col py-3">
              {(projectLinks ?? navLinks).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={link.href === `#${activeSection}` ? 'location' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="px-6 py-3">
                <a
                  href={projectLinks ? '/#portfolio' : '/#contact'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full text-center text-sm"
                >
                  {projectLinks ? 'Back to Portfolio' : 'Let?s Talk'}
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
