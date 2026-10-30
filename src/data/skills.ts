export interface SkillTier {
  id: string;
  name: string;
  description: string;
  icon: string;
  skills: string[];
}

export const skillTiers: SkillTier[] = [
  {
    id: 'leadership',
    name: 'Core Stack',
    description: 'Languages, tools and concepts I work with across interfaces, APIs and data.',
    icon: 'Target',
    skills: [
      'TypeScript',
      'Node.js',
      'React',
      'PostgreSQL',
      'Event Sourcing',
      'CQRS',
      'Microservices',
      'API Design'
    ]
  },
  {
    id: 'production',
    name: 'Backend & Deployment',
    description: 'Frameworks and infrastructure in my broader development toolkit.',
    icon: 'Zap',
    skills: [
      'Next.js',
      'NestJS',
      'GraphQL',
      'Redis',
      'MongoDB',
      'Docker',
      'Kubernetes',
      'AWS'
    ]
  },
  {
    id: 'complementary',
    name: 'Complementary Tools',
    description: 'Tools for styling, testing, automation and observability.',
    icon: 'Wrench',
    skills: [
      'Tailwind CSS',
      'Framer Motion',
      'Vitest',
      'Playwright',
      'OpenTelemetry',
      'Grafana',
      'GitHub Actions',
      'Terraform'
    ]
  }
];

export const architecturePatterns = [
  'Domain-Driven Design',
  'Event Sourcing',
  'CQRS',
  'Hexagonal Architecture',
  'Saga Pattern',
  'Circuit Breaker',
  'API Gateway',
  'Event-Driven Architecture'
];
