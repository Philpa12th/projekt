import CrudStranica from '../components/CrudStranica.jsx';
import { useServis } from '../hooks/useServis.js';
import { serijaliServis, stripoviServis } from '../services/servisi.js';

// Serijali: naziv, izdavač i opis; serijal sa stripovima ne može se obrisati.
export default function Serijali() {
  const serijali = useServis(serijaliServis);
  const stripovi = useServis(stripoviServis);
  const brojStripova = (sifra) => stripovi.stavke.filter((s) => s.serijalSifra === sifra).length;

  return (
    <CrudStranica
      naslov="Serijali"
      novi="Novi serijal"
      servis={serijaliServis}
      stavke={serijali.stavke}
      osvjezi={serijali.osvjezi}
      prazno="Još nema serijala."
      fields={[
        { name: 'naziv', label: 'Naziv serijala', required: true },
        { name: 'izdavac', label: 'Izdavač', required: true },
        { name: 'opis', label: 'Opis', type: 'textarea' },
      ]}
      columns={[
        { key: 'naziv', label: 'Naziv' },
        { key: 'izdavac', label: 'Izdavač' },
        { render: (s) => s.opis || '—', label: 'Opis' },
        { render: (s) => brojStripova(s.sifra), label: 'Stripova' },
      ]}
      blokirajBrisanje={(s) =>
        brojStripova(s.sifra) > 0
          ? 'Serijal ima stripove i ne može se obrisati. Prvo obrišite njegove stripove.'
          : null}
    />
  );
}
