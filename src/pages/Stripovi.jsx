import { useState } from 'react';
import CrudStranica from '../components/CrudStranica.jsx';
import { useServis } from '../hooks/useServis.js';
import { stripoviServis, serijaliServis } from '../services/servisi.js';
import { datumHr, eur, danas } from '../utils/format.js';

// Stripovi: popis s pretragom i filterom "Samo nepročitani", uz dodavanje, uređivanje i brisanje.
export default function Stripovi() {
  const stripovi = useServis(stripoviServis);
  const serijali = useServis(serijaliServis);
  const [trazi, setTrazi] = useState('');
  const [samoNeprocitani, setSamoNeprocitani] = useState(false);

  const nazivSerijala = (sifra) => serijali.stavke.find((s) => s.sifra === sifra)?.naziv ?? '—';
  const t = trazi.trim().toLowerCase();
  const prikazani = stripovi.stavke
    .filter((s) => !samoNeprocitani || !s.procitan)
    .filter((s) => !t || s.naslov.toLowerCase().includes(t) || s.crtac.toLowerCase().includes(t));

  function validate(v) {
    const g = {};
    const godina = Number(v.godina);
    if (!Number.isInteger(godina) || godina < 1900 || godina > new Date().getFullYear() + 1) {
      g.godina = 'Unesite ispravnu godinu izdanja (od 1900.).';
    }
    if (!(Number(v.cijena) > 0)) g.cijena = 'Cijena mora biti veća od 0.';
    if (v.datumDodavanja > danas()) g.datumDodavanja = 'Datum ne može biti u budućnosti.';
    return g;
  }

  return (
    <CrudStranica
      naslov="Stripovi"
      novi="Novi strip"
      servis={stripoviServis}
      stavke={prikazani}
      osvjezi={stripovi.osvjezi}
      prazno={stripovi.stavke.length === 0 ? 'Još nema stripova.' : 'Nijedan strip ne odgovara pretrazi.'}
      validate={validate}
      alat={
        <div className="alat">
          <input type="search" placeholder="Traži po naslovu ili crtaču…" value={trazi} onChange={(e) => setTrazi(e.target.value)} />
          <label className="kvacica-filtar">
            <input type="checkbox" checked={samoNeprocitani} onChange={(e) => setSamoNeprocitani(e.target.checked)} />
            Samo nepročitani
          </label>
        </div>
      }
      fields={[
        { name: 'naslov', label: 'Naslov', required: true },
        { name: 'serijalSifra', label: 'Serijal', type: 'select', asNumber: true, required: true,
          options: serijali.stavke.map((s) => ({ value: s.sifra, label: s.naziv })) },
        { name: 'crtac', label: 'Crtač / autor', required: true },
        { name: 'godina', label: 'Godina izdanja', type: 'number', required: true },
        { name: 'cijena', label: 'Cijena (€)', type: 'number', step: '0.01', required: true },
        { name: 'datumDodavanja', label: 'Datum dodavanja u zbirku', type: 'date', required: true, default: danas() },
        { name: 'procitan', label: 'Pročitan', type: 'checkbox' },
      ]}
      columns={[
        { key: 'naslov', label: 'Naslov' },
        { render: (s) => nazivSerijala(s.serijalSifra), label: 'Serijal' },
        { key: 'crtac', label: 'Crtač' },
        { key: 'godina', label: 'Godina' },
        { render: (s) => eur(s.cijena), label: 'Cijena' },
        { render: (s) => datumHr(s.datumDodavanja), label: 'Dodan' },
        { render: (s) => <span className={s.procitan ? 'oznaka ok' : 'oznaka'}>{s.procitan ? 'Pročitan' : 'Nepročitan'}</span>, label: 'Stanje' },
      ]}
    />
  );
}
