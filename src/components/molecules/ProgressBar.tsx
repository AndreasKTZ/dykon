interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export const ProgressBar = ({ currentStep, totalSteps, stepTitle }: ProgressBarProps) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="progress-bar">
      <div className="progress-bar__header">
        <span className="progress-bar__title">
          TRIN {currentStep} AF {totalSteps} — {stepTitle.toUpperCase()}
        </span>
        <span className="progress-bar__percentage">{percentage}%</span>
      </div>
      <div 
        className="progress-bar__steps"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Trin ${currentStep} af ${totalSteps}`}
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

