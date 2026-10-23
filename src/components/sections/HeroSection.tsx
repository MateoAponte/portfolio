import { ArrowDown, ArrowRight } from 'lucide-react';

import { HeroParallax } from '@/components/HeroParallax';

export const HeroSection = () => (
  <section id="home" aria-labelledby="hero-heading" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-background">
    <HeroParallax />
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,hsl(var(--background)/0.98)_0%,hsl(var(--background)/0.9)_30%,hsl(var(--background)/0.4)_60%,hsl(var(--background)/0.12)_100%)] max-lg:bg-background/75" />
    <div className="container relative mx-auto px-6 pb-24 pt-32 sm:px-10 lg:py-28 xl:px-16">
      <div className="max-w-xl xl:max-w-2xl">
        <p className="mb-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
          <span aria-hidden="true" className="h-px w-10 bg-primary/40" /><span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />Hi, I'm Mateo
        </p>
        <h1 id="hero-heading" className="text-4xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
          I build<span className="gradient-text mt-1 block">scalable products</span><span className="mt-1 block">with clean architecture.</span>
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          Fullstack developer focused on building reliable, maintainable and user-centered solutions.
          <span className="mt-2 block">I enjoy turning complex problems into simple, well-designed systems.</span>
        </p>
        <div className="mt-9 flex flex-wrap gap-4 sm:mt-10">
          <a href="#portfolio" className="btn-primary min-w-44 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">See my work<ArrowRight size={18} /></a>
          <a href="#approach" className="btn-secondary min-w-40 border-primary/50 bg-background/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">Learn more<ArrowDown size={16} /></a>
        </div>
      </div>
    </div>
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
  </section>
);
