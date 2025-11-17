import { useState } from 'react';
import type { ReactNode } from 'react';
import { ImageCard } from '../atoms/ImageCard';
import { Button } from '../atoms/Button';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../../contexts/AudioContext';

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
  value?: string | null;
  onChange?: (id: string) => void;
  onSelect?: (id: string) => void;
  showAudioButton?: boolean;
}

export const ImageSelection = ({ 
  title, 
  subtitle, 
  options, 
  value,
  onChange,
  onSelect, 
  showAudioButton = true
}: ImageSelectionProps) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);
  const { isEnabled, toggleAudio } = useAudio();

  const selectedId = value !== undefined ? value : internalSelectedId;

  const handleSelect = (id: string) => {
    setInternalSelectedId(id);
    onChange?.(id);
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
              icon={isEnabled ? <Volume2 /> : <VolumeX />}
              iconPosition="left"
              onClick={toggleAudio}
            >
              {isEnabled ? 'Slå lyd fra' : 'Slå lyd til'}
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

