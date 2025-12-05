import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { InvestmentPlans } from "@/components/InvestmentPlans";
import { ROICalculator } from "@/components/ROICalculator";
import { LiveMarkets } from "@/components/LiveMarkets";
import { Testimonials } from "@/components/Testimonials";
import { SecuritySection } from "@/components/SecuritySection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <InvestmentPlans />
      <ROICalculator />
      <LiveMarkets />
      <Testimonials />
      <SecuritySection />
      <WhyChooseUs />
      <Footer />
      <FloatingCTA />
    </main>
  );
};

export default Index;
