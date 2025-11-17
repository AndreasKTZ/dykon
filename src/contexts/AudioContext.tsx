import { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export type ClickType = 'button' | 'option';

interface AudioContextType {
  isEnabled: boolean;
  toggleAudio: () => void;
  playClick: (type?: ClickType) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const secondaryClickAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickAudioRef.current = new Audio('/sounds/click.mp3');
    clickAudioRef.current.volume = 0.15;

    secondaryClickAudioRef.current = new Audio('/sounds/click.m4a');
    secondaryClickAudioRef.current.volume = 0.12;

    return () => {
      clickAudioRef.current = null;
      secondaryClickAudioRef.current = null;
    };
  }, []);

  const toggleAudio = () => {
    setIsEnabled(prev => !prev);
  };

  const playClick = (type: ClickType = 'button') => {
    if (!isEnabled) return;
    
    const audioRef = type === 'button' ? clickAudioRef : secondaryClickAudioRef;
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(err => {
      console.log(`Click sound failed:`, err);
    });
  };

  return (
    <AudioContext.Provider value={{ isEnabled, toggleAudio, playClick }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

