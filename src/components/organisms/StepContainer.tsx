import { useState } from 'react';
import type { ReactNode } from 'react';
import { ProgressBar } from '../molecules/ProgressBar';
import { Button } from '../atoms/Button';
import { IntroScreen } from './IntroScreen';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  content: ReactNode;
}

interface StepContainerProps {
  steps: Step[];
  showIntro?: boolean;
}

export const StepContainer = ({ steps, showIntro = true }: StepContainerProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(showIntro ? -1 : 0);
  const [, setStepData] = useState<Record<string, unknown>>({});

  const isIntro = currentStepIndex === -1;
  const currentStep = isIntro ? null : steps[currentStepIndex];
  const totalSteps = steps.length;

  const goToNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToIntro = () => {
    setCurrentStepIndex(-1);
  };

  // saveStepData funktion kan tilføjes her senere til at gemme step data

  const handleStartFromIntro = () => {
    setCurrentStepIndex(0);
  };

  const handleViewProducts = () => {
    // Navigate til produktside
    window.location.href = '/dyner';
  };

  return (
    <div className="step-container">
      <div className="step-container__wrapper">
        <ProgressBar 
          currentStep={isIntro ? 0 : currentStepIndex + 1}
          totalSteps={totalSteps}
          stepTitle={currentStep?.title}
          customTitle={isIntro ? 'FLORA DANICA — DYNEMATCHER' : undefined}
          hidePercentage={isIntro}
        />
        
        <div className="step-container__content">
          {isIntro ? (
            <IntroScreen 
              onStart={handleStartFromIntro}
              onViewProducts={handleViewProducts}
            />
          ) : (
            currentStep?.content
          )}
        </div>
        
        {!isIntro && (
          <div className="step-container__navigation">
            {currentStepIndex === 0 ? (
              <Button 
                variant="outline"
                icon={<X />}
                iconPosition="left"
                onClick={goToIntro}
              >
                Afslut
              </Button>
            ) : (
              <Button 
                variant="outline"
                onClick={goToPreviousStep}
                icon={<ArrowLeft />}
                iconPosition="left"
              >
                Tilbage
              </Button>
            )}
            
            {currentStepIndex < totalSteps - 1 ? (
              <Button 
                variant="primary"
                onClick={goToNextStep}
                icon={<ArrowRight />}
              >
                Næste trin
              </Button>
            ) : (
              <Button 
                variant="primary"
                onClick={() => console.log('Submit')}
                icon={<ArrowRight />}
              >
                Se resultat
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

