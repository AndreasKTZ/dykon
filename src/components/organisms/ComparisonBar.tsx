import { useState, useEffect } from 'react';
import { Button } from '../atoms/Button';
import { X, ChevronDown, CheckCircle2 } from 'lucide-react';
import type { Duvet } from '../../types/duvet';

interface ComparisonBarProps {
  selectedDuvets: (Duvet | null)[];
  onRemoveDuvet: (index: number) => void;
}

export const ComparisonBar = ({ selectedDuvets, onRemoveDuvet }: ComparisonBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasFirstDuvet = selectedDuvets[0] !== null;
  const hasSecondDuvet = selectedDuvets[1] !== null;
  const canCompare = hasFirstDuvet && hasSecondDuvet;

  const duvet1 = selectedDuvets[0];
  const duvet2 = selectedDuvets[1];

  // Luk sammenligning hvis en dyne fjernes
  useEffect(() => {
    if (isExpanded && !canCompare) {
      setIsExpanded(false);
    }
  }, [canCompare, isExpanded]);

  // Håndter ESC key for at lukke
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  const getWeightLabel = (weight: string) => {
    const labels: Record<string, string> = {
      'light': 'Let',
      'medium': 'Medium',
      'heavy': 'Tung'
    };
    return labels[weight] || weight;
  };

  const getSeasonLabel = (season: string) => {
    const labels: Record<string, string> = {
      'summer': 'Sommer',
      'all-year': 'Hele året',
      'winter': 'Vinter'
    };
    return labels[season] || season;
  };

  const isBetter = (value1: number, value2: number, higher: boolean = true) => {
    return higher ? value1 > value2 : value1 < value2;
  };

  // Vis kun hvis mindst én dyne er valgt
  if (!hasFirstDuvet && !hasSecondDuvet) {
    return null;
  }

  return (
    <div className={`comparison-bar ${isExpanded ? 'comparison-bar--expanded' : ''}`}>
      <div className="comparison-bar__wrapper">
        {/* Collapsed View */}
        {!isExpanded && (
          <div className="comparison-bar__compact">
            <div className="comparison-bar__compact-items">
              {duvet1 && (
                <div className="comparison-bar__compact-item">
                  <img src={duvet1.image} alt={duvet1.name} className="comparison-bar__compact-image" />
                  <button
                    className="comparison-bar__compact-remove"
                    onClick={() => onRemoveDuvet(0)}
                    aria-label="Fjern"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              {duvet2 && (
                <div className="comparison-bar__compact-item">
                  <img src={duvet2.image} alt={duvet2.name} className="comparison-bar__compact-image" />
                  <button
                    className="comparison-bar__compact-remove"
                    onClick={() => onRemoveDuvet(1)}
                    aria-label="Fjern"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              {!duvet1 && (
                <div className="comparison-bar__compact-placeholder">
                  <span>+</span>
                </div>
              )}
              {!duvet2 && (
                <div className="comparison-bar__compact-placeholder">
                  <span>+</span>
                </div>
              )}
            </div>
            
            <Button
              variant="primary"
              onClick={() => setIsExpanded(true)}
              disabled={!canCompare}
              className="comparison-bar__compact-button"
            >
              Sammenlign ({(duvet1 ? 1 : 0) + (duvet2 ? 1 : 0)}/2)
            </Button>
          </div>
        )}

        {/* Expanded View */}
        {isExpanded && duvet1 && duvet2 && (
          <div className="comparison-bar__expanded-content">
            {/* Header */}
            <div className="comparison-bar__expanded-header">
              <h2 className="comparison-bar__expanded-title">Sammenligning</h2>
              <button
                className="comparison-bar__collapse"
                onClick={() => setIsExpanded(false)}
                aria-label="Luk sammenligning"
              >
                <ChevronDown size={24} />
              </button>
            </div>

            {/* Mobile: Simple side-by-side comparison */}
            <div className="comparison-bar__mobile-view">
              <div className="comparison-bar__mobile-images">
                <div className="comparison-bar__mobile-image-wrapper">
                  <img src={duvet1.image} alt={duvet1.name} className="comparison-bar__mobile-img" />
                  <button
                    className="comparison-bar__mobile-close"
                    onClick={() => onRemoveDuvet(0)}
                    aria-label="Fjern"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="comparison-bar__mobile-image-wrapper">
                  <img src={duvet2.image} alt={duvet2.name} className="comparison-bar__mobile-img" />
                  <button
                    className="comparison-bar__mobile-close"
                    onClick={() => onRemoveDuvet(1)}
                    aria-label="Fjern"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="comparison-bar__mobile-comparison">
                <div className="comparison-bar__mobile-row">
                  <div className="comparison-bar__mobile-label">Navn</div>
                  <div className="comparison-bar__mobile-values">
                    <div className="comparison-bar__mobile-val">{duvet1.name}</div>
                    <div className="comparison-bar__mobile-val">{duvet2.name}</div>
                  </div>
                </div>

                <div className="comparison-bar__mobile-row">
                  <div className="comparison-bar__mobile-label">Pris</div>
                  <div className="comparison-bar__mobile-values">
                    <div className={`comparison-bar__mobile-val ${isBetter(duvet1.price, duvet2.price, false) ? 'comparison-bar__mobile-val--better' : ''}`}>
                      {duvet1.price.toLocaleString('da-DK')} kr
                    </div>
                    <div className={`comparison-bar__mobile-val ${isBetter(duvet2.price, duvet1.price, false) ? 'comparison-bar__mobile-val--better' : ''}`}>
                      {duvet2.price.toLocaleString('da-DK')} kr
                    </div>
                  </div>
                </div>

                <div className="comparison-bar__mobile-row">
                  <div className="comparison-bar__mobile-label">Kvalitet</div>
                  <div className="comparison-bar__mobile-values">
                    <div className="comparison-bar__mobile-val">{duvet1.specifications.quality}</div>
                    <div className="comparison-bar__mobile-val">{duvet2.specifications.quality}</div>
                  </div>
                </div>

                <div className="comparison-bar__mobile-row">
                  <div className="comparison-bar__mobile-label">Varme</div>
                  <div className="comparison-bar__mobile-values">
                    <div className="comparison-bar__mobile-val">{duvet1.specifications.insulationLevel}</div>
                    <div className="comparison-bar__mobile-val">{duvet2.specifications.insulationLevel}</div>
                  </div>
                </div>

                <div className="comparison-bar__mobile-row">
                  <div className="comparison-bar__mobile-label">Vægt</div>
                  <div className="comparison-bar__mobile-values">
                    <div className="comparison-bar__mobile-val">
                      {duvet1.variants?.[0]?.fillWeight || getWeightLabel(duvet1.characteristics.weight)}
                    </div>
                    <div className="comparison-bar__mobile-val">
                      {duvet2.variants?.[0]?.fillWeight || getWeightLabel(duvet2.characteristics.weight)}
                    </div>
                  </div>
                </div>

                <div className="comparison-bar__mobile-row">
                  <div className="comparison-bar__mobile-label">Sæson</div>
                  <div className="comparison-bar__mobile-values">
                    <div className="comparison-bar__mobile-val">{duvet1.seasons.map(s => getSeasonLabel(s)).join(', ')}</div>
                    <div className="comparison-bar__mobile-val">{duvet2.seasons.map(s => getSeasonLabel(s)).join(', ')}</div>
                  </div>
                </div>

                <div className="comparison-bar__mobile-row">
                  <div className="comparison-bar__mobile-label">Materiale</div>
                  <div className="comparison-bar__mobile-values">
                    <div className="comparison-bar__mobile-val">{duvet1.specifications.casing}</div>
                    <div className="comparison-bar__mobile-val">{duvet2.specifications.casing}</div>
                  </div>
                </div>

                <div className="comparison-bar__mobile-row">
                  <div className="comparison-bar__mobile-label">Fyldeevne</div>
                  <div className="comparison-bar__mobile-values">
                    <div className={`comparison-bar__mobile-val ${isBetter(duvet1.characteristics.fillPower, duvet2.characteristics.fillPower) ? 'comparison-bar__mobile-val--better' : ''}`}>
                      {duvet1.characteristics.fillPower}
                    </div>
                    <div className={`comparison-bar__mobile-val ${isBetter(duvet2.characteristics.fillPower, duvet1.characteristics.fillPower) ? 'comparison-bar__mobile-val--better' : ''}`}>
                      {duvet2.characteristics.fillPower}
                    </div>
                  </div>
                </div>

                <div className="comparison-bar__mobile-row">
                  <div className="comparison-bar__mobile-label">Størrelser</div>
                  <div className="comparison-bar__mobile-values">
                    <div className="comparison-bar__mobile-val">
                      {duvet1.specifications.dimensions.availableSizes?.join(', ') || `${duvet1.specifications.dimensions.width}x${duvet1.specifications.dimensions.length}cm`}
                    </div>
                    <div className="comparison-bar__mobile-val">
                      {duvet2.specifications.dimensions.availableSizes?.join(', ') || `${duvet2.specifications.dimensions.width}x${duvet2.specifications.dimensions.length}cm`}
                    </div>
                  </div>
                </div>

                <div className="comparison-bar__mobile-row">
                  <div className="comparison-bar__mobile-label">Garanti</div>
                  <div className="comparison-bar__mobile-values">
                    <div className="comparison-bar__mobile-val">{duvet1.specifications.warranty}</div>
                    <div className="comparison-bar__mobile-val">{duvet2.specifications.warranty}</div>
                  </div>
                </div>

                <div className="comparison-bar__mobile-row">
                  <div className="comparison-bar__mobile-label">Certificeringer</div>
                  <div className="comparison-bar__mobile-values">
                    <div className="comparison-bar__mobile-val">
                      <div className="comparison-bar__mobile-badges">
                        {duvet1.specifications.certifications.oekotex && <span>OEKO-TEX</span>}
                        {duvet1.specifications.certifications.nomite && <span>NOMITE</span>}
                        {duvet1.specifications.certifications.downafresh && <span>Downafresh</span>}
                        {duvet1.specifications.certifications.downpass && <span>DOWNPASS</span>}
                      </div>
                    </div>
                    <div className="comparison-bar__mobile-val">
                      <div className="comparison-bar__mobile-badges">
                        {duvet2.specifications.certifications.oekotex && <span>OEKO-TEX</span>}
                        {duvet2.specifications.certifications.nomite && <span>NOMITE</span>}
                        {duvet2.specifications.certifications.downafresh && <span>Downafresh</span>}
                        {duvet2.specifications.certifications.downpass && <span>DOWNPASS</span>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="comparison-bar__mobile-row">
                  <div className="comparison-bar__mobile-label">Vask</div>
                  <div className="comparison-bar__mobile-values">
                    <div className="comparison-bar__mobile-val">{duvet1.specifications.care.wash}</div>
                    <div className="comparison-bar__mobile-val">{duvet2.specifications.care.wash}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Table comparison */}
            <div className="comparison-bar__table">
              {/* Duvet names */}
              <div className="comparison-bar__row comparison-bar__row--header">
                <div className="comparison-bar__cell comparison-bar__cell--label"></div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  <h3>{duvet1.name}</h3>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  <h3>{duvet2.name}</h3>
                </div>
              </div>

              {/* Images */}
              <div className="comparison-bar__row">
                <div className="comparison-bar__cell comparison-bar__cell--label">
                  <strong>Billede</strong>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  <img src={duvet1.image} alt={duvet1.name} className="comparison-bar__table-image" />
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  <img src={duvet2.image} alt={duvet2.name} className="comparison-bar__table-image" />
                </div>
              </div>

              {/* Price */}
              <div className="comparison-bar__row">
                <div className="comparison-bar__cell comparison-bar__cell--label">
                  <strong>Pris</strong>
                </div>
                <div 
                  className={`comparison-bar__cell comparison-bar__cell--value ${
                    isBetter(duvet1.price, duvet2.price, false) ? 'comparison-bar__cell--better' : ''
                  }`}
                >
                  {duvet1.price.toLocaleString('da-DK')} kr
                </div>
                <div 
                  className={`comparison-bar__cell comparison-bar__cell--value ${
                    isBetter(duvet2.price, duvet1.price, false) ? 'comparison-bar__cell--better' : ''
                  }`}
                >
                  {duvet2.price.toLocaleString('da-DK')} kr
                </div>
              </div>

              {/* Quality */}
              <div className="comparison-bar__row">
                <div className="comparison-bar__cell comparison-bar__cell--label">
                  <strong>Kvalitet</strong>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  {duvet1.specifications.quality}
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  {duvet2.specifications.quality}
                </div>
              </div>

              {/* Warmth & Insulation */}
              <div className="comparison-bar__row">
                <div className="comparison-bar__cell comparison-bar__cell--label">
                  <strong>Varmeniveau</strong>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  {duvet1.specifications.insulationLevel}
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  {duvet2.specifications.insulationLevel}
                </div>
              </div>

              {/* Weight */}
              <div className="comparison-bar__row">
                <div className="comparison-bar__cell comparison-bar__cell--label">
                  <strong>Vægt</strong>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  {duvet1.variants && duvet1.variants.length > 0 ? (
                    <>
                      Fyld: {duvet1.variants[0].fillWeight}
                      {duvet1.variants[0].totalWeight && (
                        <>
                          <br />
                          <span className="comparison-bar__detail">
                            Total: {duvet1.variants[0].totalWeight}
                          </span>
                        </>
                      )}
                    </>
                  ) : (
                    getWeightLabel(duvet1.characteristics.weight)
                  )}
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  {duvet2.variants && duvet2.variants.length > 0 ? (
                    <>
                      Fyld: {duvet2.variants[0].fillWeight}
                      {duvet2.variants[0].totalWeight && (
                        <>
                          <br />
                          <span className="comparison-bar__detail">
                            Total: {duvet2.variants[0].totalWeight}
                          </span>
                        </>
                      )}
                    </>
                  ) : (
                    getWeightLabel(duvet2.characteristics.weight)
                  )}
                </div>
              </div>

              {/* Seasons */}
              <div className="comparison-bar__row">
                <div className="comparison-bar__cell comparison-bar__cell--label">
                  <strong>Sæson</strong>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  <div className="comparison-bar__badges">
                    {duvet1.seasons.map((season) => (
                      <span key={season} className="comparison-bar__badge">
                        {getSeasonLabel(season)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  <div className="comparison-bar__badges">
                    {duvet2.seasons.map((season) => (
                      <span key={season} className="comparison-bar__badge">
                        {getSeasonLabel(season)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fill */}
              <div className="comparison-bar__row">
                <div className="comparison-bar__cell comparison-bar__cell--label">
                  <strong>Fyld</strong>
                </div>
                <div 
                  className={`comparison-bar__cell comparison-bar__cell--value ${
                    isBetter(duvet1.characteristics.fillPower, duvet2.characteristics.fillPower) 
                      ? 'comparison-bar__cell--better' 
                      : ''
                  }`}
                >
                  {duvet1.specifications.filling}
                  <br />
                  <span className="comparison-bar__detail">
                    Fyldeevne: {duvet1.characteristics.fillPower}
                  </span>
                </div>
                <div 
                  className={`comparison-bar__cell comparison-bar__cell--value ${
                    isBetter(duvet2.characteristics.fillPower, duvet1.characteristics.fillPower) 
                      ? 'comparison-bar__cell--better' 
                      : ''
                  }`}
                >
                  {duvet2.specifications.filling}
                  <br />
                  <span className="comparison-bar__detail">
                    Fyldeevne: {duvet2.characteristics.fillPower}
                  </span>
                </div>
              </div>

              {/* Material */}
              <div className="comparison-bar__row">
                <div className="comparison-bar__cell comparison-bar__cell--label">
                  <strong>Materiale</strong>
                </div>
                <div 
                  className={`comparison-bar__cell comparison-bar__cell--value ${
                    isBetter(duvet1.characteristics.threadCount, duvet2.characteristics.threadCount) 
                      ? 'comparison-bar__cell--better' 
                      : ''
                  }`}
                >
                  {duvet1.specifications.casing}
                  <br />
                  <span className="comparison-bar__detail">
                    Trådtæthed: {duvet1.characteristics.threadCount}
                  </span>
                </div>
                <div 
                  className={`comparison-bar__cell comparison-bar__cell--value ${
                    isBetter(duvet2.characteristics.threadCount, duvet1.characteristics.threadCount) 
                      ? 'comparison-bar__cell--better' 
                      : ''
                  }`}
                >
                  {duvet2.specifications.casing}
                  <br />
                  <span className="comparison-bar__detail">
                    Trådtæthed: {duvet2.characteristics.threadCount}
                  </span>
                </div>
              </div>

              {/* Dimensions & Variants */}
              <div className="comparison-bar__row">
                <div className="comparison-bar__cell comparison-bar__cell--label">
                  <strong>Størrelser</strong>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  <div className="comparison-bar__dimensions">
                    {duvet1.specifications.dimensions.availableSizes?.map((size) => (
                      <span key={size} className="comparison-bar__dimension">{size}</span>
                    )) || (
                      (() => {
                        const dims = duvet1.specifications.dimensions;
                        if ('width' in dims && 'length' in dims) {
                          return <span className="comparison-bar__dimension">{dims.width}x{dims.length}cm</span>;
                        }
                        return Object.entries(dims).map(([size, available]) => 
                          available ? <span key={size} className="comparison-bar__dimension">{size}</span> : null
                        );
                      })()
                    )}
                  </div>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  <div className="comparison-bar__dimensions">
                    {duvet2.specifications.dimensions.availableSizes?.map((size) => (
                      <span key={size} className="comparison-bar__dimension">{size}</span>
                    )) || (
                      (() => {
                        const dims = duvet2.specifications.dimensions;
                        if ('width' in dims && 'length' in dims) {
                          return <span className="comparison-bar__dimension">{dims.width}x{dims.length}cm</span>;
                        }
                        return Object.entries(dims).map(([size, available]) => 
                          available ? <span key={size} className="comparison-bar__dimension">{size}</span> : null
                        );
                      })()
                    )}
                  </div>
                </div>
              </div>

              {/* Warranty */}
              <div className="comparison-bar__row">
                <div className="comparison-bar__cell comparison-bar__cell--label">
                  <strong>Garanti</strong>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  {duvet1.specifications.warranty}
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  {duvet2.specifications.warranty}
                </div>
              </div>

              {/* Certifications */}
              <div className="comparison-bar__row">
                <div className="comparison-bar__cell comparison-bar__cell--label">
                  <strong>Certificeringer</strong>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  <div className="comparison-bar__badges">
                    {duvet1.specifications.certifications.oekotex && (
                      <span className="comparison-bar__badge">OEKO-TEX</span>
                    )}
                    {duvet1.specifications.certifications.nomite && (
                      <span className="comparison-bar__badge">NOMITE</span>
                    )}
                    {duvet1.specifications.certifications.downafresh && (
                      <span className="comparison-bar__badge">Downafresh</span>
                    )}
                    {duvet1.specifications.certifications.downpass && (
                      <span className="comparison-bar__badge">DOWNPASS</span>
                    )}
                    {duvet1.specifications.certifications.allergyFriendly && (
                      <span className="comparison-bar__badge">Allergivenlig</span>
                    )}
                  </div>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  <div className="comparison-bar__badges">
                    {duvet2.specifications.certifications.oekotex && (
                      <span className="comparison-bar__badge">OEKO-TEX</span>
                    )}
                    {duvet2.specifications.certifications.nomite && (
                      <span className="comparison-bar__badge">NOMITE</span>
                    )}
                    {duvet2.specifications.certifications.downafresh && (
                      <span className="comparison-bar__badge">Downafresh</span>
                    )}
                    {duvet2.specifications.certifications.downpass && (
                      <span className="comparison-bar__badge">DOWNPASS</span>
                    )}
                    {duvet2.specifications.certifications.allergyFriendly && (
                      <span className="comparison-bar__badge">Allergivenlig</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Care */}
              <div className="comparison-bar__row">
                <div className="comparison-bar__cell comparison-bar__cell--label">
                  <strong>Vask</strong>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  {duvet1.specifications.care.wash}
                  {duvet1.specifications.care.tumbleDry !== 'Do not tumble dry' && (
                    <><br /><span className="comparison-bar__detail">Tørretumbler OK</span></>
                  )}
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  {duvet2.specifications.care.wash}
                  {duvet2.specifications.care.tumbleDry !== 'Do not tumble dry' && (
                    <><br /><span className="comparison-bar__detail">Tørretumbler OK</span></>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="comparison-bar__row">
                <div className="comparison-bar__cell comparison-bar__cell--label">
                  <strong>Egenskaber</strong>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  <ul className="comparison-bar__features">
                    {duvet1.features.map((feature, index) => (
                      <li key={index}>
                        <CheckCircle2 size={14} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="comparison-bar__cell comparison-bar__cell--value">
                  <ul className="comparison-bar__features">
                    {duvet2.features.map((feature, index) => (
                      <li key={index}>
                        <CheckCircle2 size={14} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

