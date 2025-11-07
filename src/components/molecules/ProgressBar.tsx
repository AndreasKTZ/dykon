interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitle?: string;
  customTitle?: string;
  hidePercentage?: boolean;
}

export const ProgressBar = ({ 
  currentStep, 
  totalSteps, 
  stepTitle, 
  customTitle,
  hidePercentage = false 
}: ProgressBarProps) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  
  const displayTitle = customTitle || 
    (stepTitle ? `TRIN ${currentStep} AF ${totalSteps} — ${stepTitle.toUpperCase()}` : '');

  return (
    <div className="progress-bar">
      <div className="progress-bar__header">
        <span className="progress-bar__title">
          {displayTitle}
        </span>
        {!hidePercentage && (
          <span className="progress-bar__percentage">{percentage}%</span>
        )}
      </div>
      <div 
        className="progress-bar__steps"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={customTitle || `Trin ${currentStep} af ${totalSteps}`}
      >
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`progress-bar__step ${
              index < currentStep ? 'progress-bar__step--completed' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

