import { useState } from "react";
import { Search, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResultCard from "./ResultCard";

type ScanResult = "idle" | "scanning" | "safe" | "scam";

interface ScamDetails {
  reasons: string[];
}

const HeroScanner = () => {
  const [inputText, setInputText] = useState("");
  const [scanResult, setScanResult] = useState<ScanResult>("idle");
  const [scamDetails, setScamDetails] = useState<ScamDetails | null>(null);

  const scamKeywords = ["otp", "urgent", "bank", "winner", "lottery", "prize", "click here", "verify", "suspended", "block"];

  const checkForScam = () => {
    if (!inputText.trim()) return;

    setScanResult("scanning");
    setScamDetails(null);

    setTimeout(() => {
      const lowerText = inputText.toLowerCase();
      const foundKeywords = scamKeywords.filter(keyword => lowerText.includes(keyword));

      if (foundKeywords.length > 0) {
        setScanResult("scam");
        setScamDetails({
          reasons: foundKeywords.map(keyword => {
            switch (keyword) {
              case "otp":
                return "Asks for your OTP (One Time Password) - Never share this!";
              case "urgent":
                return "Creates false urgency to pressure you into acting fast";
              case "bank":
                return "Mentions bank details - Real banks never ask this via message";
              case "winner":
              case "lottery":
              case "prize":
                return "Promises prize money - This is a common fraud trick";
              case "click here":
                return "Contains suspicious links";
              case "verify":
                return "Asks to verify personal information";
              case "suspended":
              case "block":
                return "Uses fear tactics about account suspension";
              default:
                return `Contains suspicious word: "${keyword}"`;
            }
          })
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
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-transparent pointer-events-none" />
      
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Hero Content */}
          <div className="mb-8 md:mb-12 animate-fade-in">
            <div className="mx-auto mb-6 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Shield className="h-10 w-10 md:h-12 md:w-12" />
            </div>
            <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Check if a message is safe
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              Paste a text message, WhatsApp link, or phone number below to see if it is a scam.
            </p>
          </div>

          {/* Scanner Input */}
          {scanResult === "idle" || scanResult === "scanning" ? (
            <div className="animate-slide-up">
              <div className="rounded-2xl border-2 border-border bg-card p-6 md:p-8 shadow-soft">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your message here..."
                  className="w-full min-h-[160px] md:min-h-[200px] resize-none rounded-xl border-2 border-border bg-background p-4 md:p-6 text-lg md:text-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                  disabled={scanResult === "scanning"}
                  aria-label="Message to check for scams"
                />

                <Button
                  onClick={checkForScam}
                  disabled={!inputText.trim() || scanResult === "scanning"}
                  size="xl"
                  className="mt-6 w-full md:w-auto"
                >
                  {scanResult === "scanning" ? (
                    <>
                      <Loader2 className="h-7 w-7 animate-spin" />
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-7 w-7" />
                      <span>CHECK NOW</span>
                    </>
                  )}
                </Button>

                <p className="mt-4 text-base text-muted-foreground">
                  🔒 We do not save your private messages.
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
