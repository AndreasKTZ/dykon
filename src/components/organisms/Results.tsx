import { useState } from 'react';
import { Button } from '../atoms/Button';
import { CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { ComparisonBar } from './ComparisonBar';
import type { Duvet } from '../../types/duvet';

interface ResultsProps {
  duvets: Duvet[];
  onReset: () => void;
}

interface DuvetCardProps {
  duvet: Duvet;
  isFeatured?: boolean;
  isSelected?: boolean;
  onCompareClick: () => void;
}

const DuvetCard = ({ duvet, isFeatured = false, isSelected = false, onCompareClick }: DuvetCardProps) => {
  const handleProductClick = () => {
    window.open('https://jysk.dk/brands/flora-danica', '_blank', 'noopener,noreferrer');
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
              onClick={onCompareClick}
              disabled={isSelected}
            >
              {isSelected ? 'Valgt' : 'Sammenlign'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Results = ({ duvets, onReset }: ResultsProps) => {
  const [selectedForComparison, setSelectedForComparison] = useState<(Duvet | null)[]>([null, null]);

  const bestMatch = duvets[0];
  const alternatives = duvets.slice(1, 4);

  const handleCompareClick = (duvet: Duvet) => {
    // Find første ledige slot
    const firstEmptyIndex = selectedForComparison.findIndex(d => d === null);
    if (firstEmptyIndex !== -1) {
      const newSelected = [...selectedForComparison];
      newSelected[firstEmptyIndex] = duvet;
      setSelectedForComparison(newSelected);
    }
  };

  const handleRemoveFromComparison = (index: number) => {
    const newSelected = [...selectedForComparison];
    newSelected[index] = null;
    setSelectedForComparison(newSelected);
  };

  const isDuvetSelected = (duvet: Duvet) => {
    return selectedForComparison.some(d => d?.id === duvet.id);
  };

  const hasAnySelection = selectedForComparison.some(d => d !== null);

  return (
    <>
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
            <DuvetCard 
              duvet={bestMatch} 
              isFeatured={true}
              isSelected={isDuvetSelected(bestMatch)}
              onCompareClick={() => handleCompareClick(bestMatch)}
            />
          </div>
        )}

        {alternatives.length > 0 && (
          <div className="results__alternatives">
            <h2 className="results__alternatives-title">ALTERNATIVE VALG</h2>
            <div className="results__alternatives-grid">
              {alternatives.map((duvet) => (
                <DuvetCard 
                  key={duvet.id} 
                  duvet={duvet}
                  isSelected={isDuvetSelected(duvet)}
                  onCompareClick={() => handleCompareClick(duvet)}
                />
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

      {hasAnySelection && (
        <ComparisonBar
          selectedDuvets={selectedForComparison}
          onRemoveDuvet={handleRemoveFromComparison}
        />
      )}
    </>
  );
};

