import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '../atoms/Button';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../../contexts/AudioContext';

interface RangeSliderProps {
  title: string;
  subtitle?: string;
  leftLabel: string;
  rightLabel: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  showAudioButton?: boolean;
}

export const RangeSlider = ({
  title,
  subtitle,
  leftLabel,
  rightLabel,
  min = 0,
  max = 100,
  defaultValue = 50,
  onChange,
  showAudioButton = true
}: RangeSliderProps) => {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const { isEnabled, toggleAudio } = useAudio();

  const percentage = ((value - min) / (max - min)) * 100;

  const updateValue = useCallback((clientX: number) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = x / rect.width;
    const newValue = Math.round(min + percent * (max - min));
    
    setValue(newValue);
    onChange?.(newValue);
  }, [min, max, onChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    updateValue(e.clientX);
  }, [updateValue]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updateValue(e.clientX);
    }
  }, [isDragging, updateValue]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    updateValue(e.touches[0].clientX);
  }, [updateValue]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      updateValue(e.touches[0].clientX);
    }
  }, [isDragging, updateValue]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newValue = value;
    
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, value - 1);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, value + 1);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    e.preventDefault();
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="range-slider">
      <div className="range-slider__header">
        <div className="range-slider__header-content">
          <div className="range-slider__header-text">
            <h2 className="range-slider__title">{title}</h2>
            {subtitle && <p className="range-slider__subtitle">{subtitle}</p>}
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
      <div className="range-slider__labels">
        <span className="range-slider__label range-slider__label--left">{leftLabel}</span>
        <span className="range-slider__label range-slider__label--right">{rightLabel}</span>
      </div>
      <div 
        className="range-slider__container"
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="range-slider__track" />
        <div 
          className="range-slider__range" 
          style={{ width: `${percentage}%` }}
        />
        <div 
          className="range-slider__thumb"
          style={{ left: `${percentage}%` }}
          role="slider"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={`${leftLabel} til ${rightLabel}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};
