export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__main-content">
          <div className="footer__left">
            <img 
              src="/logo.jpg" 
              alt="Flora Danica" 
              className="footer__logo"
            />
            <address className="footer__business-info">
              <p>Kongsbjerg 15, 6640 Lunderskov</p>
              <p>CVR: 19778983</p>
              <p>
                Tlf.: <a href="tel:+4576840300">+45 76 84 03 00</a>
              </p>
              <p>
                Email: <a href="mailto:info@floradanicadyner.dk">info@floradanicadyner.dk</a>
              </p>
            </address>
          </div>

          <div className="footer__right">
            <div className="footer__category">
              <h3 className="footer__category-title">Information</h3>
              <ul className="footer__links">
                <li><a href="/find-butik">Find butik</a></li>
                <li><a href="/om-os">Om os</a></li>
                <li><a href="/gode-raad">Gode råd</a></li>
                <li><a href="/kontakt">Kontakt</a></li>
              </ul>
            </div>

            <div className="footer__category">
              <h3 className="footer__category-title">Gode råd</h3>
              <ul className="footer__links">
                <li><a href="/sovn-og-dognrytme">Søvn og døgnrytme</a></li>
                <li><a href="/vedligeholdelse-og-vask">Vedligeholdelse og vask</a></li>
                <li><a href="/valg-den-rigtige-dyne">Vælg den rigtige dyne</a></li>
                <li><a href="/ofte-stillede-sporgsmal">Ofte stillede spørgsmål</a></li>
              </ul>
            </div>

            <div className="footer__category">
              <h3 className="footer__category-title">Vi tænker på dig</h3>
              <div className="footer__certifications">
                <img 
                  src="/certs.png" 
                  alt="Certificeringer" 
                  className="footer__certifications-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-content">
          <p className="footer__copyright">
            Flora Danica © 2025 – Alle rettigheder forbeholdes.
          </p>
          <a href="/privatlivspolitik" className="footer__privacy">
            Privatlivspolitik
          </a>
        </div>
      </div>
    </footer>
  );
};

