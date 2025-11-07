import { Button } from '../atoms/Button';
import { CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import type { Duvet } from '../../types/duvet';

interface ResultsProps {
  duvets: Duvet[];
  onReset: () => void;
}

interface DuvetCardProps {
  duvet: Duvet;
  isFeatured?: boolean;
}

const DuvetCard = ({ duvet, isFeatured = false }: DuvetCardProps) => {
  const handleProductClick = () => {
    window.open('https://jysk.dk/brands/flora-danica', '_blank', 'noopener,noreferrer');
  };

  const handleCompareClick = () => {
    console.log('Compare duvet:', duvet.id);
    // Sammenlign funktionalitet kommer senere
  };

  return (
    <div className={`duvet-card ${isFeatured ? 'duvet-card--featured' : ''}`}>
      <div className="duvet-card__image-container">
        <img 
          src={duvet.image} 
          alt={duvet.name} 
          className="duvet-card__image"
        />
      </div>
      
      <div className="duvet-card__content">
        <h3 className="duvet-card__name">{duvet.name}</h3>
        <p className="duvet-card__description">{duvet.description}</p>
        
        <ul className="duvet-card__features">
          {duvet.features.map((feature, index) => (
            <li key={index} className="duvet-card__feature">
              <CheckCircle2 size={16} className="duvet-card__feature-icon" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="duvet-card__footer">
          <div className="duvet-card__price">
            <span className="duvet-card__price-amount">
              {duvet.price.toLocaleString('da-DK')},-
            </span>
            <span className="duvet-card__price-label"> / stk</span>
          </div>
          
          <div className="duvet-card__actions">
            <Button 
              variant="primary" 
              icon={<ArrowRight />}
              onClick={handleProductClick}
            >
              Se produkt
            </Button>
            <Button 
              variant="outline"
              onClick={handleCompareClick}
            >
              Sammenlign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Results = ({ duvets, onReset }: ResultsProps) => {
  const bestMatch = duvets[0];
  const alternatives = duvets.slice(1, 4);

  return (
    <div className="results">
      <div className="results__header">
        <CheckCircle2 size={48} className="results__header-icon" />
        <h1 className="results__title">Din ideelle dyne er fundet!</h1>
        <p className="results__subtitle">
          Vi har matchet dig med den Flora Danica dyne, der passer perfekt til dine præferencer.
        </p>
      </div>

      {bestMatch && (
        <div className="results__best-match">
          <DuvetCard duvet={bestMatch} isFeatured={true} />
        </div>
      )}

      {alternatives.length > 0 && (
        <div className="results__alternatives">
          <h2 className="results__alternatives-title">ALTERNATIVE VALG</h2>
          <div className="results__alternatives-grid">
            {alternatives.map((duvet) => (
              <DuvetCard key={duvet.id} duvet={duvet} />
            ))}
          </div>
        </div>
      )}

      <div className="results__actions">
        <Button 
          variant="outline" 
          icon={<RotateCcw />}
          iconPosition="left"
          onClick={onReset}
        >
          Start forfra
        </Button>
        <Button 
          variant="text"
          onClick={() => window.open('https://jysk.dk/brands/flora-danica', '_blank', 'noopener,noreferrer')}
        >
          Se alle produkter
        </Button>
      </div>
    </div>
  );
};

