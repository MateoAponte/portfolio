import { Code2 } from 'lucide-react';

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

  if (!icon) return <Code2 size={20} className="shrink-0" aria-hidden="true" />;

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
