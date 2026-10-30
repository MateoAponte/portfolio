import { Activity, BookOpen, Boxes, CircuitBoard, Cloud, Code2, Database, FlaskConical, GitBranch, Layers, Network, Route, Shield, Split, Theater, Waves, Workflow } from 'lucide-react';

// Semantic icons for tools without a bundled brand asset and architecture concepts.
const conceptIcons: Record<string, typeof Code2> = {
  'Event Sourcing': GitBranch,
  CQRS: Split,
  Microservices: Network,
  'API Design': Route,
  MongoDB: Database,
  AWS: Cloud,
  'Framer Motion': Waves,
  Vitest: FlaskConical,
  Playwright: Theater,
  'GitHub Actions': Workflow,
  Terraform: Boxes,
  'Domain-Driven Design': BookOpen,
  'Hexagonal Architecture': Boxes,
  'Saga Pattern': Workflow,
  'Circuit Breaker': CircuitBoard,
  'API Gateway': Shield,
  'Event-Driven Architecture': Activity,
  'Repository Pattern': Layers,
};

const techIcons: Record<string, string> = {
  TypeScript: 'typescript',
  NestJS: 'nestjs',
  'Tailwind CSS': 'tailwindcss',
  Capacitor: 'capacitor',
  Gemini: 'gemini',
  Render: 'render',
  'Node.js': 'nodejs',
  React: 'react',
  PostgreSQL: 'postgresql',
  Redis: 'redis',
  Docker: 'docker',
  Kubernetes: 'kubernetes',
  'Next.js': 'nextjs',
  GraphQL: 'graphql',
  ClickHouse: 'clickhouse',
  'Apache Kafka': 'kafka',
  'D3.js': 'd3',
  OpenTelemetry: 'opentelemetry',
  Prometheus: 'prometheus',
  Grafana: 'grafana',
};

export const TechIcon = ({ tech }: { tech: string }) => {
  const icon = techIcons[tech];

  if (!icon) {
    const Icon = conceptIcons[tech] ?? Code2;
    return <Icon size={20} className="shrink-0" aria-hidden="true" />;
  }

  const source = `url("/icons/tech/${icon}.svg")`;
  return (
    <span
      aria-hidden="true"
      className="inline-block h-5 w-5 shrink-0 bg-current"
      style={{
        maskImage: source,
        WebkitMaskImage: source,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
};
