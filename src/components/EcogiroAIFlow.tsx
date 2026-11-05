import { Camera, Sparkles, Smartphone, ArrowRight } from 'lucide-react';

const stages = [
  {
    icon: Camera,
    title: 'Scan plastic',
    description:
      'The citizen submits a photo from the mobile app for analysis.',
  },
  {
    icon: Sparkles,
    title: 'Constrain the response',
    description:
      'Gemini analyzes the image behind a portable backend integration. Prompts and structured output formats define the expected response.',
  },
  {
    icon: Smartphone,
    title: 'Guide the next action',
    description:
      'The app presents recycling guidance and connects the citizen to the pickup request workflow.',
  },
];

export const EcogiroAIFlow = () => (
  <figure
    className="detail-border-feedback mt-8 rounded-2xl border border-transparent bg-secondary/30 p-5 sm:p-7"
    aria-labelledby="ecogiro-ai-caption"
  >
    <figcaption
      id="ecogiro-ai-caption"
      className="text-xl font-semibold text-foreground"
    >
      From a photo to recycling guidance
    </figcaption>
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
      My work connected Gemini to the NestJS backend and defined how its
      responses could be consumed by the app.
    </p>
    <ol className="mt-6 grid gap-5 sm:grid-cols-3">
      {stages.map(({ icon: Icon, title, description }, index) => (
        <li key={title} className="min-w-0">
          <div className="mb-3 flex items-center justify-between text-primary">
            <Icon size={22} aria-hidden="true" />
            {index < stages.length - 1 && (
              <ArrowRight
                size={18}
                className="hidden sm:block"
                aria-hidden="true"
              />
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </li>
      ))}
    </ol>
  </figure>
);
