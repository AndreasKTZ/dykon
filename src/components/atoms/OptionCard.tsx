import type { ReactNode } from 'react';

interface OptionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const OptionCard = ({ icon, title, description, isSelected, onClick }: OptionCardProps) => {
  return (
    <button
      className={`option-card ${isSelected ? 'option-card--selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      <div className="option-card__icon">{icon}</div>
      <h3 className="option-card__title">{title}</h3>
      <p className="option-card__description">{description}</p>
    </button>
  );
};

