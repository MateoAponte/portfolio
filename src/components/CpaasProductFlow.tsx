import { ArrowRight, LogIn, LayoutDashboard, PanelsTopLeft } from 'lucide-react';

const stages = [
  {
    icon: LogIn,
    title: 'Unified login',
    description: 'Customers access the platform through a shared sign-in experience across the integrated companies.',
  },
  {
    icon: LayoutDashboard,
    title: 'Unified dashboard',
    description: 'A common home brings product navigation, notifications and configurable widgets into one place.',
  },
  {
    icon: PanelsTopLeft,
    title: 'Product overview',
    description: 'Customers explore each product through tailored overviews with relevant activity, reports and direct actions.',
  },
];

export const CpaasProductFlow = () => (
  <figure className="detail-border-feedback mt-8 rounded-2xl border border-transparent bg-secondary/30 p-5 sm:p-7" aria-labelledby="cpaas-flow-caption">
    <figcaption id="cpaas-flow-caption" className="text-xl font-semibold text-foreground">From one login to every product</figcaption>
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">I built the shared login and home microfrontends, connecting a common entry point with product-specific dashboard experiences.</p>
    <ol className="mt-6 grid gap-5 sm:grid-cols-3">
      {stages.map(({ icon: Icon, title, description }, index) => (
        <li key={title} className="min-w-0">
          <div className="mb-3 flex items-center justify-between text-primary">
            <Icon size={22} aria-hidden="true" />
            {index < stages.length - 1 && <ArrowRight size={18} className="hidden sm:block" aria-hidden="true" />}
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </li>
      ))}
    </ol>
  </figure>
);
