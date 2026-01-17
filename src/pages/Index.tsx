import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroScanner from "@/components/HeroScanner";
import FeatureGrid from "@/components/FeatureGrid";
import EducationCarousel from "@/components/EducationCarousel";
import Footer from "@/components/Footer";
import OnboardingTour from "@/components/OnboardingTour";

const Index = () => {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    // Check if user has completed the tour before
    const tourCompleted = localStorage.getItem("raksha-tour-completed");
    if (!tourCompleted) {
      // Start tour after a short delay
      const timer = setTimeout(() => setRunTour(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroScanner />
        <FeatureGrid />
        <EducationCarousel />
      </main>
      <Footer />
      <OnboardingTour run={runTour} onComplete={() => setRunTour(false)} />
    </div>
  );
};

export default Index;
