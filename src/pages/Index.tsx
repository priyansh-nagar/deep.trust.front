import Navbar from "@/components/Navbar";
import HeroReveal from "@/components/HeroReveal";
import HeroQuote from "@/components/HeroQuote";
import FeaturesGrid from "@/components/FeaturesGrid";
import DiagnosticLens from "@/components/DiagnosticLens";
import HowItWorks from "@/components/HowItWorks";
import StatsSection from "@/components/StatsSection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroReveal />
    <HeroQuote />
    <FeaturesGrid />
    <DiagnosticLens />
    <HowItWorks />
    <StatsSection />
    <FooterSection />
  </div>
);

export default Index;
