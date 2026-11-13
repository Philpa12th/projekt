import { useEffect, useState } from 'react';

// Routing preko # u adresi: #/stripovi, #/serijali. Nepoznata adresa vodi na početnu.
function procitaj(stranice) {
  const id = window.location.hash.replace('#/', '').replace('#', '');
  return stranice.some((s) => s.id === id) ? id : 'pocetna';
}

export function useHashRoute(stranice) {
  const [stranica, setStranica] = useState(() => procitaj(stranice));

  useEffect(() => {
    const naPromjenu = () => setStranica(procitaj(stranice));
    window.addEventListener('hashchange', naPromjenu);
    return () => window.removeEventListener('hashchange', naPromjenu);
  }, [stranice]);

  const idi = (id) => { window.location.hash = `#/${id}`; };
  return { stranica, idi };
}
