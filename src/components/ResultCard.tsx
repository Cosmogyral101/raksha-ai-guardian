import { AlertTriangle, CheckCircle, ShieldX, RefreshCw, Ban, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import FamilyAlert from "./FamilyAlert";

interface ResultCardProps {
  result: "safe" | "scam";
  scamDetails: { reasons: string[]; score?: number } | null;
  onReset: () => void;
  originalMessage: string;
}

const ResultCard = ({ result, scamDetails, onReset, originalMessage }: ResultCardProps) => {
  const { t } = useLanguage();
  const isSafe = result === "safe";
  const [showFamilyAlert, setShowFamilyAlert] = useState(false);

  return (
    <>
      <div className="animate-slide-up">
        <div
          className={`rounded-2xl border-2 p-8 md:p-10 ${
            isSafe
              ? "border-safe/30 result-safe"
              : "border-destructive/30 result-danger"
          }`}
        >
          {/* Status Icon & Title */}
          <div className="mb-6 flex flex-col items-center">
            <div
              className={`mb-4 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full ${
                isSafe ? "bg-safe/20 text-safe" : "bg-destructive/20 text-destructive"
              }`}
            >
              {isSafe ? (
                <CheckCircle className="h-12 w-12 md:h-14 md:w-14" strokeWidth={2.5} />
              ) : (
                <AlertTriangle className="h-12 w-12 md:h-14 md:w-14" strokeWidth={2.5} />
              )}
            </div>

            <h3
              className={`text-2xl md:text-3xl font-bold ${
                isSafe ? "text-safe" : "text-destructive"
              }`}
            >
              {isSafe ? t.likelySafe : t.suspiciousDetected}
            </h3>

            <p className="mt-2 text-lg text-muted-foreground">
              {isSafe ? t.safeMessage : t.scamMessage}
            </p>
          </div>

          {/* Original Message Preview */}
          <div className="mb-6 rounded-xl bg-background/50 border border-border p-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">{t.yourMessage}</p>
            <p className="text-base text-foreground line-clamp-3">{originalMessage}</p>
          </div>

          {/* Scam Explanation - Explainable AI */}
          {!isSafe && scamDetails && (
            <div className="mb-8 rounded-xl bg-destructive/10 border-2 border-destructive/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldX className="h-6 w-6 text-destructive" />
                <h4 className="text-xl font-semibold text-foreground">
                  {t.whySuspicious}
                </h4>
              </div>
              <ul className="space-y-3">
                {scamDetails.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3 text-base text-foreground">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-destructive shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isSafe && (
              <>
                <Button variant="destructive" size="lg" className="gap-2 min-h-[64px] neumorphic-btn">
                  <Ban className="h-5 w-5" />
                  {t.blockNumber}
                </Button>
                <Button
                  id="family-btn"
                  variant="outline"
                  size="lg"
                  onClick={() => setShowFamilyAlert(true)}
                  className="gap-2 min-h-[64px] border-safe text-safe hover:bg-safe/10"
                >
                  <Users className="h-5 w-5" />
                  {t.shareFamily}
                </Button>
              </>
            )}
            <Button
              variant={isSafe ? "default" : "outline"}
              size="lg"
              onClick={onReset}
              className="gap-2 min-h-[64px] neumorphic-btn"
            >
              <RefreshCw className="h-5 w-5" />
              {t.checkAnother}
            </Button>
          </div>
        </div>
      </div>

      {showFamilyAlert && (
        <FamilyAlert
          suspiciousMessage={originalMessage}
          onClose={() => setShowFamilyAlert(false)}
        />
      )}
    </>
  );
};

export default ResultCard;
