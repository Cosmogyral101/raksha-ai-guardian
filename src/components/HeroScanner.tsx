import { useState } from "react";
import { Search, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { analyzeMessage } from "@/lib/scamDetection";
import ResultCard from "./ResultCard";

type ScanResult = "idle" | "scanning" | "safe" | "scam";

interface ScamDetails {
  reasons: string[];
  score: number;
}

const HeroScanner = () => {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState("");
  const [scanResult, setScanResult] = useState<ScanResult>("idle");
  const [scamDetails, setScamDetails] = useState<ScamDetails | null>(null);

  const checkForScam = () => {
    if (!inputText.trim()) return;

    setScanResult("scanning");
    setScamDetails(null);

    setTimeout(() => {
      const analysis = analyzeMessage(inputText);

      if (analysis.isScam) {
        setScanResult("scam");
        setScamDetails({
          reasons: analysis.reasons,
          score: analysis.score,
        });
      } else {
        setScanResult("safe");
      }
    }, 2000);
  };

  const resetScanner = () => {
    setInputText("");
    setScanResult("idle");
    setScamDetails(null);
  };

  return (
    <section className="relative py-12 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-transparent pointer-events-none" />
      
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Hero Content */}
          <div className="mb-8 md:mb-12 animate-fade-in">
            <div className="mx-auto mb-6 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Shield className="h-10 w-10 md:h-12 md:w-12" />
            </div>
            <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t.heroTitle}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Scanner Input */}
          {scanResult === "idle" || scanResult === "scanning" ? (
            <div className="animate-slide-up">
              <div className="rounded-2xl border-2 border-border bg-card p-6 md:p-8 shadow-soft">
                <textarea
                  id="input-area"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full min-h-[160px] md:min-h-[200px] resize-none rounded-xl border-2 border-border bg-background p-4 md:p-6 text-lg md:text-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-all"
                  style={{ boxShadow: "none" }}
                  disabled={scanResult === "scanning"}
                  aria-label="Message to check for scams"
                />

                <Button
                  id="check-button"
                  onClick={checkForScam}
                  disabled={!inputText.trim() || scanResult === "scanning"}
                  size="xl"
                  className="mt-6 w-full md:w-auto neumorphic-btn"
                >
                  {scanResult === "scanning" ? (
                    <>
                      <Loader2 className="h-7 w-7 animate-spin" />
                      <span>{t.scanning}</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-7 w-7" />
                      <span>{t.checkNow}</span>
                    </>
                  )}
                </Button>

                <p className="mt-4 text-base text-muted-foreground">
                  {t.privacyNote}
                </p>
              </div>
            </div>
          ) : (
            <ResultCard
              result={scanResult}
              scamDetails={scamDetails}
              onReset={resetScanner}
              originalMessage={inputText}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroScanner;
