import type { ReactNode } from 'react';
import { useAudio } from '../../contexts/AudioContext';

interface ImageCardProps {
  image: string;
  label: string;
  icon?: ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  roomId?: string;
}

export const ImageCard = ({ image, label, icon, isSelected, onClick, roomId }: ImageCardProps) => {
  const { playClick, playAmbience } = useAudio();

  const handleClick = () => {
    playClick('option');
    if (roomId) {
      playAmbience(roomId);
    }
    onClick?.();
  };

  return (
    <button
      className={`image-card ${isSelected ? 'image-card--selected' : ''}`}
      onClick={handleClick}
      type="button"
    >
      <div className="image-card__image-wrapper">
        <img src={image} alt={label} className="image-card__image" />
        <div className="image-card__overlay" />
      </div>
      <div className="image-card__label">
        {icon && <span className="image-card__icon">{icon}</span>}
        <span className="image-card__text">{label}</span>
      </div>
    </button>
  );
};

