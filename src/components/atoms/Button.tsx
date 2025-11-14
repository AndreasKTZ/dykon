import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'text';
type IconPosition = 'left' | 'right';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  type = 'button',
  disabled = false,
  ariaLabel,
  className
}: ButtonProps) => {
  const classNames = [
    'button',
    `button--${variant}`,
    icon && 'button--with-icon',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon && iconPosition === 'left' && (
        <span className="button__icon button__icon--left">{icon}</span>
      )}
      <span className="button__text">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="button__icon button__icon--right">{icon}</span>
      )}
    </button>
  );
};

