import { Button } from '../atoms/Button';
import { ArrowRight, Clock, Users, Sparkles, Tags } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
  onViewProducts: () => void;
}

export const IntroScreen = ({ onStart, onViewProducts }: IntroScreenProps) => {
  return (
    <div className="intro-screen">
      <div className="intro-screen__image-section">
        <img 
          src="/clouds.png" 
          alt="Find din ideelle dyne" 
          className="intro-screen__image"
        />
        <h1 className="intro-screen__title">Find din ideelle dyne</h1>
      </div>

      <div className="intro-screen__content">
        <p className="intro-screen__description">
          Oplev, hvordan det føles at finde den helt rigtige Flora Danica dyne – skabt med naturlige materialer, dansk håndværk og sans for detaljen. Vi guider dig gennem få rolige trin og matcher dig med din ideelle komfort.
        </p>

        <div className="intro-screen__features">
          <div className="intro-screen__feature">
            <Clock size={24} />
            <span>Under ét minut</span>
          </div>
          <span className="intro-screen__separator">•</span>
          <div className="intro-screen__feature">
            <Users size={24} />
            <span>Personlig anbefaling</span>
          </div>
          <span className="intro-screen__separator">•</span>
          <div className="intro-screen__feature">
            <Sparkles size={24} />
            <span>Tilpasset din komfort</span>
          </div>
        </div>

        <div className="intro-screen__actions">
          <Button 
            variant="primary" 
            icon={<ArrowRight />}
            onClick={onStart}
          >
            Gå i gang
          </Button>
          <Button 
            variant="outline" 
            icon={<Tags />}
            iconPosition="left"
            onClick={onViewProducts}
          >
            Se alle produkter
          </Button>
        </div>
      </div>
    </div>
  );
};

