import { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface AudioContextType {
  isEnabled: boolean;
  toggleAudio: () => void;
  playSound: (soundId: string) => void;
  stopSound: (soundId: string) => void;
  stopAllSounds: () => void;
  updateSoundFromChoice: (stepId: string, choiceId: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Mapping af valg til lyde
const SOUND_MAP: Record<string, string> = {
  // Stemning valg
  'stemning-cool': '/sounds/wind.mp3',
  'stemning-natural': '/sounds/nature.mp3',
  'stemning-soft': '/sounds/soft-rain.mp3',
  'stemning-cozy': '/sounds/fireplace.mp3',
  
  // Temperatur valg
  'temperatur-cold': '/sounds/winter.mp3',
  'temperatur-balanced': '/sounds/ambient.mp3',
  'temperatur-warm': '/sounds/summer-night.mp3',
  
  // Sæson valg
  'sæson-summer': '/sounds/summer-night.mp3',
  'sæson-all-year': '/sounds/ambient.mp3',
  'sæson-winter': '/sounds/winter.mp3',
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Opret audio element
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.05; // Subtil lydstyrke

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isEnabled && currentSound) {
      const soundFile = SOUND_MAP[currentSound];
      if (soundFile) {
        audioRef.current.src = soundFile;
        audioRef.current.play().catch(err => {
          console.log('Audio playback failed:', err);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isEnabled, currentSound]);

  const toggleAudio = () => {
    setIsEnabled(prev => !prev);
  };

  const playSound = (soundId: string) => {
    if (!audioRef.current) return;
    
    const soundFile = SOUND_MAP[soundId];
    if (soundFile && isEnabled) {
      audioRef.current.src = soundFile;
      audioRef.current.play().catch(err => {
        console.log('Audio playback failed:', err);
      });
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stopAllSounds = () => {
    stopSound();
    setCurrentSound(null);
  };

  const updateSoundFromChoice = (stepId: string, choiceId: string) => {
    const soundKey = `${stepId}-${choiceId}`;
    setCurrentSound(soundKey);
  };

  return (
    <AudioContext.Provider
      value={{
        isEnabled,
        toggleAudio,
        playSound,
        stopSound,
        stopAllSounds,
        updateSoundFromChoice,
      }}
    >
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

