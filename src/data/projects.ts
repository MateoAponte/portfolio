import { ecogiroArchitecture, type ArchitectureDiagram } from './architecture';

export interface TechnicalDecision {
  decision: string;
  alternative?: string;
  reasoning: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  process: { title: string; description: string; start?: number; width?: number }[];
  architecture: string;
  architectureDiagrams?: ArchitectureDiagram[];
  impact: string[];
  impactContext?: string;
  researchInsights?: { finding: string; designResponse: string; quote?: string }[];
  challenges?: { title: string; challenge: string; approach: string; learning: string }[];
  stack: string[];
  technicalDecisions: TechnicalDecision[];
  patterns: string[];
  ownership: string[];
  image: string;
  thumbnail?: string;
  appShowcase?: string;
  screenshots?: { src: string; title: string; description: string }[];
  screenshotFormat?: 'mobile' | 'desktop';
  liveUrl?: string;
  repoUrl?: string;
  presentation?: 'case-study' | 'platform';
  hideSource?: boolean;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'ecogiro',
    process: [
      { title: 'Research', description: 'Collector interviews and research insights.', start: 1, width: 40 },
      { title: 'Actors & Flow', description: 'User roles, rewards and recycling habits.', start: 2, width: 25 },
      { title: 'Architecture', description: 'System boundaries, C4, UML, AI and SSE.', start: 4, width: 20 },
      { title: 'Visual Design', description: 'Color palette and look and feel.', start: 5, width: 20 },
      { title: 'Dev & AI', description: 'Frontend, backend and AI integration.', start: 7, width: 40 },
      { title: 'QA & Integration', description: 'Frontend feedback and application integration.', start: 9, width: 30 },
      { title: 'Deploy & Demo', description: 'Docker, Render, Android APK and recorded walkthrough.', start: 10, width: 20 },
    ],
    architecture: 'EcoGiro combines a React and Tailwind CSS interface packaged with Capacitor, a modular NestJS backend and PostgreSQL persistence. Gemini supports image analysis behind a portable AI integration. Server-Sent Events (SSE) deliver notification events to citizens and recovery agents, while a factory centralizes event creation. C4 and UML diagrams document system boundaries, components, interactions and the recovery lifecycle. Docker supports containerization, with services deployed on Render and the mobile demo packaged as an APK.',
    architectureDiagrams: ecogiroArchitecture,
    title: 'EcoGiro',
    repoUrl: 'https://github.com/MateoAponte/ecogiro',
    liveUrl: 'https://ecogiro-1.onrender.com/',
    appShowcase: '/projects/ecogiro/app-showcase.png',
    screenshots: [
      { src: '/projects/ecogiro/screens/home.jpeg', title: 'Home', description: 'Quick access to plastic scanning, eco-points, upcoming pickups and recycling tips.' },
      { src: '/projects/ecogiro/screens/recoveries.jpeg', title: 'Recoveries', description: 'Upcoming requests and pickup history with status, schedule, material details and location.' },
      { src: '/projects/ecogiro/screens/rewards.jpeg', title: 'Rewards', description: 'Eco-points balance, available rewards and progress toward the points required to unlock each benefit.' },
      { src: '/projects/ecogiro/screens/profile.jpeg', title: 'Profile', description: 'Personal information, notification preferences, weekly reminders and support.' },
    ],
    shortDescription: 'Making recycling approachable and waste collectors more visible.',
    fullDescription: 'A hackathon prototype built to recognize the work of waste collectors, support more dignified working conditions and help citizens develop a recycling habit through AI-assisted guidance, pickup coordination and rewards.',
    problem: 'The hackathon challenge was to give waste collectors greater visibility and recognition while making recycling easier to understand and practice. Information gathered from collector interviews informed a citizen-friendly experience intended to connect everyday recycling habits with the people who collect recyclable materials.',
    solution: 'Our team built EcoGiro: a mobile demo where citizens can scan plastic, receive AI-assisted guidance, request a pickup, follow its status and view eco-points and rewards. Recovery agents receive notification events to coordinate requests. The experience brings recycling education, incentives and pickup coordination into one app, with the goal of making participation more approachable and the collectors\' contribution more visible.',
    impactContext: 'EcoGiro was a hackathon demo, not a production rollout. These outcomes describe what we built and demonstrated; effects on recycling habits, collector livelihoods and adoption remain hypotheses that require field validation.',
    researchInsights: [
      {
        finding: 'Research indicated that around 70% of recovery workers were informal.',
        designResponse: 'This finding, gathered during the interview research, helped frame EcoGiro around worker visibility and recognition. It describes the research context, not a representative population estimate.'
      },
      {
        finding: 'Collectors described working without contracts, driven by economic necessity.',
        designResponse: 'The experience gives recovery agents a distinct role in the pickup workflow, rather than treating collection as an anonymous service. Formal employment and improved working conditions remain goals beyond the prototype.'
      },
      {
        finding: 'Interview accounts raised concerns about corruption at collection centers and a lack of recognition for collectors.',
        designResponse: 'These reported concerns reinforced the focus on making collectors visible and connecting them with citizens through explicit pickup requests and status updates. The demo does not establish that these concerns were resolved.'
      },
    ],
    challenges: [
      {
        title: 'Adapting an existing web application to an Android APK',
        challenge: 'The idea evolved from a web application into a mobile APK after the technology stack had been chosen and development was already underway. Mobile storage and permission handling differed from the assumptions in the web implementation.',
        approach: 'We chose Capacitor to carry the established web stack into the mobile app, then adjusted the integration to account for mobile storage and permission behavior.',
        learning: 'Moving a web application into a native shell requires revisiting platform assumptions. Storage behavior and permissions need to be considered explicitly when adapting an existing implementation to mobile.'
      },
      {
        title: 'Making Gemini responses usable by the application',
        challenge: 'The AI integration needed responses in a structured format that the application could consume, with behavior constrained to the recycling experience.',
        approach: 'I used explicit instructions, prompt engineering and structured output formats, keeping Gemini behind a portable AI boundary.',
        learning: 'Treat the AI response format as an integration contract: define the expected structure and behavior alongside the prompts, rather than treating the response as free-form text.'
      },
    ],
    impact: [],
    stack: ['TypeScript', 'NestJS', 'React', 'Docker', 'PostgreSQL', 'Tailwind CSS', 'Capacitor', 'Gemini', 'Render'],
    technicalDecisions: [
      {
        decision: 'Portable Gemini integration with constrained outputs',
        reasoning: 'I integrated Gemini behind a portable AI boundary and used prompt engineering, explicit instructions and structured output formats to constrain its behavior and make responses easier for the application to consume.'
      },
      {
        decision: 'SSE for citizen and recovery agent notifications',
        reasoning: 'I integrated Server-Sent Events to deliver notification events from the backend to citizens and recovery agents as the pickup workflow progressed.'
      },
      {
        decision: 'Factory for notification event creation',
        reasoning: 'I used a factory to centralize notification event creation, keeping event construction consistent and separate from the workflows that trigger notifications.'
      }
    ],
    patterns: ['Repository Pattern', 'Factory Pattern', 'Server-Sent Events (SSE)', 'Modular Architecture', 'Strategy Pattern', 'Component Composition'],
    ownership: [
      'Contributed to research, defined system boundaries and designed the architecture.',
      'Reviewed the frontend as QA and provided feedback on the user experience and behavior.',
      'Developed the backend and integrated the AI services.',
      'Coordinated team responsibilities and helped integrate the application.'
    ],
    image: '/projects/ecogiro/screens/home.jpeg',
    featured: true
  },
  {
    id: 'saas-dashboard',
    process: [
      { title: 'Identify performance bottlenecks', description: 'Slow analytical queries and browser crashes on large tables defined the constraints.' },
      { title: 'Design the data experience', description: 'Connect streaming ingestion, analytical storage and virtualized visualizations.' },
      { title: 'Deliver real-time updates', description: 'Combine delta updates, predictive caching and dynamic windowing.' },
    ],
    architecture: 'A streaming data pipeline feeds ClickHouse for analytical queries. WebSockets deliver incremental updates to the dashboard, while virtualized rendering limits the number of DOM nodes. Predictive caching reduces repeated database work.',
    title: 'SaaS Analytics Dashboard',
    shortDescription: 'Real-time analytics dashboard with interactive visualizations.',
    fullDescription: 'Analytics platform that processes millions of daily events and presents actionable insights in real-time.',
    problem: 'Users were abandoning the existing dashboard due to 8-12 second latency on complex queries. Tables with more than 10k rows crashed the browser.',
    solution: 'I redesigned the data pipeline with streaming processing and an aggressively virtualized frontend. Implemented a predictive caching system based on usage patterns.',
    impact: [
      'Analytics queries reduced from 8s to <200ms',
      'Smooth rendering of 100k+ row datasets',
      'User retention increased by 40%',
      'Main database load reduced by 70%'
    ],
    stack: ['TypeScript', 'Next.js', 'GraphQL', 'ClickHouse', 'Apache Kafka', 'D3.js'],
    technicalDecisions: [
      {
        decision: 'ClickHouse as analytical data warehouse',
        alternative: 'PostgreSQL with materialized views',
        reasoning: 'We needed sub-second OLAP queries over billions of events. ClickHouse offered 50x better performance for our columnar access patterns.'
      },
      {
        decision: 'WebSockets with delta updates',
        alternative: 'Polling with cache invalidation',
        reasoning: 'Dashboards required real-time updates. Delta updates reduced bandwidth by 95% compared to full refetch.'
      },
      {
        decision: 'Virtualization with dynamic windowing',
        alternative: 'Traditional pagination',
        reasoning: 'Users needed smooth scrolling over complete datasets without losing context. Virtualization kept DOM under 200 nodes even with 100k rows.'
      }
    ],
    patterns: ['Streaming ETL', 'CQRS', 'Materialized Views', 'Delta Sync', 'Virtual Scrolling'],
    ownership: [
      'Designed data architecture from ingestion to visualization',
      'Defined performance and monitoring standards',
      'Standardized the visual component system',
      'Participated in product decisions on data UX'
    ],
    image: '/placeholder.svg',
    featured: true
  },
  {
    id: 'cpaas',
    title: 'CPaaS',
    presentation: 'platform',
    hideSource: true,
    liveUrl: 'https://init.oceanplatform.io/login',
    shortDescription: 'One login and a unified dashboard for four companies.',
    fullDescription: 'I designed and built the main dashboard and unified login experience for a Communications Platform as a Service, bringing four companies into a shared interface.',
    problem: 'The challenge was to unify the login experiences and dashboards of four different companies into one coherent product experience.',
    solution: 'I designed and implemented a unified login and main dashboard. The interface brings access, channel navigation and operational information together, with dashboard views for communication services and a shared password recovery experience.',
    process: [
      { title: 'Define the Shared Experience', description: 'Frame the challenge of bringing four company experiences into one interface.' },
      { title: 'Interface Design', description: 'Design the unified login and main dashboard.' },
      { title: 'Frontend Implementation', description: 'Build the dashboard and unified login experience.' },
    ],
    ownership: [
      'Designed the main dashboard and unified login interface.',
      'Implemented the main dashboard and unified login experience.',
      'Worked on consolidating four company experiences into one interface.',
    ],
    technicalDecisions: [
      { decision: 'A unified login experience', reasoning: 'Bring access for four companies into a common interface, giving users a shared entry point.' },
      { decision: 'A shared dashboard with service-specific views', reasoning: 'Use a common dashboard structure to bring communication services into one place while retaining their distinct operational views.' },
    ],
    architecture: 'The frontend experience centers on a unified entry point and a main dashboard with service-specific views. The supplied screens show login, password recovery, channel navigation, operational summaries, campaign tables and notifications.',
    challenges: [
      {
        title: 'Unifying four companies into one product experience',
        challenge: 'The login flows and dashboards of four different companies had to come together in one interface.',
        approach: 'I designed and built the unified login and main dashboard, establishing a common entry point and shared dashboard experience.',
        learning: 'A unified product experience needs consistency at both entry and navigation: login and dashboard design must be considered together.',
      },
    ],
    impactContext: 'CPaaS is a deployed platform. This overview focuses on my interface design and implementation work; detailed project information and impact metrics will be added later.',
    impact: ['Designed and built a unified login and main dashboard spanning four company experiences.'],
    stack: [],
    patterns: [],
    image: '/projects/cpaas/screens/sms-dashboard.png',
    thumbnail: '/projects/cpaas/thumbnail.png',
    screenshotFormat: 'desktop',
    screenshots: [
      { src: '/projects/cpaas/screens/login.png', title: 'Unified Login', description: 'A shared entry point with guidance for existing company accounts.' },
      { src: '/projects/cpaas/screens/password-recovery.png', title: 'Password Recovery', description: 'A common recovery screen supporting username or email identification.' },
      { src: '/projects/cpaas/screens/sms-dashboard.png', title: 'SMS Dashboard', description: 'Channel navigation, direct access, credit summaries and sending statistics.' },
      { src: '/projects/cpaas/screens/voice-dashboard.png', title: 'Voice Dashboard', description: 'Voice-specific shortcuts, credit information and sending summaries.' },
      { src: '/projects/cpaas/screens/transactional-hub.png', title: 'Transactional Hub', description: 'Direct access to flows, templates, services and reporting.' },
      { src: '/projects/cpaas/screens/notifications.png', title: 'Notifications', description: 'A notification panel alongside the unified dashboard.' },
      { src: '/projects/cpaas/screens/scheduled-campaigns.png', title: 'Scheduled Campaigns', description: 'Campaign tables with scheduling information and contextual actions.' },
      { src: '/projects/cpaas/screens/pending-campaigns.png', title: 'Campaign Confirmation', description: 'Campaigns awaiting confirmation with contextual management actions.' },
    ],
    featured: true,
  }
];
