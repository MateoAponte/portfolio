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
  summary?: { role: string; scope: string; duration?: string; status: string };
  problem: string;
  solution: string;
  process: {
    title: string;
    description: string;
    category?: 'Discovery' | 'Design' | 'Delivery';
    start?: number;
    width?: number;
  }[];
  architecture: string;
  architectureDiagrams?: ArchitectureDiagram[];
  impact: string[];
  impactContext?: string;
  researchInsights?: {
    finding: string;
    designResponse: string;
    quote?: string;
  }[];
  challenges?: {
    title: string;
    challenge: string;
    approach: string;
    learning: string;
  }[];
  stack: string[];
  technicalDecisions: TechnicalDecision[];
  patterns: string[];
  roleIntro?: string;
  ownership: (string | { title: string; description: string })[];
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
  hidden?: boolean;
}

export const projects: Project[] = [
  {
    id: 'ecogiro',
    summary: { role: 'Backend, AI integration & architecture', scope: 'Recycling mobile prototype', duration: '3 months', status: 'Hackathon demo' },
    process: [
      {
        title: 'Research',
        category: 'Discovery',
        description: 'Collector interviews and research insights.',
        start: 1,
        width: 40,
      },
      {
        title: 'Actors & Flow',
        category: 'Discovery',
        description: 'User roles, rewards and recycling habits.',
        start: 2,
        width: 25,
      },
      {
        title: 'Architecture',
        category: 'Design',
        description: 'System boundaries, C4, UML, AI and SSE.',
        start: 4,
        width: 20,
      },
      {
        title: 'Visual Design',
        category: 'Design',
        description: 'Color palette and look and feel.',
        start: 5,
        width: 20,
      },
      {
        title: 'Dev & AI',
        category: 'Delivery',
        description: 'Frontend, backend and AI integration.',
        start: 7,
        width: 40,
      },
      {
        title: 'QA & Integration',
        category: 'Delivery',
        description: 'Frontend feedback and application integration.',
        start: 9,
        width: 30,
      },
      {
        title: 'Deploy & Demo',
        category: 'Delivery',
        description: 'Docker, Render, Android APK and recorded walkthrough.',
        start: 10,
        width: 20,
      },
    ],
    architecture:
      'EcoGiro combines a React and Tailwind CSS interface packaged with Capacitor, a modular NestJS backend and PostgreSQL persistence. Gemini supports image analysis behind a portable AI integration. Server-Sent Events (SSE) deliver notification events to citizens and recovery agents, while a factory centralizes event creation. C4 and UML diagrams document system boundaries, components, interactions and the recovery lifecycle. Docker supports containerization, with services deployed on Render and the mobile demo packaged as an APK.',
    architectureDiagrams: ecogiroArchitecture,
    title: 'EcoGiro',
    repoUrl: 'https://github.com/MateoAponte/ecogiro',
    liveUrl: 'https://ecogiro-1.onrender.com/',
    appShowcase: '/projects/ecogiro/app-showcase.png',
    screenshots: [
      {
        src: '/projects/ecogiro/screens/home.jpeg',
        title: 'Home',
        description:
          'Quick access to plastic scanning, eco-points, upcoming pickups and recycling tips.',
      },
      {
        src: '/projects/ecogiro/screens/recoveries.jpeg',
        title: 'Recoveries',
        description:
          'Upcoming requests and pickup history with status, schedule, material details and location.',
      },
      {
        src: '/projects/ecogiro/screens/rewards.jpeg',
        title: 'Rewards',
        description:
          'Eco-points balance, available rewards and progress toward the points required to unlock each benefit.',
      },
      {
        src: '/projects/ecogiro/screens/profile.jpeg',
        title: 'Profile',
        description:
          'Personal information, notification preferences, weekly reminders and support.',
      },
    ],
    shortDescription:
      'I designed the architecture and built the backend and AI integration for a mobile recycling prototype.',
    fullDescription:
      'Prototype built to recognize the work of waste collectors, support more dignified working conditions and help citizens develop a recycling habit through AI-assisted guidance, pickup coordination and rewards.',
    problem:
      'The challenge was to give waste collectors greater visibility and recognition while making recycling easier to understand and practice. Information gathered from collector interviews informed a citizen-friendly experience intended to connect everyday recycling habits with the people who collect recyclable materials.',
    solution:
      "Our team built EcoGiro: A mobile demo where citizens can scan plastic, receive AI-assisted guidance, request a pickup, follow its status and view eco-points and rewards. Recovery agents receive notification events to coordinate requests. The experience brings recycling education, incentives and pickup coordination into one app, with the goal of making participation more approachable and the collectors' contribution more visible.",
    impactContext:
      'EcoGiro was a hackathon demo, not a production rollout. These outcomes describe what we built and demonstrated; effects on recycling habits, collector livelihoods and adoption remain hypotheses that require field validation.',
    researchInsights: [
      {
        finding:
          'Research indicated that around 70% of recovery workers were informal.',
        designResponse:
          'This finding, gathered during the interview research, helped frame EcoGiro around worker visibility and recognition. It describes the research context, not a representative population estimate.',
      },
      {
        finding:
          'Collectors described working without contracts, driven by economic necessity.',
        designResponse:
          'The experience gives recovery agents a distinct role in the pickup workflow, rather than treating collection as an anonymous service. Formal employment and improved working conditions remain goals beyond the prototype.',
      },
      {
        finding:
          'Interview accounts raised concerns about corruption at collection centers and a lack of recognition for collectors.',
        designResponse:
          'These reported concerns reinforced the focus on making collectors visible and connecting them with citizens through explicit pickup requests and status updates. The demo does not establish that these concerns were resolved.',
      },
    ],
    challenges: [
      {
        title: 'Adapting an existing web application to an Android APK',
        challenge:
          'The idea evolved from a web application into a mobile APK after the technology stack had been chosen and development was already underway. Mobile storage and permission handling differed from the assumptions in the web implementation.',
        approach:
          'We chose Capacitor to carry the established web stack into the mobile app, then adjusted the integration to account for mobile storage and permission behavior.',
        learning:
          'Moving a web application into a native shell requires revisiting platform assumptions. Storage behavior and permissions need to be considered explicitly when adapting an existing implementation to mobile.',
      },
      {
        title: 'Making Gemini responses usable by the application',
        challenge:
          'The AI integration needed responses in a structured format that the application could consume, with behavior constrained to the recycling experience.',
        approach:
          'I used explicit instructions, prompt engineering and structured output formats, keeping Gemini behind a portable AI boundary.',
        learning:
          'Treat the AI response format as an integration contract: define the expected structure and behavior alongside the prompts, rather than treating the response as free-form text.',
      },
    ],
    impact: [],
    stack: [
      'TypeScript',
      'NestJS',
      'React',
      'Docker',
      'PostgreSQL',
      'Tailwind CSS',
      'Capacitor',
      'Gemini',
      'Render',
    ],
    technicalDecisions: [
      {
        decision: 'Portable Gemini integration with constrained outputs',
        reasoning:
          'I integrated Gemini behind a portable AI boundary and used prompt engineering, explicit instructions and structured output formats to constrain its behavior and make responses easier for the application to consume.',
      },
      {
        decision: 'SSE for citizen and recovery agent notifications',
        reasoning:
          'I integrated Server-Sent Events to deliver notification events from the backend to citizens and recovery agents as the pickup workflow progressed.',
      },
      {
        decision: 'Factory for notification event creation',
        reasoning:
          'I used a factory to centralize notification event creation, keeping event construction consistent and separate from the workflows that trigger notifications.',
      },
    ],
    patterns: [
      'Repository Pattern',
      'Factory Pattern',
      'Server-Sent Events (SSE)',
      'Modular Architecture',
      'Strategy Pattern',
      'Component Composition',
    ],
    roleIntro: 'I connected the system design, backend and AI integration, helping the team bring the mobile prototype together.',
    ownership: [
      { title: 'Research & architecture', description: 'Contributed to research, defined system boundaries and designed the architecture.' },
      { title: 'Frontend QA', description: 'Reviewed the frontend and provided feedback on user experience and behavior.' },
      { title: 'Backend & AI', description: 'Developed the backend and integrated the AI services.' },
      { title: 'Team coordination', description: 'Coordinated responsibilities and helped integrate the application.' },
    ],
    image: '/projects/ecogiro/screens/home.jpeg',
    featured: true,
  },
  {
    id: 'saas-dashboard',
    hidden: true,
    process: [
      {
        title: 'Identify performance bottlenecks',
        category: 'Discovery',
        description:
          'Slow analytical queries and browser crashes on large tables defined the constraints.',
      },
      {
        title: 'Design the data experience',
        category: 'Design',
        description:
          'Connect streaming ingestion, analytical storage and virtualized visualizations.',
      },
      {
        title: 'Deliver real-time updates',
        category: 'Delivery',
        description:
          'Combine delta updates, predictive caching and dynamic windowing.',
      },
    ],
    architecture:
      'A streaming data pipeline feeds ClickHouse for analytical queries. WebSockets deliver incremental updates to the dashboard, while virtualized rendering limits the number of DOM nodes. Predictive caching reduces repeated database work.',
    title: 'SaaS Analytics Dashboard',
    shortDescription:
      'I designed the data pipeline and virtualized frontend for a real-time analytics dashboard.',
    fullDescription:
      'Analytics platform that processes millions of daily events and presents actionable insights in real-time.',
    problem:
      'Users were abandoning the existing dashboard due to 8-12 second latency on complex queries. Tables with more than 10k rows crashed the browser.',
    solution:
      'I redesigned the data pipeline with streaming processing and an aggressively virtualized frontend. Implemented a predictive caching system based on usage patterns.',
    impact: [
      'Analytics queries reduced from 8s to <200ms',
      'Smooth rendering of 100k+ row datasets',
      'User retention increased by 40%',
      'Main database load reduced by 70%',
    ],
    stack: [
      'TypeScript',
      'Next.js',
      'GraphQL',
      'ClickHouse',
      'Apache Kafka',
      'D3.js',
    ],
    technicalDecisions: [
      {
        decision: 'ClickHouse as analytical data warehouse',
        alternative: 'PostgreSQL with materialized views',
        reasoning:
          'We needed sub-second OLAP queries over billions of events. ClickHouse offered 50x better performance for our columnar access patterns.',
      },
      {
        decision: 'WebSockets with delta updates',
        alternative: 'Polling with cache invalidation',
        reasoning:
          'Dashboards required real-time updates. Delta updates reduced bandwidth by 95% compared to full refetch.',
      },
      {
        decision: 'Virtualization with dynamic windowing',
        alternative: 'Traditional pagination',
        reasoning:
          'Users needed smooth scrolling over complete datasets without losing context. Virtualization kept DOM under 200 nodes even with 100k rows.',
      },
    ],
    patterns: [
      'Streaming ETL',
      'CQRS',
      'Materialized Views',
      'Delta Sync',
      'Virtual Scrolling',
    ],
    ownership: [
      'Designed data architecture from ingestion to visualization',
      'Defined performance and monitoring standards',
      'Standardized the visual component system',
      'Participated in product decisions on data UX',
    ],
    image: '/placeholder.svg',
    featured: true,
  },
  {
    id: "cpaas",
    summary: { role: 'Login & home microfrontend development', scope: 'Shared access & configurable dashboard', duration: '1 year', status: 'Production platform' },
    title: "CPaaS - MicroFront",
    presentation: "platform",
    hideSource: true,
    liveUrl: "https://init.oceanplatform.io/login",
    shortDescription: "I built the shared login and configurable dashboard for a CPaaS unifying three companies through microfrontends.",
    fullDescription: "I owned the delivery of the login and home microfrontends, from planning and flow diagrams to implementation, testing and documentation. I also helped set up the microfrontend infrastructure so existing products could share one platform while remaining separate applications.",
    problem: "Three companies needed to bring their platforms and processes into one CPaaS. The infrastructure direction was already taking shape when I joined. My task was to turn that direction into a working entry point and dashboard, with authentication flows and product-specific overviews that could fit into a shared experience.",
    solution: "I built two Vue.js microfrontends: a shared login and a configurable home dashboard. Each ran as a single-page application within an orchestrated platform. The login covered sign-in, password recovery, OTP and error views, with a URL-based error identification mechanism. For the home, I created shared layout and widget guidelines so products could configure tables, charts and custom overviews. I also implemented frontend notifications and helped set up the supporting infrastructure.",
    process: [
      {
        "title": "Scope and delivery plan",
        category: 'Discovery',
        "description": "Review the existing infrastructure and delivery goals. Break the work into design, implementation, testing, documentation and iterations, then organize tasks and sprints in Notion.",
        "start": 1,
        "width": 45
      },
      {
        "title": "Login and home foundations",
        category: 'Design',
        "description": "Create the two microfrontend projects and help connect them to the orchestrator and AWS infrastructure.",
        "start": 2,
        "width": 45
      },
      {
        "title": "Authentication flows",
        category: 'Delivery',
        "description": "Diagram and implement login, password recovery, OTP and error views, followed by the shared URL-based error identification mechanism.",
        "start": 3,
        "width": 45
      },
      {
        "title": "Tests and guidelines",
        category: 'Delivery',
        "description": "Set up Vitest unit tests and Playwright integration tests, with fixtures and guidelines for extending the test suite.",
        "start": 5,
        "width": 45
      },
      {
        "title": "Configurable dashboard",
        category: 'Design',
        "description": "Identify stakeholders, check product combinations against the designs, then build layouts and configurable widgets for tables, charts and custom overviews.",
        "start": 7,
        "width": 40
      },
      {
        "title": "Integration and iterations",
        category: 'Delivery',
        "description": "Add frontend notifications, integrate encryption with the backend and iterate on the experience within the agreed deadline.",
        "start": 9,
        "width": 30
      }
    ],
    roleIntro: 'I owned delivery of the shared login and home microfrontends, from planning and implementation to testing and integration.',
    ownership: [
      { title: 'Delivery planning', description: 'Planned my sprints in Notion against an agreed deadline, including testing, documentation and iterations.' },
      { title: 'Microfrontend development', description: 'Built the Vue.js login and home applications and helped set up their infrastructure and orchestration.' },
      { title: 'Authentication flows', description: 'Diagrammed and implemented sign-in, password recovery, OTP and error flows.' },
      { title: 'Dashboard foundations', description: 'Created the shared layout and configurable widgets for product-specific overviews.' },
      { title: 'Testing foundation', description: 'Set up Vitest and Playwright tests, reusable fixtures and team testing guidelines.' },
      { title: 'Backend integration', description: 'Implemented frontend notifications and coordinated application-level encryption with the backend.' }
    ],
    technicalDecisions: [
      {
        "decision": "Separate SPAs under a shared orchestrator",
        "reasoning": "The platform needed a common entry point while keeping product applications separate. I built the login and home as individual SPAs and helped integrate them with the orchestrator, following the existing microfrontend direction."
      },
      {
        "decision": "Playwright integration tests with reusable fixtures",
        "reasoning": "Authentication involved several connected paths, including recovery, OTP and errors. I introduced fixtures and a testing guideline so shared setup could be reused as coverage grew. Vitest covered unit-level behavior."
      },
      {
        "decision": "A configurable layout and widget system",
        "reasoning": "Products needed different combinations of tables, charts and overviews. I built a shared structure with configurable widgets and design guidelines so those combinations could vary within a consistent dashboard experience."
      },
      {
        "decision": "A shared URL-based error identification mechanism",
        "reasoning": "The authentication flows needed to handle errors passed through URLs. I added a common identification mechanism and error views that could be extended as new cases appeared."
      },
      {
        "decision": "AES integration coordinated with the backend",
        "reasoning": "I implemented application-level encryption as part of the frontend-backend integration. Its behavior had to align with the backend contract so both sides could process the exchanged data."
      }
    ],
    architecture: "An orchestrator brings the login, home and product microfrontends into a shared CPaaS. Each microfrontend is a separate SPA; I built the login and home in Vue.js and helped set up the AWS and S3 infrastructure. The login owns authentication and recovery flows, including OTP and error handling. The home provides common layout rules and configurable widgets for product-specific overviews, along with frontend notifications. Vitest supports unit tests and Playwright covers integration flows. AES encryption is coordinated with the backend as part of the application integration.",
    challenges: [
      {
        "title": "Owning delivery for the first time",
        "challenge": "This was my first self-managed project. I had freedom to choose technologies and organize the work, with an agreed deadline to meet.",
        "approach": "I broke the scope into tasks in Notion and planned my own sprints. I included testing, documentation and design iterations alongside feature implementation.",
        "learning": "Delivery planning needs to include the work around a feature, especially integration and testing. Making those responsibilities explicit helped me organize the project."
      },
      {
        "title": "Keeping a shared dashboard flexible",
        "challenge": "Products from different companies needed different overviews within the same home experience.",
        "approach": "I checked stakeholder needs and design combinations before creating shared layout rules and configurable widgets for tables, charts and custom content.",
        "learning": "Separating common layout rules from product configuration gives teams room to adapt the dashboard while preserving a consistent experience."
      },
      {
        "title": "Covering connected authentication paths",
        "challenge": "Login, recovery, OTP and URL-based errors had to work as connected flows rather than isolated screens.",
        "approach": "I diagrammed each interaction, added a shared error identification mechanism and organized Vitest and Playwright coverage with reusable fixtures.",
        "learning": "Flow diagrams and shared test setup make the transitions between authentication screens easier to reason about and verify."
      }
    ],
    impactContext: "Platform activity recorded in Sentry audit logs included more than 2,500 users logging in daily. Over one year, the platform migrated more than 500,000 users and added 600 new users. These figures describe platform activity; my contribution focused on the shared login, configurable home, tests and microfrontend integration.",
    impact: [
      "2,500+ users logging in daily.",
      "500,000+ users migrated over one year.",
      "600 new users added over one year."
    ],
    stack: [
      "Vue.js",
      "Vitest",
      "Playwright",
      "AWS MicroFronts",
      "S3",
      "Notion",
      "SPA",
      "AES"
    ],
    patterns: [
      "Microfrontend Architecture",
      "Single-Page Application (SPA)",
      "Application Shell / Orchestrator",
      "Configuration-Driven UI",
      "Component Composition",
      "Reusable Test Fixtures"
    ],
    image: '/projects/cpaas/screens/sms-dashboard.png',
    thumbnail: '/projects/cpaas/thumbnail.png',
    screenshotFormat: 'desktop',
    screenshots: [
      {
        src: '/projects/cpaas/screens/login.png',
        title: 'Unified Login',
        description:
          'A shared entry point with guidance for existing company accounts.',
      },
      {
        src: '/projects/cpaas/screens/password-recovery.png',
        title: 'Password Recovery',
        description:
          'A common recovery screen supporting username or email identification.',
      },
      {
        src: '/projects/cpaas/screens/sms-dashboard.png',
        title: 'SMS Dashboard',
        description:
          'Channel navigation, direct access, credit summaries and sending statistics.',
      },
      {
        src: '/projects/cpaas/screens/voice-dashboard.png',
        title: 'Voice Dashboard',
        description:
          'Voice-specific shortcuts, credit information and sending summaries.',
      },
      {
        src: '/projects/cpaas/screens/transactional-hub.png',
        title: 'Transactional Hub',
        description:
          'Direct access to flows, templates, services and reporting.',
      },
      {
        src: '/projects/cpaas/screens/notifications.png',
        title: 'Notifications',
        description: 'A notification panel alongside the unified dashboard.',
      },
      {
        src: '/projects/cpaas/screens/scheduled-campaigns.png',
        title: 'Scheduled Campaigns',
        description:
          'Campaign tables with scheduling information and contextual actions.',
      },
      {
        src: '/projects/cpaas/screens/pending-campaigns.png',
        title: 'Campaign Confirmation',
        description:
          'Campaigns awaiting confirmation with contextual management actions.',
      },
    ],
    featured: true,
  },
];
