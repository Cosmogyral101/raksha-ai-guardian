import { Play, X, Shield, CreditCard, Phone, Gift } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface VideoTutorialsProps {
  onClose: () => void;
}

const tutorials = [
  {
    id: 1,
    icon: CreditCard,
    titleEn: "How to Spot Bank Fraud",
    titleHi: "बैंक धोखाधड़ी कैसे पहचानें",
    descEn: "Learn the warning signs of fake bank calls and messages",
    descHi: "नकली बैंक कॉल और संदेशों के चेतावनी संकेत जानें",
    duration: "3:45",
    thumbnail: "bank-fraud",
  },
  {
    id: 2,
    icon: Phone,
    titleEn: "Safe Phone Practices",
    titleHi: "सुरक्षित फ़ोन अभ्यास",
    descEn: "What to do when you receive a suspicious call",
    descHi: "संदिग्ध कॉल प्राप्त होने पर क्या करें",
    duration: "4:20",
    thumbnail: "phone-safety",
  },
  {
    id: 3,
    icon: Gift,
    titleEn: "Lottery & Prize Scams",
    titleHi: "लॉटरी और पुरस्कार घोटाले",
    descEn: "Why you can never win a lottery you didn't enter",
    descHi: "आप कभी ऐसी लॉटरी क्यों नहीं जीत सकते जिसमें आपने भाग नहीं लिया",
    duration: "2:55",
    thumbnail: "lottery-scam",
  },
  {
    id: 4,
    icon: Shield,
    titleEn: "Protecting Your OTP",
    titleHi: "अपना OTP सुरक्षित रखें",
    descEn: "Why you should NEVER share your OTP with anyone",
    descHi: "आपको अपना OTP किसी के साथ क्यों नहीं साझा करना चाहिए",
    duration: "3:10",
    thumbnail: "otp-safety",
  },
];

const VideoTutorials = ({ onClose }: VideoTutorialsProps) => {
  const { t, language } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 overflow-y-auto"
    >
      <div className="w-full max-w-4xl rounded-2xl border-2 border-border bg-card p-6 md:p-8 shadow-medium my-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Play className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{t.videoTutorials}</h3>
              <p className="text-muted-foreground">{t.videoTutorialsDesc}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onClose} size="lg">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Video Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {tutorials.map((tutorial) => {
            const IconComponent = tutorial.icon;
            return (
              <motion.div
                key={tutorial.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer rounded-xl border-2 border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-soft"
                onClick={() => setSelectedVideo(tutorial.id)}
              >
                {/* Thumbnail placeholder */}
                <div className="mb-4 relative rounded-lg bg-gradient-to-br from-primary/20 to-safe/20 aspect-video flex items-center justify-center">
                  <IconComponent className="h-16 w-16 text-primary/50" />
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/10 transition-colors rounded-lg">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-8 w-8 ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-foreground/80 text-background px-2 py-1 rounded text-sm font-medium">
                    {tutorial.duration}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-foreground mb-2">
                  {language === "en" ? tutorial.titleEn : tutorial.titleHi}
                </h4>
                <p className="text-base text-muted-foreground">
                  {language === "en" ? tutorial.descEn : tutorial.descHi}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Video Player Modal (Placeholder) */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 flex items-center justify-center bg-foreground/80 p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="w-full max-w-3xl rounded-2xl bg-card p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video rounded-xl bg-foreground/10 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Play className="h-20 w-20 text-primary mx-auto mb-4" />
                    <p className="text-xl text-muted-foreground">
                      {language === "en" 
                        ? "Video player placeholder - Connect to YouTube or hosting service" 
                        : "वीडियो प्लेयर प्लेसहोल्डर - YouTube या होस्टिंग सेवा से कनेक्ट करें"}
                    </p>
                  </div>
                </div>
                <Button onClick={() => setSelectedVideo(null)} size="lg" className="w-full">
                  {language === "en" ? "Close Video" : "वीडियो बंद करें"}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VideoTutorials;
