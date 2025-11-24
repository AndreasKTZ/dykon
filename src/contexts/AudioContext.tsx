import { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export type ClickType = 'button' | 'option';

interface AudioContextType {
  isEnabled: boolean;
  toggleAudio: () => void;
  playClick: (type?: ClickType) => void;
  playAmbience: (roomId: string) => void;
  stopAmbience: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AMBIENCE_MAP: Record<string, string> = {
  'cool': '/sounds/ambience/cool-breeze.m4a',
  'natural': '/sounds/ambience/natural-balance.m4a',
  'soft': '/sounds/ambience/soft-comfort.m4a',
  'cozy': '/sounds/ambience/cozy-warmth.mp3',
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const secondaryClickAudioRef = useRef<HTMLAudioElement | null>(null);
  const ambienceAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    clickAudioRef.current = new Audio('/sounds/click.mp3');
    clickAudioRef.current.volume = 0.15;

    secondaryClickAudioRef.current = new Audio('/sounds/click.m4a');
    secondaryClickAudioRef.current.volume = 0.12;

    ambienceAudioRef.current = new Audio();
    ambienceAudioRef.current.loop = true;
    ambienceAudioRef.current.volume = 0;

    return () => {
      clickAudioRef.current = null;
      secondaryClickAudioRef.current = null;
      if (ambienceAudioRef.current) {
        ambienceAudioRef.current.pause();
        ambienceAudioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  // Pause/resume ambience, når lyden slås til/fra
  useEffect(() => {
    if (!ambienceAudioRef.current) return;
    
    if (isEnabled) {
      if (ambienceAudioRef.current.src && ambienceAudioRef.current.paused) {
        ambienceAudioRef.current.play().catch(() => {});
      }
    } else {
      if (!ambienceAudioRef.current.paused) {
        ambienceAudioRef.current.pause();
      }
    }
  }, [isEnabled]);

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

  const fadeOut = (callback: () => void) => {
    if (!ambienceAudioRef.current) return;
    
    const startVolume = ambienceAudioRef.current.volume;
    const fadeStep = startVolume / 20; // 20 steps
    
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    fadeIntervalRef.current = setInterval(() => {
      if (!ambienceAudioRef.current) return;
      
      if (ambienceAudioRef.current.volume > fadeStep) {
        ambienceAudioRef.current.volume -= fadeStep;
      } else {
        ambienceAudioRef.current.volume = 0;
        ambienceAudioRef.current.pause();
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        callback();
      }
    }, 50);
  };

  const fadeIn = () => {
    if (!ambienceAudioRef.current) return;
    
    ambienceAudioRef.current.volume = 0;
    const targetVolume = 0.05;
    const fadeStep = targetVolume / 20; // 20 steps
    
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    fadeIntervalRef.current = setInterval(() => {
      if (!ambienceAudioRef.current) return;
      
      if (ambienceAudioRef.current.volume < targetVolume - fadeStep) {
        ambienceAudioRef.current.volume += fadeStep;
      } else {
        ambienceAudioRef.current.volume = targetVolume;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 50);
  };

  const playAmbience = (roomId: string) => {
    if (!isEnabled || !ambienceAudioRef.current) return;
    
    const ambienceFile = AMBIENCE_MAP[roomId];
    if (!ambienceFile) return;

    // Hvis der allerede afspilles et anden track, fade ud først
    if (ambienceAudioRef.current.src && !ambienceAudioRef.current.paused) {
      fadeOut(() => {
        if (ambienceAudioRef.current) {
          ambienceAudioRef.current.src = ambienceFile;
          ambienceAudioRef.current.play().then(() => fadeIn()).catch(err => {
            console.log('Ambience playback failed:', err);
          });
        }
      });
    } else {
      // Start på ny
      ambienceAudioRef.current.src = ambienceFile;
      ambienceAudioRef.current.play().then(() => fadeIn()).catch(err => {
        console.log('Ambience playback failed:', err);
      });
    }
  };

  const stopAmbience = () => {
    if (!ambienceAudioRef.current) return;
    
    fadeOut(() => {
      if (ambienceAudioRef.current) {
        ambienceAudioRef.current.src = '';
      }
    });
  };

  return (
    <AudioContext.Provider value={{ isEnabled, toggleAudio, playClick, playAmbience, stopAmbience }}>
      {children}
    </AudioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

