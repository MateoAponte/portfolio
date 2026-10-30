import { ArrowDown, ArrowRight } from 'lucide-react';
import { HeroParallax } from '@/components/HeroParallax';
import { BranchHero } from '@/components/BotanicalContours';

export const HeroSection = () => (
  <section id="home" aria-labelledby="hero-heading" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-background text-[#f0f3eb]">
    <HeroParallax />
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,22,20,.98)_0%,rgba(10,22,20,.88)_32%,rgba(10,22,20,.35)_65%,rgba(10,22,20,.1)_100%)] max-lg:bg-[#0a1614]/75" />
    <BranchHero className="-left-32 top-4 -z-10 h-[560px] w-[460px] text-[#a5ad80]/35 sm:-left-20" />
    <div className="container relative mx-auto px-6 pb-20 pt-40 sm:px-10 sm:pt-32 lg:py-28 xl:px-16">
      <div className="max-w-xl motion-safe:animate-fade-up">
        <h1 id="hero-heading" className="text-[clamp(3.5rem,6vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] [text-wrap:balance]">Full-stack developer.</h1>
        <p className="mt-8 text-xl font-semibold leading-snug text-[#d3dfc5] sm:text-2xl">Hi, I’m Mateo Aponte.</p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[#c1cdc5] sm:text-lg [text-wrap:pretty]">I enjoy building applications people want to use and developers can keep improving. My work spans interfaces, backend services, infrastructure, system architecture and AI integration.</p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[#c1cdc5] sm:text-lg [text-wrap:pretty]">Working in IT has taken me from support to system design and project leadership. That experience shapes how I listen, collaborate and connect technical decisions to the people affected by them.</p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[#c1cdc5] sm:text-lg [text-wrap:pretty]">I question assumptions and explore alternatives. <strong className="font-semibold text-[#f0f3eb]">Every choice comes with trade-offs; I want to understand why it fits, what it costs and how it affects the user experience.</strong></p>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
          <a href="#portfolio" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[var(--nature-cta)] py-3 pl-6 pr-[22px] font-semibold text-[#0a1614] transition-[background-color,transform] duration-150 hover:bg-[#dfad55] active:bg-[#e3b45d] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9cba3] motion-reduce:transform-none motion-reduce:transition-none">View projects<ArrowRight size={18} aria-hidden="true" /></a>
          <a href="#approach" className="inline-flex min-h-12 items-center gap-2 font-medium text-[#f0f3eb] underline-offset-4 transition-colors duration-150 hover:text-[var(--nature-link)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9cba3]">How I work<ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </div>
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#101c19] to-transparent" />
  </section>
);
