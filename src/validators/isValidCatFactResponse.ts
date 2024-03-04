import { CatFact } from '../types/CatFact.type';

export const isValidCatFactResponse = (data: unknown): data is CatFact => {
  return typeof data === 'object' && '_id' in data && 'text' in data && 'deleted' in data;
};
