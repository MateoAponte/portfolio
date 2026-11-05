import { BotanicalAtmosphere } from '@/components/BotanicalAtmosphere';
import { HomeNavigation } from '@/components/layout/HomeNavigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ApproachSection } from '@/components/sections/ApproachSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { LeafDivider } from '@/components/BotanicalContours';

const SectionDivider = ({ desktopOnly = false }: { desktopOnly?: boolean }) => (
  <div aria-hidden="true" className={`pointer-events-none relative z-20 mx-6 h-0 ${desktopOnly ? 'hidden md:block' : ''}`}>
    <LeafDivider className="left-1/2 top-0 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 text-[#a5ad80]/60" />
  </div>
);

const Index = () => {
  return (
    <div className="nature-main min-h-screen bg-background lg:pl-36 xl:pl-44 [&_main>section]:scroll-mt-32 sm:[&_main>section]:scroll-mt-24 lg:[&_main>section]:scroll-mt-0">
      <HomeNavigation />
      <main className="relative isolate">
        <BotanicalAtmosphere />
        <HeroSection />
        <PortfolioSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider desktopOnly />
        <ApproachSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
