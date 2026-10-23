import type { CSSProperties } from 'react';
import { Search, Workflow, Network, Palette, Code2, CheckCheck, Rocket } from 'lucide-react';
import type { Project } from '@/data/projects';

const icons = [Search, Workflow, Network, Palette, Code2, CheckCheck, Rocket];

export const ProjectProcess = ({ steps }: { steps: Project['process'] }) => (
  <div>
    <div className="mb-5 grid grid-cols-3 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-xs">
      <span>Discovery</span><span className="text-center">Design</span><span className="text-right">Delivery</span>
    </div>
    <ol aria-label="Project process" className="relative space-y-4 py-4 sm:space-y-3 sm:bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px)] sm:bg-[length:8.333%_100%]">
      {steps.map((step, index) => {
        const Icon = icons[steps.length === 3 ? [0, 2, 6][index] : index % icons.length];
        const start = step.start ?? 1 + index * 4;
        const width = step.width ?? 100 / 3;
        return (
          <li key={step.title} style={{ '--offset': `${(start - 1) / 12 * 100}%`, '--bar-width': `${width}%` } as CSSProperties}>
            <div className="flex min-w-0 items-center gap-2 rounded-full border border-border/70 bg-background py-1 pl-1 pr-3 sm:ml-[var(--offset)] sm:w-[var(--bar-width)]" title={step.description}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"><Icon size={15} strokeWidth={1.7} aria-hidden="true" /></span>
              <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-foreground sm:text-[9px] xl:text-[10px]">{step.title}</span>
              <span className="sr-only">: {step.description}</span>
            </div>
          </li>
        );
      })}
    </ol>
  </div>
);
