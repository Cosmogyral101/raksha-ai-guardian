import { AlertTriangle, CheckCircle, ShieldX, RefreshCw, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultCardProps {
  result: "safe" | "scam";
  scamDetails: { reasons: string[] } | null;
  onReset: () => void;
  originalMessage: string;
}

const ResultCard = ({ result, scamDetails, onReset, originalMessage }: ResultCardProps) => {
  const isSafe = result === "safe";

  return (
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
            {isSafe ? "✅ LIKELY SAFE" : "⚠️ SUSPICIOUS DETECTED"}
          </h3>

          <p className="mt-2 text-lg text-muted-foreground">
            {isSafe
              ? "This message appears to be safe. Stay alert!"
              : "This message shows signs of fraud. Be careful!"}
          </p>
        </div>

        {/* Original Message Preview */}
        <div className="mb-6 rounded-xl bg-background/50 border border-border p-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">Your message:</p>
          <p className="text-base text-foreground line-clamp-3">{originalMessage}</p>
        </div>

        {/* Scam Explanation */}
        {!isSafe && scamDetails && (
          <div className="mb-8 rounded-xl bg-destructive/10 border-2 border-destructive/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <ShieldX className="h-6 w-6 text-destructive" />
              <h4 className="text-xl font-semibold text-foreground">
                Why is this suspicious?
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
            <Button variant="destructive" size="lg" className="gap-2">
              <Ban className="h-5 w-5" />
              Block This Number
            </Button>
          )}
          <Button
            variant={isSafe ? "default" : "outline"}
            size="lg"
            onClick={onReset}
            className="gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            Check Another Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
