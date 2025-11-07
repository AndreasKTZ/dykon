import { useState } from 'react';
import type { ReactNode } from 'react';
import { Minus, Plus, Volume2 } from 'lucide-react';
import { Button } from '../atoms/Button';

interface PointOption {
  id: string;
  icon: ReactNode;
  label: string;
}

interface PointsArrangerProps {
  title: string;
  subtitle?: string;
  totalPoints: number;
  options: PointOption[];
  value?: Record<string, number>;
  onChange?: (distribution: Record<string, number>) => void;
  showAudioButton?: boolean;
  stepId?: string;
}

export const PointsArranger = ({
  title,
  subtitle,
  totalPoints,
  options,
  value: controlledValue,
  onChange,
  showAudioButton = false
}: PointsArrangerProps) => {
  const [internalDistribution, setInternalDistribution] = useState<Record<string, number>>(
    options.reduce((acc, opt) => ({ ...acc, [opt.id]: 0 }), {})
  );

  // Use controlled value if provided, otherwise use internal state
  const distribution = controlledValue !== undefined ? controlledValue : internalDistribution;
  const usedPoints = Object.values(distribution).reduce((sum, val) => sum + val, 0);
  const remainingPoints = totalPoints - usedPoints;

  const handleIncrement = (id: string) => {
    if (remainingPoints > 0) {
      const newDistribution = { ...distribution, [id]: distribution[id] + 1 };
      setInternalDistribution(newDistribution);
      onChange?.(newDistribution);
    }
  };

  const handleDecrement = (id: string) => {
    if (distribution[id] > 0) {
      const newDistribution = { ...distribution, [id]: distribution[id] - 1 };
      setInternalDistribution(newDistribution);
      onChange?.(newDistribution);
    }
  };

  return (
    <div className="points-arranger">
      <div className="points-arranger__header">
        <div className="points-arranger__header-content">
          <div className="points-arranger__header-text">
            <h2 className="points-arranger__title">{title}</h2>
            {subtitle && <p className="points-arranger__subtitle">{subtitle}</p>}
          </div>
          {showAudioButton ? (
            <Button 
              variant="outline" 
              icon={<Volume2 />}
              iconPosition="left"
              onClick={() => console.log('Toggle sound')}
            >
              Slå lyd til
            </Button>
          ) : (
            <div className="points-arranger__points-display">
              <span className="points-arranger__points-label">Point</span>
              <div className="points-arranger__points-dots">
                {Array.from({ length: totalPoints }).map((_, index) => (
                  <span
                    key={index}
                    className={`points-arranger__dot ${
                      index < usedPoints ? 'points-arranger__dot--used' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="points-arranger__options">
        {options.map((option) => (
          <div key={option.id} className="points-arranger__option">
            <div className="points-arranger__option-info">
              <span className="points-arranger__option-icon">{option.icon}</span>
              <span className="points-arranger__option-label">{option.label}</span>
            </div>
            <div className="points-arranger__controls">
              <button
                type="button"
                className="points-arranger__button points-arranger__button--minus"
                onClick={() => handleDecrement(option.id)}
                disabled={distribution[option.id] === 0}
                aria-label={`Reducer ${option.label}`}
              >
                <Minus size={16} />
              </button>
              <span className="points-arranger__value">{distribution[option.id]}</span>
              <button
                type="button"
                className="points-arranger__button points-arranger__button--plus"
                onClick={() => handleIncrement(option.id)}
                disabled={remainingPoints === 0}
                aria-label={`Øg ${option.label}`}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

