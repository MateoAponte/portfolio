import { Leaf } from 'lucide-react';

interface AppShowcaseProps {
  name: string;
  screens: { left: string; center: string; right: string };
}

export const AppShowcase = ({ name, screens }: AppShowcaseProps) => (
  <figure aria-label={`${name} mobile app showcase`} className="relative isolate min-w-0 overflow-hidden rounded-2xl border border-primary/15 bg-background bg-[radial-gradient(ellipse_at_50%_75%,hsl(var(--primary)/0.15),transparent_70%)]">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-[15%] top-[12%] h-[80%] w-[130%] -rotate-[25deg] rounded-[50%] border border-primary/25" />
      <div className="absolute -left-[5%] top-[2%] h-[95%] w-[120%] rotate-[20deg] rounded-[50%] border border-primary/10" />
      <span className="absolute right-[12%] top-[15%] h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_hsl(var(--primary)/0.7)]" />
      <span className="absolute bottom-[12%] left-[9%] h-1.5 w-1.5 rounded-full bg-primary" />
      <span className="absolute left-[5%] top-[8%] flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary"><Leaf size={20} /></span>
    </div>
    <div className="relative aspect-[1.08/1] [perspective:1000px]">
      {([
        { src: screens.left, label: 'Rewards', position: 'left-[1%] top-[20%] z-10 w-[34%] -rotate-[14deg]' },
        { src: screens.right, label: 'Recoveries', position: 'right-[-1%] top-[20%] z-10 w-[34%] rotate-[13deg]' },
        { src: screens.center, label: 'Home', position: 'left-[29%] top-[5%] z-20 w-[41%] rotate-[7deg]' },
      ]).map(screen => (
        <div key={screen.label} className={`absolute rounded-[clamp(1rem,3vw,2.5rem)] border border-primary/40 bg-secondary p-[1%] shadow-[0_20px_45px_hsl(var(--background)/0.8),inset_0_0_0_2px_hsl(var(--foreground)/0.15)] ${screen.position}`}>
          <div className="overflow-hidden rounded-[clamp(0.8rem,2.6vw,2.2rem)] bg-background">
            <img src={screen.src} alt={`${name} ${screen.label} screen`} width={716} height={1600} className="block h-auto w-full" />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-foreground/10 via-transparent to-transparent" />
        </div>
      ))}
    </div>
    <figcaption className="sr-only">{name}: rewards, home and recovery management mobile interfaces.</figcaption>
  </figure>
);
