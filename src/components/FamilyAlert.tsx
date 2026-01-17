import { useState } from "react";
import { Users, Send, MessageCircle, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface FamilyAlertProps {
  suspiciousMessage?: string;
  onClose: () => void;
}

const familyMembers = [
  { id: 1, nameEn: "Son", nameHi: "बेटा", emoji: "👨" },
  { id: 2, nameEn: "Daughter", nameHi: "बेटी", emoji: "👩" },
  { id: 3, nameEn: "Grandson", nameHi: "पोता", emoji: "👦" },
  { id: 4, nameEn: "Granddaughter", nameHi: "पोती", emoji: "👧" },
  { id: 5, nameEn: "Trusted Friend", nameHi: "भरोसेमंद मित्र", emoji: "🤝" },
];

const FamilyAlert = ({ suspiciousMessage = "", onClose }: FamilyAlertProps) => {
  const { t, language } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  const handleSendToWhatsApp = () => {
    const template = t.whatsappTemplate;
    const fullMessage = `${template}\n\n"${suspiciousMessage}"`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
    >
      <div className="w-full max-w-lg rounded-2xl border-2 border-border bg-card p-6 md:p-8 shadow-medium">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-safe/10 text-safe">
              <Users className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{t.familyCircle}</h3>
              <p className="text-muted-foreground">{t.familyCircleDesc}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onClose} size="lg">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {!sent ? (
          <>
            {/* Family Members */}
            <div className="mb-6">
              <p className="text-lg font-medium text-foreground mb-4">
                {language === "en" ? "Who do you want to ask?" : "आप किससे पूछना चाहते हैं?"}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {familyMembers.map((member) => (
                  <motion.button
                    key={member.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMember(member.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      selectedMember === member.id
                        ? "border-safe bg-safe/10"
                        : "border-border bg-background hover:border-safe/30"
                    }`}
                  >
                    <span className="text-3xl">{member.emoji}</span>
                    <span className="text-lg font-medium text-foreground">
                      {language === "en" ? member.nameEn : member.nameHi}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Message Preview */}
            {suspiciousMessage && (
              <div className="mb-6 rounded-xl bg-background border-2 border-border p-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {language === "en" ? "Message to share:" : "साझा करने के लिए संदेश:"}
                </p>
                <p className="text-base text-foreground line-clamp-3">"{suspiciousMessage}"</p>
              </div>
            )}

            {/* WhatsApp Button */}
            <Button
              onClick={handleSendToWhatsApp}
              disabled={!selectedMember}
              size="xl"
              className="w-full gap-3 bg-[#25D366] hover:bg-[#128C7E] neumorphic-btn"
            >
              <MessageCircle className="h-7 w-7" />
              {t.askFamily}
            </Button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-safe/20 text-safe mx-auto">
              <Send className="h-10 w-10" />
            </div>
            <h4 className="text-2xl font-bold text-foreground mb-2">
              {language === "en" ? "Message Sent!" : "संदेश भेजा गया!"}
            </h4>
            <p className="text-lg text-muted-foreground mb-6">
              {language === "en" 
                ? "WhatsApp has opened. Select a contact to send the message." 
                : "WhatsApp खुल गया है। संदेश भेजने के लिए एक संपर्क चुनें।"}
            </p>
            <div className="flex items-center justify-center gap-2 text-safe">
              <Heart className="h-5 w-5" />
              <span className="text-lg font-medium">
                {language === "en" ? "Stay safe!" : "सुरक्षित रहें!"}
              </span>
            </div>
            <Button onClick={onClose} variant="outline" size="lg" className="mt-6">
              {language === "en" ? "Close" : "बंद करें"}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FamilyAlert;
