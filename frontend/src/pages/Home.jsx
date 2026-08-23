import Hero from '../components/sections/Hero';
import LogoCloud from '../components/sections/LogoCloud';
import FeatureGrid from '../components/sections/FeatureGrid';
import HowItWorks from '../components/sections/HowItWorks';
import IndustryCards from '../components/sections/IndustryCards';
import VoiceDemo from '../components/sections/VoiceDemo';
import DashboardPreview from '../components/sections/DashboardPreview';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';
import PageTransition from '../components/layout/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <LogoCloud />
      <FeatureGrid />
      <HowItWorks />
      <IndustryCards />
      <VoiceDemo />
      <DashboardPreview />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </PageTransition>
  );
}
