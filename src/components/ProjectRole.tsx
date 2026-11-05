import type { Project } from '@/data/projects';

export const ProjectRole = ({ project }: { project: Project }) => (
  <div className="detail-border-feedback rounded-2xl border border-transparent bg-secondary/40 p-6 sm:p-8 lg:p-10">
    <dl className={`grid gap-x-10 gap-y-7 sm:grid-cols-2`}>
      {project.ownership.map((item) =>
        typeof item === 'string' ? (
          <div key={item}>
            <dt className="sr-only">Contribution</dt>
            <dd className="text-base leading-relaxed text-foreground">
              {item}
            </dd>
          </div>
        ) : (
          <div key={item.title}>
            <dt className="text-lg font-semibold leading-snug text-primary">
              {item.title}
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
              {item.description}
            </dd>
          </div>
        ),
      )}
    </dl>
  </div>
);
