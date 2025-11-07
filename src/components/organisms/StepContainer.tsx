import { useState } from 'react';
import type { ReactNode } from 'react';
import { ProgressBar } from '../molecules/ProgressBar';
import { Button } from '../atoms/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  content: ReactNode;
}

interface StepContainerProps {
  steps: Step[];
}

export const StepContainer = ({ steps }: StepContainerProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [, setStepData] = useState<Record<string, unknown>>({});

  const currentStep = steps[currentStepIndex];
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

  // saveStepData funktion kan tilføjes her senere til at gemme step data

  return (
    <div className="step-container">
      <div className="step-container__wrapper">
        <ProgressBar 
          currentStep={currentStepIndex + 1}
          totalSteps={totalSteps}
          stepTitle={currentStep.title}
        />
        
        <div className="step-container__content">
          {currentStep.content}
        </div>
        
        <div className="step-container__navigation">
          {currentStepIndex > 0 && (
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
      </div>
    </div>
  );
};

