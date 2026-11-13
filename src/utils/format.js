// Datum iz oblika 2026-10-05 u 05. 10. 2026.
export const datumHr = (d) => (d ? d.split('-').reverse().join('. ') + '.' : '');

export const eur = (iznos) =>
  new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' }).format(iznos);

export const danas = () => new Date().toISOString().slice(0, 10);
