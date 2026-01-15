import { Shield, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-20 md:h-24 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Shield className="h-7 w-7 md:h-8 md:w-8" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              Raksha AI
            </h1>
            <p className="text-sm text-muted-foreground hidden md:block">
              {language === "en" ? "Your Protection Partner" : "आपका सुरक्षा साथी"}
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-xl border-2 border-border bg-secondary px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            aria-label="Toggle language"
          >
            <Globe className="h-5 w-5" />
            <span className="hidden sm:inline">
              {language === "en" ? "English" : "हिंदी"}
            </span>
            <span className="font-bold text-primary">
              {language === "en" ? "/ हिंदी" : "/ EN"}
            </span>
          </button>

          {/* Emergency Helpline */}
          <Button variant="outline-danger" size="default" className="gap-2">
            <Phone className="h-5 w-5" />
            <span className="hidden sm:inline">
              {language === "en" ? "Call Helpline" : "हेल्पलाइन कॉल करें"}
            </span>
            <span className="sm:hidden">Help</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
