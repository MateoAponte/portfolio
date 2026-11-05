export interface SkillGroup {
  id: string;
  name: string;
  description: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'architecture', name: 'Architecture',
    description: 'Patterns and practices for structuring systems and guiding development.',
    skills: ['Event Sourcing', 'CQRS', 'Microservices', 'DDD', 'SDD', 'TDD', 'Hexagonal Architecture', 'EDA'],
  },
  {
    id: 'ai', name: 'AI & Automation',
    description: 'AI-assisted development, integrations and automated workflows.',
    skills: ['Claude', 'Codex', 'Cursor', 'MCP', 'RAG', 'Agents', 'n8n'],
  },
  {
    id: 'frontend', name: 'Frontend',
    description: 'Interfaces, layouts and styling for web applications.',
    skills: ['React', 'Vue.js', 'Next.js', 'Tailwind CSS', 'SCSS'],
  },
  {
    id: 'backend', name: 'Backend',
    description: 'Services, APIs and the logic behind user flows.',
    skills: ['NestJS', 'API Design', 'Node.js', 'GraphQL'],
  },
  {
    id: 'data', name: 'Data Management',
    description: 'Data storage, caching and event streaming.',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka'],
  },
  {
    id: 'infra', name: 'Infrastructure',
    description: 'Containers, cloud platforms and communication between services.',
    skills: ['Docker', 'AWS', 'gRPC', 'Azure'],
  },
  {
    id: 'quality', name: 'Quality',
    description: 'Automated tests and tools for investigating application behavior.',
    skills: ['Vitest', 'Playwright', 'Kibana', 'Selenium'],
  },
];
