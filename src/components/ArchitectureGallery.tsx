import { useRef, useState } from 'react';
import { ExternalLink, Maximize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
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
        <DialogContent className="flex h-[90svh] max-h-[90svh] w-[calc(100%-2rem)] max-w-6xl min-w-0 flex-col gap-3 overflow-hidden p-4 sm:p-6">
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

export const ArchitectureGallery = ({ diagrams }: { diagrams: ArchitectureDiagram[] }) => {
  const groups = diagrams.reduce<Record<string, ArchitectureDiagram[]>>((result, diagram) => {
    const group = diagram.category.split('/')[0].trim();
    (result[group] ??= []).push(diagram);
    return result;
  }, {});

  return (
    <Accordion type="multiple" className="mt-8 space-y-4">
      {Object.entries(groups).map(([group, items]) => (
        <AccordionItem key={group} value={group} className="glass-card border-primary/20">
          <AccordionTrigger className="gap-4 rounded-lg px-5 py-5 text-left hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring sm:px-6">
            <span className="flex items-center gap-3"><span className="text-lg font-semibold text-foreground">{group}</span><span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">{items.length} diagrams</span></span>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 px-4 pb-4 sm:px-6 sm:pb-6">
            {items.map((diagram, index) => <DiagramFigure key={diagram.id} diagram={diagram} index={index} />)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
