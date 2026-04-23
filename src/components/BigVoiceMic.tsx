import { useRef, useState } from "react";
import { Mic } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const BigVoiceMic = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert(t("voiceNotSupported"));
      navigate("/dashboard/add");
      return;
    }
    const recognition = new SR();
    recognition.lang = lang === "te" ? "te-IN" : lang === "hi" ? "hi-IN" : "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setIsListening(false);
      // Hand off to add-product flow with the transcript
      navigate(`/dashboard/add?voice=${encodeURIComponent(transcript)}`);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  return (
    <div className="glass-card p-6 flex flex-col items-center justify-center text-center gap-3">
      <div className="relative flex items-center justify-center">
        {/* Idle pulse rings */}
        {!isListening && (
          <>
            <span className="absolute inline-flex h-24 w-24 rounded-full bg-primary/30 animate-ping" />
            <span className="absolute inline-flex h-20 w-20 rounded-full bg-primary/20 animate-pulse" />
          </>
        )}
        {/* Recording rings */}
        {isListening && (
          <>
            <span className="absolute inline-flex h-28 w-28 rounded-full bg-destructive/30 animate-ping" />
            <span className="absolute inline-flex h-24 w-24 rounded-full bg-destructive/40 animate-ping [animation-delay:200ms]" />
          </>
        )}

        <button
          onClick={startListening}
          aria-label={t("voiceHint")}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center text-primary-foreground font-semibold transition-all duration-300 active:scale-95 shadow-2xl ${
            isListening
              ? "bg-destructive glow-primary scale-110"
              : "bg-primary glow-primary hover:scale-105"
          }`}
        >
          <Mic className="w-9 h-9" />
        </button>
      </div>

      {isListening ? (
        <div className="flex items-center gap-2 mt-1">
          <span className="flex gap-1">
            <span className="w-1.5 h-4 bg-destructive rounded-full animate-pulse" />
            <span className="w-1.5 h-5 bg-destructive rounded-full animate-pulse [animation-delay:120ms]" />
            <span className="w-1.5 h-3 bg-destructive rounded-full animate-pulse [animation-delay:240ms]" />
            <span className="w-1.5 h-6 bg-destructive rounded-full animate-pulse [animation-delay:360ms]" />
            <span className="w-1.5 h-4 bg-destructive rounded-full animate-pulse [animation-delay:480ms]" />
          </span>
          <p className="text-sm font-semibold text-destructive">{t("voiceListening")}</p>
        </div>
      ) : (
        <p className="text-sm font-medium text-foreground">{t("voiceHint")}</p>
      )}
    </div>
  );
};

export default BigVoiceMic;
