import { Children, useEffect, useState, type ReactNode } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

export const ProjectCardCarousel = ({ label, children }: { label: string; children: ReactNode }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [position, setPosition] = useState({ current: 1, total: 1 });

  useEffect(() => {
    if (!api) return;
    const update = () => setPosition({ current: api.selectedScrollSnap() + 1, total: api.scrollSnapList().length });
    update();
    api.on('select', update);
    api.on('reInit', update);
    return () => {
      api.off('select', update);
      api.off('reInit', update);
    };
  }, [api]);

  return (
  <Carousel setApi={setApi} opts={{ align: 'start' }} aria-label={label} className="min-w-0">
    <CarouselContent className="-ml-4 items-stretch">
      {Children.toArray(children).map((child, index) => (
        <CarouselItem key={index} className="basis-[92%] pl-4 sm:basis-full xl:basis-1/2 [&>*]:h-full">
          {child}
        </CarouselItem>
      ))}
    </CarouselContent>
    <div className="mt-4 flex items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground">Swipe or use the arrows to explore</p>
      <div className="flex gap-2">
        <p role="status" aria-live="polite" aria-atomic="true" className="mr-2 flex items-center gap-1 text-sm tabular-nums text-primary">
          <span className="sr-only">Position </span>{position.current}<span className="text-muted-foreground">/</span>{position.total}
        </p>
        <CarouselPrevious className="static h-11 w-11 translate-y-0" />
        <CarouselNext className="static h-11 w-11 translate-y-0" />
      </div>
    </div>
  </Carousel>
  );
};
