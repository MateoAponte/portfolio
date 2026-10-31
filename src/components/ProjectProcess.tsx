import { useState, type CSSProperties } from 'react';
import { Search, Workflow, Network, Palette, Code2, CheckCheck, Rocket } from 'lucide-react';
import type { Project } from '@/data/projects';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const icons = [Search, Workflow, Network, Palette, Code2, CheckCheck, Rocket];
const categories = ['Discovery', 'Design', 'Delivery'] as const;
type Step = Project['process'][number];

const ProcessItem = ({ step, index, total, mobile = false }: { step: Step; index: number; total: number; mobile?: boolean }) => {
  const [open, setOpen] = useState(false);
  const Icon = icons[total === 3 ? [0, 2, 6][index] : index % icons.length];
  const width = Math.min(100, Math.max(0, step.width ?? 100 / 3));
  return (
    <li style={{ '--offset': ((step.start ?? 1 + index * 4) - 1) / 12 * 100 + '%', '--bar-width': width + '%' } as CSSProperties}>
      <Tooltip open={open} onOpenChange={setOpen} delayDuration={180}>
        <TooltipTrigger asChild>
          <button type="button" onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onClick={event => { event.preventDefault(); setOpen(true); }} className={mobile ? 'detail-process-item block min-h-11 w-full rounded-lg border border-border/70 bg-background p-3 text-left' : 'detail-process-item flex min-h-11 min-w-0 items-center gap-2 rounded-full border border-border/70 bg-background py-1 pl-1 pr-3 sm:ml-[var(--offset)] sm:w-[var(--bar-width)] text-left'}>
            <span className="flex items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"><Icon size={15} strokeWidth={1.7} aria-hidden="true" /></span>
              <span className={mobile ? 'text-sm font-medium leading-snug text-foreground' : 'text-xs font-medium leading-snug text-foreground'}>{step.title}</span>
              {mobile && <span className="ml-auto shrink-0 text-xs tabular-nums text-primary">{Math.round(width * 10) / 10}%</span>}
            </span>
            {mobile && <span aria-hidden="true" className="mt-3 block h-2 w-full overflow-hidden rounded-full bg-secondary"><span className="block h-full rounded-full bg-[#b9cba3]" style={{ width: width + '%' }} /></span>}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={8} className="max-w-[min(22rem,calc(100vw-2rem))] border-white/15 bg-[#080b09] px-4 py-3 text-sm font-semibold leading-relaxed text-white shadow-lg motion-reduce:animate-none">
          {step.description}
        </TooltipContent>
      </Tooltip>
    </li>
  );
};

export const ProjectProcess = ({ steps }: { steps: Project['process'] }) => (
  <div>
    <div className="space-y-6 sm:hidden">
      {categories.map(category => {
        const items = steps.map((step, index) => ({ step, index })).filter(({ step, index }) => (step.category ?? categories[Math.min(2, Math.floor(index / Math.max(1, steps.length) * 3))]) === category);
        if (!items.length) return null;
        return <section key={category} aria-label={category}>
          <h3 className="mb-3 text-lg font-semibold text-foreground">{category}</h3>
          <ul className="space-y-3">{items.map(({ step, index }) => <ProcessItem key={step.title} step={step} index={index} total={steps.length} mobile />)}</ul>
        </section>;
      })}
    </div>
    <div className="hidden sm:block">
      <div className="mb-5 grid grid-cols-3 text-xs font-medium text-muted-foreground"><span>Discovery</span><span className="text-center">Design</span><span className="text-right">Delivery</span></div>
      <ol aria-label="Project process" className="relative space-y-3 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[length:8.333%_100%] py-4">
        {steps.map((step, index) => <ProcessItem key={step.title} step={step} index={index} total={steps.length} />)}
      </ol>
    </div>
  </div>
);
