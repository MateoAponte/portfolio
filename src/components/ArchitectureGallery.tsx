import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Maximize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import type { ArchitectureDiagram } from '@/data/architecture';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const DiagramFigure = ({ diagram, index }: { diagram: ArchitectureDiagram; index: number }) => {
  const [zoom, setZoom] = useState(1);
  const viewport = useRef<HTMLDivElement>(null);
  const resetZoom = () => {
    setZoom(1);
    viewport.current?.scrollTo({ top: 0, left: 0 });
  };
  const controlClass = 'inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <figure className="glass-card overflow-hidden">
      <Dialog onOpenChange={resetZoom}>
        <DialogTrigger asChild>
          <button type="button" aria-label={`Enlarge ${diagram.title}`} className="group relative block w-full bg-white p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-6">
            <img src={diagram.src} alt={`${diagram.title} planning diagram`} loading="lazy" decoding="async" className="h-64 w-full object-contain sm:h-80" />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground group-hover:text-primary"><Maximize2 size={14} />Enlarge diagram</span>
          </button>
        </DialogTrigger>
        <DialogContent className="nature-main project-detail flex h-[90svh] max-h-[90svh] w-[calc(100%-2rem)] max-w-6xl min-w-0 flex-col gap-3 overflow-hidden p-4 sm:p-6">
          <DialogTitle className="shrink-0 pr-8 leading-normal">{diagram.title}</DialogTitle>
          <DialogDescription className="max-h-[15svh] shrink-0 overflow-y-auto">{diagram.description}</DialogDescription>
          <div role="group" aria-label="Diagram zoom controls" className="flex shrink-0 items-center gap-2">
            <button type="button" aria-label="Zoom out" disabled={zoom <= 1} onClick={() => setZoom(value => Math.max(1, value - 0.5))} className={controlClass}><ZoomOut size={16} /></button>
            <span aria-live="polite" className="w-12 text-center font-mono text-xs text-muted-foreground">{Math.round(zoom * 100)}%</span>
            <button type="button" aria-label="Zoom in" disabled={zoom >= 4} onClick={() => setZoom(value => Math.min(4, value + 0.5))} className={controlClass}><ZoomIn size={16} /></button>
            <button type="button" onClick={resetZoom} className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-xs text-foreground hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"><RotateCcw size={14} />Fit to view</button>
          </div>
          <div ref={viewport} tabIndex={0} role="region" aria-label={`${diagram.title}, scroll to explore when zoomed`} className="min-h-0 min-w-0 flex-1 overflow-auto overscroll-contain rounded-md bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
            <div style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }} className="p-3">
              <img src={diagram.src} alt={`${diagram.title} planning diagram, enlarged view`} draggable={false} className="block h-full w-full object-contain" />
            </div>
          </div>
          <a href={diagram.src} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit shrink-0 items-center gap-2 text-sm text-primary underline underline-offset-4">Open Original Image<ExternalLink size={14} /></a>
        </DialogContent>
      </Dialog>
      <figcaption className="p-5 sm:p-6">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">{String(index + 1).padStart(2, '0')} / {diagram.category}</p>
        <h4 className="mb-3 text-lg font-semibold text-foreground">{diagram.title}</h4>
        <p className="text-sm leading-7 text-muted-foreground">{diagram.description}</p>
      </figcaption>
    </figure>
  );
};

const DiagramCarousel = ({ diagrams, name }: { diagrams: ArchitectureDiagram[]; name: string }) => {
  const [active, setActive] = useState(0);
  const thumbnails = useRef<HTMLDivElement>(null);
  const select = (index: number, focus = false) => {
    setActive(index);
    const button = thumbnails.current?.children[index] as HTMLButtonElement | undefined;
    if (focus) button?.focus({ preventScroll: true });
    if (button && thumbnails.current) {
      const strip = thumbnails.current;
      strip.scrollTo({ left: button.offsetLeft - (strip.clientWidth - button.offsetWidth) / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };
  const controls = 'inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-35 disabled:cursor-not-allowed';

  return (
    <section aria-label={`${name} diagrams`} aria-roledescription="carousel" className="min-w-0">
      <div className="mb-4 flex items-center justify-end gap-1">
        <span role="status" aria-live="polite" aria-atomic="true" className="mr-2 text-sm tabular-nums text-muted-foreground"><span className="sr-only">Diagram </span>{active + 1} / {diagrams.length}</span>
        <button type="button" aria-label="Previous diagram" disabled={active === 0} onClick={() => select(active - 1)} className={controls}><ArrowLeft size={18} aria-hidden="true" /></button>
        <button type="button" aria-label="Next diagram" disabled={active === diagrams.length - 1} onClick={() => select(active + 1)} className={controls}><ArrowRight size={18} aria-hidden="true" /></button>
      </div>
      <DiagramFigure key={diagrams[active].id} diagram={diagrams[active]} index={active} />
      <div ref={thumbnails} role="group" aria-label="Choose a diagram" className="project-screen-thumbnails relative mt-4 flex min-w-0 gap-3 overflow-x-auto overscroll-x-contain px-1 pb-3 pt-1" onKeyDown={event => {
        let next = active;
        if (event.key === 'ArrowRight') next = Math.min(diagrams.length - 1, active + 1);
        else if (event.key === 'ArrowLeft') next = Math.max(0, active - 1);
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = diagrams.length - 1;
        else return;
        event.preventDefault();
        select(next, true);
      }}>
        {diagrams.map((diagram, index) => (
          <button key={diagram.id} type="button" aria-label={`Show ${diagram.title}`} aria-pressed={index === active} onClick={() => select(index)} className={`flex w-24 shrink-0 flex-col gap-2 rounded-lg p-1.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring sm:w-28 ${index === active ? 'bg-primary/15 text-foreground ring-2 ring-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
            <img src={diagram.src} alt="" loading="lazy" decoding="async" className="h-14 w-full rounded bg-white object-contain sm:h-16" />
            <span className="line-clamp-2 text-xs font-medium leading-snug">{diagram.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export const ArchitectureGallery = ({ diagrams }: { diagrams: ArchitectureDiagram[] }) => {
  const groups = diagrams.reduce<Record<string, ArchitectureDiagram[]>>((result, diagram) => {
    const group = diagram.category.split('/')[0].trim();
    (result[group] ??= []).push(diagram);
    return result;
  }, {});

  return (
    <Accordion type="multiple" className="mt-8 space-y-4">
      {Object.entries(groups).map(([group, items]) => (
        <AccordionItem key={group} value={group} className="glass-card detail-border-feedback border-primary/20">
          <AccordionTrigger className="gap-4 rounded-lg px-5 py-5 text-left hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring sm:px-6">
            <span className="flex items-center gap-3"><span className="text-lg font-semibold text-foreground">{group}</span><span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">{items.length} diagrams</span></span>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 px-4 pb-4 sm:px-6 sm:pb-6">
            <DiagramCarousel diagrams={items} name={group} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
