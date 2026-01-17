import { useState } from "react";
import { Mic, Users, FileWarning, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import AudioScanner from "./AudioScanner";
import FamilyAlert from "./FamilyAlert";
import VideoTutorials from "./VideoTutorials";

const FeatureGrid = () => {
  const { t } = useLanguage();
  const [showAudioScanner, setShowAudioScanner] = useState(false);
  const [showFamilyAlert, setShowFamilyAlert] = useState(false);
  const [showVideoTutorials, setShowVideoTutorials] = useState(false);

  const features = [
    {
      icon: Mic,
      title: t.audioScanner,
      description: t.audioScannerDesc,
      action: t.startListening,
      color: "primary" as const,
      onClick: () => setShowAudioScanner(true),
      id: "audio-scanner-btn",
    },
    {
      icon: Users,
      title: t.familyCircle,
      description: t.familyCircleDesc,
      action: t.askFamily,
      color: "safe" as const,
      onClick: () => setShowFamilyAlert(true),
      id: "family-circle-btn",
    },
    {
      icon: FileWarning,
      title: t.reportScam,
      description: t.reportScamDesc,
      action: t.reportNow,
      color: "destructive" as const,
      onClick: () => {},
      id: "report-btn",
    },
    {
      icon: Play,
      title: t.videoTutorials,
      description: t.videoTutorialsDesc,
      action: t.watchNow,
      color: "primary" as const,
      onClick: () => setShowVideoTutorials(true),
      id: "video-btn",
    },
  ];

  return (
    <>
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.moreWays}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.moreWaysSubtitle}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
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
                  id={feature.id}
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
                    onClick={feature.onClick}
                    className="w-full group-hover:bg-accent transition-colors min-h-[56px] neumorphic-btn"
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

      {showAudioScanner && <AudioScanner onClose={() => setShowAudioScanner(false)} />}
      {showFamilyAlert && <FamilyAlert onClose={() => setShowFamilyAlert(false)} />}
      {showVideoTutorials && <VideoTutorials onClose={() => setShowVideoTutorials(false)} />}
    </>
  );
};

export default FeatureGrid;
