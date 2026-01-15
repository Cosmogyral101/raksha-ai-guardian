import { Mic, Users, FileWarning, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Mic,
    title: "Audio Scanner",
    description: "Upload a voice recording or call transcript to check for phone scams.",
    action: "Upload Recording",
    color: "primary" as const,
  },
  {
    icon: Users,
    title: "Family Circle",
    description: "Ask your son, daughter, or trusted family member for a second opinion.",
    action: "Ask Family",
    color: "safe" as const,
  },
  {
    icon: FileWarning,
    title: "Report a Scam",
    description: "Help others by reporting suspicious numbers to the police database.",
    action: "Report Now",
    color: "destructive" as const,
  },
];

const FeatureGrid = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            More Ways to Stay Protected
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use these additional tools to protect yourself and your loved ones from fraud.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            const bgColor =
              feature.color === "primary"
                ? "bg-primary/10 text-primary"
                : feature.color === "safe"
                ? "bg-safe/10 text-safe"
                : "bg-destructive/10 text-destructive";

            const borderHover =
              feature.color === "primary"
                ? "hover:border-primary/30"
                : feature.color === "safe"
                ? "hover:border-safe/30"
                : "hover:border-destructive/30";

            return (
              <div
                key={feature.title}
                className={`group rounded-2xl border-2 border-border bg-card p-6 md:p-8 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 ${borderHover}`}
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl ${bgColor} transition-transform group-hover:scale-110`}
                >
                  <IconComponent className="h-8 w-8" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>

                <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <Button
                  variant="outline"
                  size="default"
                  className="w-full group-hover:bg-accent transition-colors"
                >
                  {feature.action}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
