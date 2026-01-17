import { Shield, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-20 md:h-24 items-center justify-between">
        {/* Logo */}
        <div id="header-logo" className="flex items-center gap-3">
          <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Shield className="h-7 w-7 md:h-8 md:w-8" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              {t.brandName}
            </h1>
            <p className="text-sm text-muted-foreground hidden md:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language Toggle */}
          <button
            id="language-toggle"
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-xl border-2 border-border bg-secondary px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent neumorphic-btn min-h-[56px]"
            aria-label="Toggle language"
          >
            <Globe className="h-5 w-5" />
            <span className="hidden sm:inline">{t.language}</span>
            <span className="font-bold text-primary">{t.languageAlt}</span>
          </button>

          {/* Emergency Helpline */}
          <Button variant="outline-danger" size="default" className="gap-2 min-h-[56px]">
            <Phone className="h-5 w-5" />
            <span className="hidden sm:inline">{t.callHelpline}</span>
            <span className="sm:hidden">{t.help}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
