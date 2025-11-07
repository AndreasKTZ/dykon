import { useState } from 'react';
import type { ReactNode } from 'react';
import { ImageCard } from '../atoms/ImageCard';
import { Button } from '../atoms/Button';
import { Volume2 } from 'lucide-react';

interface ImageOption {
  id: string;
  image: string;
  label: string;
  icon?: ReactNode;
}

interface ImageSelectionProps {
  title: string;
  subtitle?: string;
  options: ImageOption[];
  onSelect?: (id: string) => void;
  showAudioButton?: boolean;
}

export const ImageSelection = ({ title, subtitle, options, onSelect, showAudioButton = true }: ImageSelectionProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelect?.(id);
  };

  return (
    <div className="image-selection">
      <div className="image-selection__header">
        <div className="image-selection__header-content">
          <div className="image-selection__header-text">
            <h2 className="image-selection__title">{title}</h2>
            {subtitle && <p className="image-selection__subtitle">{subtitle}</p>}
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
      <div className="image-selection__grid">
        {options.map((option) => (
          <ImageCard
            key={option.id}
            image={option.image}
            label={option.label}
            icon={option.icon}
            isSelected={selectedId === option.id}
            onClick={() => handleSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
};

