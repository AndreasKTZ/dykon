import { useState } from 'react';
import type { ReactNode } from 'react';
import { OptionCard } from '../atoms/OptionCard';
import { Button } from '../atoms/Button';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../../contexts/AudioContext';

interface Option {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

interface OptionBoxesProps {
  title: string;
  subtitle?: string;
  options: Option[];
  value?: string | null;
  onChange?: (id: string) => void;
  onSelect?: (id: string) => void;
  showAudioButton?: boolean;
  stepId?: string;
}

export const OptionBoxes = ({ 
  title, 
  subtitle, 
  options, 
  value,
  onChange,
  onSelect, 
  showAudioButton = true, 
  stepId 
}: OptionBoxesProps) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);
  const { isEnabled, toggleAudio, updateSoundFromChoice } = useAudio();

  // Use controlled value if provided, otherwise use internal state
  const selectedId = value !== undefined ? value : internalSelectedId;

  const handleSelect = (id: string) => {
    setInternalSelectedId(id);
    onChange?.(id);
    onSelect?.(id);
    
    if (stepId) {
      updateSoundFromChoice(stepId, id);
    }
  };

  return (
    <div className="option-boxes">
      <div className="option-boxes__header">
        <div className="option-boxes__header-content">
          <div className="option-boxes__header-text">
            <h2 className="option-boxes__title">{title}</h2>
            {subtitle && <p className="option-boxes__subtitle">{subtitle}</p>}
          </div>
          {showAudioButton && (
            <Button 
              variant="outline" 
              icon={isEnabled ? <Volume2 /> : <VolumeX />}
              iconPosition="left"
              onClick={toggleAudio}
            >
              {isEnabled ? 'Slå lyd fra' : 'Slå lyd til'}
            </Button>
          )}
        </div>
      </div>
      <div className="option-boxes__grid">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            icon={option.icon}
            title={option.title}
            description={option.description}
            isSelected={selectedId === option.id}
            onClick={() => handleSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
};

