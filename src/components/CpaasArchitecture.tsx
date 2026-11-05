import { ArrowDown } from 'lucide-react';

const applications = [
  { name: 'Login', responsibility: 'Sign-in, recovery, OTP and error flows', detail: 'Vue.js SPA · My implementation' },
  { name: 'Home', responsibility: 'Shared layout and configurable product widgets', detail: 'Vue.js SPA · My implementation' },
  { name: 'Product applications', responsibility: 'Existing communication products remain separate', detail: 'Product microfrontends' },
];

export const CpaasArchitecture = () => (
  <figure className="mt-8 rounded-2xl bg-secondary/40 p-5 sm:p-7" aria-labelledby="cpaas-architecture-caption">
    <figcaption id="cpaas-architecture-caption" className="text-lg font-semibold text-foreground">One platform, separate applications</figcaption>
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">A simplified view of the platform structure and the two microfrontends I built.</p>
    <div className="mt-6 rounded-xl bg-background p-5 text-center">
      <h3 className="text-xl font-semibold text-foreground">Application shell / Orchestrator</h3>
      <p className="mt-2 text-sm text-muted-foreground">Brings the independent frontend applications into one CPaaS.</p>
    </div>
    <div className="flex justify-center py-3 text-primary" aria-hidden="true"><ArrowDown size={22} /></div>
    <ul className="grid gap-3 sm:grid-cols-3">
      {applications.map(application => (
        <li key={application.name} className="rounded-xl bg-background p-4">
          <h3 className="text-lg font-semibold text-foreground">{application.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{application.responsibility}</p>
          <p className="mt-4 text-sm font-medium text-primary">{application.detail}</p>
        </li>
      ))}
    </ul>
    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Supporting infrastructure: AWS and S3. I helped set up the infrastructure and connect the login and home applications.</p>
  </figure>
);
