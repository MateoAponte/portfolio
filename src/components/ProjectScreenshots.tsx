import { ExternalLink, Maximize2 } from 'lucide-react';
import type { Project } from '@/data/projects';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const ProjectScreenshots = ({ screenshots, name, format = 'mobile' }: { screenshots: NonNullable<Project['screenshots']>; name: string; format?: 'mobile' | 'desktop' }) => (
  <div className="mt-10">
    <h3 className="mb-5 text-lg font-semibold text-foreground">{format === 'desktop' ? 'Interface screens' : 'App screens'}</h3>
    <div className="grid gap-6 sm:grid-cols-2">
      {screenshots.map(screen => (
        <figure key={screen.src} className="glass-card overflow-hidden">
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" aria-label={`Enlarge ${screen.title} screen`} className="group relative block w-full bg-secondary/20 p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
                <img src={screen.src} alt={`${name} ${screen.title} interface`} loading="lazy" decoding="async" className={format === 'desktop' ? 'aspect-video w-full rounded-lg border border-border/60 bg-white object-contain' : 'mx-auto h-auto w-full max-w-64 rounded-xl border border-border/60'} />
                <span className="absolute bottom-6 right-6 rounded-md border border-border bg-background/90 p-2 text-muted-foreground group-hover:text-primary"><Maximize2 size={16} aria-hidden="true" /></span>
              </button>
            </DialogTrigger>
            <DialogContent className="flex h-[90svh] max-h-[90svh] w-[calc(100%-2rem)] max-w-3xl flex-col gap-3 overflow-hidden p-4 sm:p-6">
              <DialogTitle className="shrink-0 pr-8 leading-normal">{name} / {screen.title}</DialogTitle>
              <DialogDescription className="shrink-0">{screen.description}</DialogDescription>
              <div className="min-h-0 flex-1 rounded-lg bg-secondary/20 p-2">
                <img src={screen.src} alt={`${name} ${screen.title} interface, enlarged view`} className="h-full w-full object-contain" />
              </div>
              <a href={screen.src} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit shrink-0 items-center gap-2 text-sm text-primary underline underline-offset-4">Open Original Image<ExternalLink size={14} /></a>
            </DialogContent>
          </Dialog>
          <figcaption className="p-4">
            <h4 className="mb-2 font-semibold text-foreground">{screen.title}</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{screen.description}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  </div>
);
