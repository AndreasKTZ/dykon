import { useState } from 'react';
import { Phone, Mail, ChevronDown, Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navigation">
      {/* Top bar */}
      <div className="navigation__topbar">
        <div className="navigation__topbar-content">
          <div className="navigation__topbar-left">
            <a href="tel:+4576840300" className="navigation__topbar-link">
              <Phone size={16} />
              <span>+45 76 84 03 00</span>
            </a>
            <a href="mailto:info@floradanicadyner.dk" className="navigation__topbar-link">
              <Mail size={16} />
              <span>info@floradanicadyner.dk</span>
            </a>
          </div>
          <div className="navigation__topbar-right">
            <button className="navigation__language-btn" aria-label="Vælg sprog">
              <span>Dansk</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="navigation__main">
        <div className="navigation__main-content">
          {/* Desktop nav links */}
          <ul className="navigation__links navigation__links--left">
            <li><a href="/dyner">Dyner</a></li>
            <li><a href="/puder">Puder</a></li>
            <li><a href="https://floradanicadyner.dk/find-butik/" target="_blank" rel="noopener noreferrer">Find butik</a></li>
          </ul>

          <a href="/" className="navigation__logo">
            <img 
              src="/logo.jpg" 
              alt="Hora Danica" 
              height="50"
            />
          </a>

          <ul className="navigation__links navigation__links--right">
            <li><a href="/gode-raad">Gode råd</a></li>
            <li><a href="https://floradanicadyner.dk/om-flora-danica/" target="_blank" rel="noopener noreferrer">Om os</a></li>
            <li><a href="https://floradanicadyner.dk/kontakt/" target="_blank" rel="noopener noreferrer">Kontakt</a></li>
          </ul>

          {/* Mobile hamburger menu */}
          <button 
            className="navigation__hamburger" 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Luk menu' : 'Åbn menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="navigation__mobile-menu">
            <ul className="navigation__mobile-links">
              <li><a href="/dyner" onClick={toggleMobileMenu}>Dyner</a></li>
              <li><a href="/puder" onClick={toggleMobileMenu}>Puder</a></li>
              <li><a href="https://floradanicadyner.dk/find-butik/" onClick={toggleMobileMenu}>Find butik</a></li>
              <li><a href="/gode-raad" onClick={toggleMobileMenu}>Gode råd</a></li>
              <li><a href="https://floradanicadyner.dk/om-flora-danica/" onClick={toggleMobileMenu}>Om os</a></li>
              <li><a href="https://floradanicadyner.dk/kontakt/" onClick={toggleMobileMenu}>Kontakt</a></li>
            </ul>
            <div className="navigation__mobile-language">
              <button className="navigation__mobile-language-btn" aria-label="Vælg sprog">
                <span>Dansk</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

