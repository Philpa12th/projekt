import { useServis } from '../hooks/useServis.js';
import { stripoviServis } from '../services/servisi.js';
import { PODNASLOV } from '../data/constants.js';
import { datumHr, eur } from '../utils/format.js';

// Naslovnica: brojke o zbirci i pet zadnje dodanih stripova.
export default function Pocetna({ idi }) {
  const stripovi = useServis(stripoviServis);
  const procitano = stripovi.stavke.filter((s) => s.procitan).length;
  const vrijednost = stripovi.stavke.reduce((zbroj, s) => zbroj + s.cijena, 0);
  const zadnji = [...stripovi.stavke]
    .sort((a, b) => b.datumDodavanja.localeCompare(a.datumDodavanja))
    .slice(0, 5);

  const kutije = [
    { broj: stripovi.stavke.length, tekst: 'Stripova u zbirci', na: 'stripovi' },
    { broj: `${procitano} / ${stripovi.stavke.length}`, tekst: 'Pročitano', na: 'stripovi' },
    { broj: eur(vrijednost), tekst: 'Vrijednost zbirke', na: 'stripovi' },
  ];

  return (
    <>
      <section className="naslovnica">
        <h1 className="zlatno">{PODNASLOV}</h1>
        <p className="uvod">
          Evidencija stripova i serijala na jednom mjestu: što imate, što ste pročitali i koliko zbirka vrijedi.
        </p>
      </section>

      <div className="kutije">
        {kutije.map((k) => (
          <button key={k.tekst} className="kutija statistika" onClick={() => idi(k.na)}>
            <b>{k.broj}</b>
            <span>{k.tekst}</span>
          </button>
        ))}
      </div>

      <h2 className="zlatno">Zadnje dodano</h2>
      <div className="kutija tablica-omot">
        {zadnji.length === 0 ? (
          <p className="prigusen popuna">Zbirka je prazna.</p>
        ) : (
          <table>
            <thead>
              <tr><th>Dodan</th><th>Naslov</th><th>Crtač</th><th>Cijena</th></tr>
            </thead>
            <tbody>
              {zadnji.map((s) => (
                <tr key={s.sifra}>
                  <td>{datumHr(s.datumDodavanja)}</td>
                  <td>{s.naslov}</td>
                  <td>{s.crtac}</td>
                  <td>{eur(s.cijena)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
