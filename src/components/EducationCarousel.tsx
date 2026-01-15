import { AlertCircle, CreditCard, Gift, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const scamTypes = [
  {
    icon: CreditCard,
    title: "KYC Fraud",
    description:
      "Fraudsters pretend to be from your bank and ask you to update your KYC (Know Your Customer) details. They steal your information.",
    warning: "Banks NEVER ask for OTP or passwords via call or SMS.",
    color: "destructive",
  },
  {
    icon: Zap,
    title: "Electricity Bill Scam",
    description:
      "You receive a message saying your electricity will be cut off unless you pay immediately via a link.",
    warning: "Real electricity boards send paper bills and have official apps.",
    color: "warning",
  },
  {
    icon: Gift,
    title: "Lottery Scam",
    description:
      "Messages claiming you have won a lottery or prize money. They ask for a 'processing fee' to release your winnings.",
    warning: "You cannot win a lottery you never entered. It's always fake!",
    color: "primary",
  },
  {
    icon: AlertCircle,
    title: "Delivery Scam",
    description:
      "Fake messages about a package delivery asking you to click a link to 'track' or 'confirm' your address.",
    warning: "Use only official courier websites to track packages.",
    color: "safe",
  },
];

const EducationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % scamTypes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + scamTypes.length) % scamTypes.length);
  };

  const currentScam = scamTypes[currentIndex];
  const IconComponent = currentScam.icon;

  const getColorClasses = (color: string) => {
    switch (color) {
      case "destructive":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "warning":
        return "bg-warning/10 text-warning border-warning/20";
      case "primary":
        return "bg-primary/10 text-primary border-primary/20";
      case "safe":
        return "bg-safe/10 text-safe border-safe/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest Scams to Watch Out For
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn about common fraud tricks so you can spot them before they trick you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Carousel Card */}
          <div className="relative rounded-2xl border-2 border-border bg-card p-8 md:p-10 shadow-soft">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Icon */}
              <div
                className={`flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-xl ${getColorClasses(
                  currentScam.color
                )}`}
              >
                <IconComponent className="h-8 w-8 md:h-10 md:w-10" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {currentScam.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {currentScam.description}
                </p>
                <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-4">
                  <p className="text-base font-semibold text-destructive">
                    ⚠️ Remember: {currentScam.warning}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                size="default"
                onClick={prevSlide}
                className="gap-2"
              >
                <ChevronLeft className="h-5 w-5" />
                Previous
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {scamTypes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-3 w-3 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="default"
                onClick={nextSlide}
                className="gap-2"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationCarousel;
