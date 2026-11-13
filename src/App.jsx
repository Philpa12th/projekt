import Pocetna from './pages/Pocetna.jsx';
import Stripovi from './pages/Stripovi.jsx';
import Serijali from './pages/Serijali.jsx';
import { useHashRoute } from './hooks/useHashRoute.js';
import { STRANICE, NAZIV, AUTOR } from './data/constants.js';

// Zaglavlje s izbornikom, stranica prema adresi (#/stripovi ...) i podnožje.
export default function App() {
  const { stranica, idi } = useHashRoute(STRANICE);

  return (
    <>
      <header className="zaglavlje">
        <button className="logo" onClick={() => idi('pocetna')}>
          {NAZIV}
          <span className="autor">{AUTOR}</span>
        </button>
        <nav className="izbornik">
          {STRANICE.map((s) => (
            <button key={s.id} className={s.id === stranica ? 'aktivna' : ''} onClick={() => idi(s.id)}>
              {s.naziv}
            </button>
          ))}
        </nav>
      </header>
      <main className="sadrzaj">
        {stranica === 'stripovi' ? <Stripovi /> : stranica === 'serijali' ? <Serijali /> : <Pocetna idi={idi} />}
      </main>
      <footer className="podnozje">© {NAZIV}</footer>
    </>
  );
}
