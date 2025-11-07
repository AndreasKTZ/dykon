import { useState } from 'react';
import type { ReactNode } from 'react';
import { OptionCard } from '../atoms/OptionCard';
import { Button } from '../atoms/Button';
import { Volume2 } from 'lucide-react';

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
  onSelect?: (id: string) => void;
  showAudioButton?: boolean;
}

export const OptionBoxes = ({ title, subtitle, options, onSelect, showAudioButton = true }: OptionBoxesProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelect?.(id);
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
              icon={<Volume2 />}
              iconPosition="left"
              onClick={() => console.log('Toggle sound')}
            >
              Slå lyd til
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

