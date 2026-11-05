import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Maximize2 } from 'lucide-react';
import type { Project } from '@/data/projects';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ProjectScreenshotsProps {
  screenshots: NonNullable<Project['screenshots']>;
  name: string;
  format?: 'mobile' | 'desktop';
}

const ScreenshotCarousel = ({ screenshots, name, format = 'mobile' }: ProjectScreenshotsProps) => {
  const [active, setActive] = useState(0);
  const thumbnails = useRef<HTMLDivElement>(null);
  const screen = screenshots[active];
  const controls = 'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-35';

  useEffect(() => {
    const strip = thumbnails.current;
    const selected = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !selected) return;
    if (selected.offsetLeft < strip.scrollLeft || selected.offsetLeft + selected.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({ left: selected.offsetLeft - (strip.clientWidth - selected.offsetWidth) / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  }, [active]);

  return (
    <section aria-label={`${name} screenshot gallery`} aria-roledescription="carousel" className="mt-10 min-w-0">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">{format === 'desktop' ? 'Interface screens' : 'App screens'}</h3>
        <div className="flex items-center gap-1">
          <span className="mr-2 text-sm tabular-nums text-muted-foreground" aria-hidden="true">{active + 1} / {screenshots.length}</span>
          <button type="button" aria-label="Previous screenshot" onClick={() => setActive(value => value - 1)} disabled={active === 0} className={controls}><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" aria-label="Next screenshot" onClick={() => setActive(value => value + 1)} disabled={active === screenshots.length - 1} className={controls}><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
      <figure className="min-w-0">
        <Dialog>
          <DialogTrigger asChild>
            <button type="button" aria-label={`Enlarge ${screen.title} screen`} className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-secondary/30 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:p-5">
              <img src={screen.src} alt={`${name} ${screen.title} interface`} loading="lazy" decoding="async" className={format === 'desktop' ? 'h-[clamp(13rem,45vw,30rem)] w-full object-contain' : 'h-[clamp(20rem,55svh,30rem)] w-full object-contain'} />
              <span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-lg bg-background/90 text-foreground group-hover:text-primary"><Maximize2 size={18} aria-hidden="true" /></span>
            </button>
          </DialogTrigger>
          <DialogContent className="nature-main project-detail flex h-[90svh] max-h-[90svh] w-[calc(100%-2rem)] max-w-5xl flex-col gap-3 overflow-hidden p-4 sm:p-6">
            <DialogTitle className="shrink-0 pr-8 leading-normal">{name} / {screen.title}</DialogTitle>
            <DialogDescription className="max-h-[15svh] shrink-0 overflow-auto">{screen.description}</DialogDescription>
            <div className="min-h-0 flex-1 rounded-lg bg-secondary/20 p-2">
              <img src={screen.src} alt={`${name} ${screen.title} interface, enlarged view`} className="h-full w-full object-contain" />
            </div>
            <a href={screen.src} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-fit shrink-0 items-center gap-2 text-sm text-primary underline underline-offset-4">Open Original Image<ExternalLink size={14} aria-hidden="true" /></a>
          </DialogContent>
        </Dialog>
        <figcaption aria-live="polite" aria-atomic="true" className="pb-4 pt-4">
          <h4 className="font-semibold text-foreground">{screen.title}<span className="sr-only">, screenshot {active + 1} of {screenshots.length}</span></h4>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{screen.description}</p>
        </figcaption>
      </figure>
      <div ref={thumbnails} role="group" aria-label="Choose a screenshot" onKeyDown={event => {
        let next = active;
        if (event.key === 'ArrowRight') next = Math.min(screenshots.length - 1, active + 1);
        else if (event.key === 'ArrowLeft') next = Math.max(0, active - 1);
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = screenshots.length - 1;
        else return;
        event.preventDefault();
        setActive(next);
        (thumbnails.current?.children[next] as HTMLButtonElement | undefined)?.focus({ preventScroll: true });
      }} className="project-screen-thumbnails relative flex min-w-0 gap-3 overflow-x-auto overscroll-x-contain px-1 pb-3 pt-1">
        {screenshots.map((item, index) => (
          <button key={item.src} type="button" aria-label={`Show ${item.title} screenshot`} aria-pressed={active === index} onClick={() => setActive(index)} className={`flex w-24 shrink-0 flex-col gap-2 rounded-lg p-1.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring sm:w-28 ${active === index ? 'bg-primary/15 text-foreground ring-2 ring-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
            <img src={item.src} alt="" loading="lazy" decoding="async" className="h-14 w-full rounded bg-secondary/30 object-contain sm:h-16" />
            <span className="line-clamp-2 text-xs font-medium leading-snug">{item.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export const ProjectScreenshots = (props: ProjectScreenshotsProps) => props.screenshots.length ? <ScreenshotCarousel key={props.name + props.screenshots.map(screen => screen.src).join('|')} {...props} /> : null;
