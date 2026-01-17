import Joyride, { Step, CallBackProps, STATUS } from "react-joyride";
import { useLanguage } from "@/contexts/LanguageContext";

interface OnboardingTourProps {
  run: boolean;
  onComplete: () => void;
}

const OnboardingTour = ({ run, onComplete }: OnboardingTourProps) => {
  const { t } = useLanguage();

  const steps: Step[] = [
    {
      target: "#header-logo",
      content: t.tour.welcome,
      placement: "bottom",
      disableBeacon: true,
    },
    {
      target: "#language-toggle",
      content: t.tour.language,
      placement: "bottom",
    },
    {
      target: "#input-area",
      content: t.tour.inputArea,
      placement: "top",
    },
    {
      target: "#check-button",
      content: t.tour.checkButton,
      placement: "top",
    },
    {
      target: "#family-btn",
      content: t.tour.familyBtn,
      placement: "top",
    },
    {
      target: "#audio-scanner-btn",
      content: t.tour.audioScanner,
      placement: "top",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      onComplete();
      // Store that user has completed tour
      localStorage.setItem("raksha-tour-completed", "true");
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      disableScrolling={false}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: "#2563EB",
          zIndex: 1000,
          width: 400,
        },
        tooltip: {
          fontSize: 18,
          borderRadius: 16,
          padding: 24,
        },
        tooltipContent: {
          fontSize: 18,
          lineHeight: 1.6,
        },
        buttonNext: {
          fontSize: 18,
          padding: "12px 24px",
          borderRadius: 12,
          fontWeight: 600,
        },
        buttonBack: {
          fontSize: 18,
          padding: "12px 24px",
          marginRight: 12,
        },
        buttonSkip: {
          fontSize: 16,
        },
        spotlight: {
          borderRadius: 16,
        },
      }}
      locale={{
        back: "Back",
        close: "Close",
        last: "Finish",
        next: "Next",
        skip: "Skip Tour",
      }}
    />
  );
};

export default OnboardingTour;
