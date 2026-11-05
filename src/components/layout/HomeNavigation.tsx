import { useEffect, useState, useRef } from 'react';
import { Home, Folder, Layers, Workflow, Mail, Menu, X } from 'lucide-react';

const links = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'portfolio', label: 'Portfolio', icon: Folder },
  { id: 'skills', label: 'Skills', icon: Layers },
  { id: 'approach', label: 'How I work', icon: Workflow },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const HomeNavigation = () => {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => {
      const line = Math.max(100, window.innerHeight * 0.35);
      const current = links.filter(link => {
        const section = document.getElementById(link.id);
        return section && section.getBoundingClientRect().top <= line;
      }).at(-1);
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setActive(atEnd ? 'contact' : current?.id ?? 'home');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <header onKeyDown={event => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }} className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-xl lg:inset-y-0 lg:right-auto lg:w-36 lg:border-b-0 lg:border-r xl:w-44">
      <nav aria-label="Main navigation" className="flex h-full flex-col lg:justify-center lg:px-3 xl:px-5">
        <a href="#home" aria-label="Mateo, home" className="hidden px-3 py-8 font-mono text-sm font-semibold text-primary lg:absolute lg:top-0 lg:block">{'<Mateo />'}</a>
        <div className="flex h-16 items-center justify-between px-6 sm:hidden">
          <a href="#home" onClick={() => setMenuOpen(false)} className="font-semibold text-foreground" aria-label="Mateo, home">{'<Mateo />'}</a>
          <button ref={menuButton} type="button" onClick={() => setMenuOpen(value => !value)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="home-mobile-navigation" className="flex h-11 w-11 items-center justify-center text-foreground">
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
        <ul id="home-mobile-navigation" className={`${menuOpen ? 'grid' : 'hidden'} max-h-[calc(100svh-4rem)] grid-cols-1 overflow-y-auto sm:max-h-none sm:overflow-visible sm:flex w-full gap-1 sm:gap-0 px-2 py-2 lg:flex-col lg:gap-2 lg:p-0`}>
          {links.map(({ id, label, icon: Icon }) => (
            <li key={id} className="min-w-0 flex-1 lg:flex-none">
              <a href={`#${id}`} onClick={() => setMenuOpen(false)} aria-current={active === id ? 'location' : undefined} className={`flex min-h-11 sm:min-h-14 flex-row sm:flex-col items-center justify-start sm:justify-center gap-1.5 rounded-lg border px-4 sm:px-2 py-2 text-sm sm:text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring lg:min-h-12 lg:flex-row lg:justify-start lg:gap-3 lg:px-3 xl:text-sm ${active === id ? 'border-primary/40 bg-primary/10 text-primary' : 'border-transparent text-muted-foreground hover:bg-primary/5 hover:text-primary'}`}>
                <Icon size={20} strokeWidth={1.6} className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" aria-hidden="true" /><span className="whitespace-nowrap">{label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="absolute bottom-10 left-1/2 hidden h-16 w-px bg-gradient-to-b from-primary/40 to-transparent lg:block"><span className="absolute bottom-0 -left-0.5 h-1.5 w-1.5 rounded-full bg-primary" /></div>
      </nav>
    </header>
  );
};
