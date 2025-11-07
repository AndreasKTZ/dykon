import type { ReactNode } from 'react';

interface ImageCardProps {
  image: string;
  label: string;
  icon?: ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

export const ImageCard = ({ image, label, icon, isSelected, onClick }: ImageCardProps) => {
  return (
    <button
      className={`image-card ${isSelected ? 'image-card--selected' : ''}`}
      onClick={onClick}
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

