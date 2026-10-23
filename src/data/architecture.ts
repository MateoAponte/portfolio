export interface ArchitectureDiagram {
  id: string;
  title: string;
  category: string;
  src: string;
  description: string;
}

export const ecogiroArchitecture: ArchitectureDiagram[] = [
  { id: 'context', title: 'System context', category: 'C4 / Level 1', description: 'Defines the platform boundary, citizens and recovery agents, and the external image analysis and notification systems.' },
  { id: 'containers', title: 'Application containers', category: 'C4 / Level 2', description: 'Plans a React and Capacitor interface, a NestJS API and PostgreSQL storage. The backend connects to external image analysis and email notification services.' },
  { id: 'components', title: 'Backend components', category: 'C4 / Level 3', description: 'Separates authentication, users, recoveries, medals, rewards and notifications. Shared security validates roles and JWTs. Modules should not access each other\'s database tables.' },
  { id: 'sequence', title: 'From image scan to rewards', category: 'UML / Sequence', description: 'Traces messages between the citizen, app, backend, notifications, loyalty program and recovery agent. Covers invalid images, request creation, acceptance, pickup confirmation and loyalty updates.' },
  { id: 'recovery-states', title: 'Recovery lifecycle', category: 'UML / State machine', description: 'Models CREATED, PENDING, ASSIGNED, COMPLETED, CANCELED and EXPIRED. Requests expire after three days pending without acceptance. Assignment prevents other agents from accepting or canceling the same request.' },
  { id: 'scan-image', title: 'Image scanning and recovery request', category: 'UML / Activity', description: 'Maps image validation, recycling guidance and request creation. Invalid images return to scanning; suspicious waste triggers an alert path. Successful pickup confirmation leads to points or medals.' },
  { id: 'recoveries', title: 'Recovery agent workflow', category: 'UML / Activity', description: 'Shows nearby requests, acceptance or rejection, exclusive assignment, cancellation and comment notifications. Completion follows pickup and external confirmation.' },
  { id: 'manage-recoveries', title: 'Citizen request management', category: 'UML / Activity', description: 'Maps actions by status: pending or assigned requests allow editing, removal and comments. Completed requests expose their details and allow rating the recovery agent.' },
  { id: 'points-benefits', title: 'Points and benefits', category: 'UML / Activity', description: 'Citizens review benefits or redeem points. Redemption requires confirmation and sends an email; declining returns to the points and benefits view.' },
  { id: 'profile', title: 'Profile and account navigation', category: 'UML / Activity', description: 'Outlines profile access, personal information editing and saving, and navigation to FAQs or other account sections. After saving, users can return to their profile or finish the flow.' },
].map(diagram => ({ ...diagram, src: `/projects/ecogiro/architecture/${diagram.id}.jpg` }));
