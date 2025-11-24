import { useState, cloneElement, isValidElement } from 'react';
import type { ReactNode, ReactElement } from 'react';
import { ProgressBar } from '../molecules/ProgressBar';
import { Button } from '../atoms/Button';
import { IntroScreen } from './IntroScreen';
import { Results } from './Results';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { calculateDuvetMatches } from '../../utils/duvetMatcher';
import duvetsData from '../../data/duvets.json';
import type { Duvet } from '../../types/duvet';
import { useAudio } from '../../contexts/AudioContext';

interface Step {
  id: string;
  title: string;
  content: ReactNode;
}

interface StepContainerProps {
  steps: Step[];
  showIntro?: boolean;
}

interface StepData {
  [stepId: string]: unknown;
}

export const StepContainer = ({ steps, showIntro = true }: StepContainerProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(showIntro ? -1 : 0);
  const [stepData, setStepData] = useState<StepData>({});
  const [showResults, setShowResults] = useState(false);
  const [matchedDuvets, setMatchedDuvets] = useState<Duvet[]>([]);
  const { stopAmbience } = useAudio();

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
    setStepData({}); // Nulstil alle indsamlede data
    setShowResults(false);
    setMatchedDuvets([]);
    stopAmbience(); // Stopper ambience, når nulstillingen foretages
  };

  const handleStepDataChange = (stepId: string, data: unknown) => {
    setStepData(prev => ({
      ...prev,
      [stepId]: data
    }));
  };

  const isStepComplete = (stepId: string): boolean => {
    // Tjek om dette stepId har direkte data
    const directData = stepData[stepId];
    if (directData !== null && directData !== undefined) {
      // For objekter som PointsArranger, tjek om nogle point er fordelt
      if (typeof directData === 'object' && !Array.isArray(directData)) {
        return Object.values(directData as Record<string, unknown>).some(
          value => typeof value === 'number' && value > 0
        );
      }
      return true;
    }
    
    // Tjek om der er child steps med dette prefix (for trin med flere komponenter)
    const childSteps = Object.keys(stepData).filter(key => key.startsWith(stepId + '-'));
    if (childSteps.length > 0) {
      // Mindst ét child step skal have gyldige data
      return childSteps.some(childKey => {
        const childData = stepData[childKey];
        if (childData === null || childData === undefined) return false;
        
        // For PointsArranger, tjek om nogle point er fordelt
        if (typeof childData === 'object' && !Array.isArray(childData)) {
          return Object.values(childData as Record<string, unknown>).some(
            value => typeof value === 'number' && value > 0
          );
        }
        return true;
      });
    }
    
    return false;
  };

  const handleStartFromIntro = () => {
    setCurrentStepIndex(0);
  };

  const handleViewProducts = () => {
    // Åbn Flora Danica produktside i ny fane
    window.open('https://jysk.dk/brands/flora-danica', '_blank', 'noopener,noreferrer');
  };

  // Inject props ind i step content
  const renderStepContent = (content: ReactNode, stepId: string) => {
    if (isValidElement(content)) {
      const element = content as ReactElement<{
        className?: string;
        children?: ReactNode;
        stepId?: string;
        value?: unknown;
        onChange?: (value: unknown) => void;
      }>;

      // Tjek om det er en wrapper div med flere komponenter
      if (element.props.className === 'step-content__wrapper') {
        const children = Array.isArray(element.props.children) 
          ? element.props.children 
          : [element.props.children];

        return cloneElement(element, {
          children: children.map((child, index) => {
            if (isValidElement(child)) {
              const childElement = child as ReactElement<{
                className?: string;
                children?: ReactNode;
              }>;

              if (childElement.props.className === 'step-content__item') {
                const innerChild = childElement.props.children;
                
                if (isValidElement(innerChild)) {
                  const innerElement = innerChild as ReactElement<{
                    stepId?: string;
                    value?: unknown;
                    onChange?: (value: unknown) => void;
                  }>;

                  if (innerElement.props.stepId) {
                    const childStepId = innerElement.props.stepId;
                    return cloneElement(childElement, {
                      key: index,
                      children: cloneElement(innerElement, {
                        value: stepData[childStepId],
                        onChange: (value: unknown) => handleStepDataChange(childStepId, value)
                      })
                    });
                  }
                }
              }
            }
            return child;
          })
        });
      }
      
      // Single component
      return cloneElement(element, {
        value: stepData[stepId],
        onChange: (value: unknown) => handleStepDataChange(stepId, value)
      });
    }
    return content;
  };

  const currentStepComplete = currentStep ? isStepComplete(currentStep.id) : false;

  return (
    <div className="step-container">
      <div className="step-container__wrapper">
        {!showResults && (
          <ProgressBar 
            currentStep={isIntro ? 0 : currentStepIndex + 1}
            totalSteps={totalSteps}
            stepTitle={currentStep?.title}
            customTitle={isIntro ? 'FLORA DANICA — DYNEMATCHER' : undefined}
            hidePercentage={isIntro}
          />
        )}
        
        <div className="step-container__content">
          {showResults ? (
            <Results duvets={matchedDuvets} onReset={goToIntro} />
          ) : isIntro ? (
            <IntroScreen 
              onStart={handleStartFromIntro}
              onViewProducts={handleViewProducts}
            />
          ) : (
            currentStep && renderStepContent(currentStep.content, currentStep.id)
          )}
        </div>
        
        {!isIntro && !showResults && (
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
                disabled={!currentStepComplete}
              >
                Næste trin
              </Button>
            ) : (
              <Button 
                variant="primary"
                onClick={() => {
                  console.log('Collected data:', stepData);
                  // Kør matching algoritme
                  const matches = calculateDuvetMatches(duvetsData.duvets as Duvet[], stepData);
                  
                  // Log top duvets og deres point
                  console.log('=== TOP DUVET MATCHES ===');
                  matches.slice(0, 4).forEach((duvet, index) => {
                    console.log(`${index + 1}. ${duvet.name}`);
                    console.log(`   Score: ${duvet.matchingScore}`);
                    console.log(`   Price: ${duvet.price} kr`);
                    console.log(`   Warmth: ${duvet.characteristics.warmth}, Season: ${duvet.characteristics.season}`);
                    console.log('---');
                  });
                  
                  setMatchedDuvets(matches);
                  setShowResults(true);
                }}
                icon={<ArrowRight />}
                disabled={!currentStepComplete}
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

