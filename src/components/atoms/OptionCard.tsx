import type { ReactNode } from 'react';
import { useAudio } from '../../contexts/AudioContext';

interface OptionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const OptionCard = ({ icon, title, description, isSelected, onClick }: OptionCardProps) => {
  const { playClick } = useAudio();

  const handleClick = () => {
    playClick('option');
    onClick?.();
  };

  return (
    <button
      className={`option-card ${isSelected ? 'option-card--selected' : ''}`}
      onClick={handleClick}
      type="button"
    >
      <div className="option-card__icon">{icon}</div>
      <h3 className="option-card__title">{title}</h3>
      <p className="option-card__description">{description}</p>
    </button>
  );
};

