import Header from "@/components/Header";
import HeroScanner from "@/components/HeroScanner";
import FeatureGrid from "@/components/FeatureGrid";
import EducationCarousel from "@/components/EducationCarousel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroScanner />
        <FeatureGrid />
        <EducationCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
