import { napraviServis } from './store.js';
import { SERIJALI, STRIPOVI } from '../data/seed.js';

export const stripoviServis = napraviServis('st_stripovi', STRIPOVI);
export const serijaliServis = napraviServis('st_serijali', SERIJALI);
