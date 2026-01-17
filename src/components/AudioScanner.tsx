import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, StopCircle, AlertOctagon, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { checkAudioForScamWords } from "@/lib/scamDetection";
import { motion, AnimatePresence } from "framer-motion";

interface AudioScannerProps {
  onClose: () => void;
}

const AudioScanner = ({ onClose }: AudioScannerProps) => {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [scamAlert, setScamAlert] = useState<{ detected: boolean; word: string | null }>({
    detected: false,
    word: null,
  });
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-IN"; // Support Indian English

      recognition.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart + " ";
          } else {
            interimTranscript += transcriptPart;
          }
        }

        const fullTranscript = transcript + finalTranscript + interimTranscript;
        setTranscript(fullTranscript);

        // Real-time scam word detection
        const result = checkAudioForScamWords(fullTranscript);
        if (result.hasScamWord && !scamAlert.detected) {
          setScamAlert({ detected: true, word: result.word });
          // Trigger haptic feedback on mobile if available
          if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 200]);
          }
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start(); // Continue listening
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("");
      setScamAlert({ detected: false, word: null });
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const resetScanner = () => {
    setTranscript("");
    setScamAlert({ detected: false, word: null });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
    >
      <div className="w-full max-w-2xl rounded-2xl border-2 border-border bg-card p-6 md:p-8 shadow-medium">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Volume2 className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{t.audioScanner}</h3>
              <p className="text-muted-foreground">{t.audioScannerDesc}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onClose} size="lg">
            ✕
          </Button>
        </div>

        {/* Scam Alert */}
        <AnimatePresence>
          {scamAlert.detected && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 rounded-xl border-4 border-destructive bg-destructive/10 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive text-destructive-foreground animate-pulse">
                  <AlertOctagon className="h-10 w-10" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-destructive">
                    {t.audioWarning}
                  </h4>
                  <p className="text-xl font-semibold text-foreground uppercase">
                    "{scamAlert.word}"
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Listening Status */}
        <div className="mb-6 flex flex-col items-center">
          <div
            className={`mb-4 flex h-24 w-24 items-center justify-center rounded-full transition-all ${
              isListening
                ? "bg-primary text-primary-foreground animate-pulse"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isListening ? (
              <Mic className="h-12 w-12" />
            ) : (
              <MicOff className="h-12 w-12" />
            )}
          </div>
          <p className="text-xl font-medium text-foreground">
            {isListening ? t.listening : t.speakNow}
          </p>
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="mb-6 rounded-xl bg-background border-2 border-border p-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {t.transcriptLabel}
            </p>
            <p className="text-lg text-foreground min-h-[80px]">{transcript}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isListening ? (
            <Button
              onClick={startListening}
              size="xl"
              className="gap-3 neumorphic-btn"
            >
              <Mic className="h-7 w-7" />
              {t.startListening}
            </Button>
          ) : (
            <Button
              onClick={stopListening}
              variant="destructive"
              size="xl"
              className="gap-3"
            >
              <StopCircle className="h-7 w-7" />
              {t.stopListening}
            </Button>
          )}
          
          {transcript && (
            <Button variant="outline" size="lg" onClick={resetScanner}>
              {t.checkAnother}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AudioScanner;
