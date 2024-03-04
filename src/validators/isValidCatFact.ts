import { CatFact } from '../types/CatFact.type';

export const isValidCatFact = (data: unknown): data is CatFact => {
  return (
    typeof data === 'object' &&
    '_id' in data &&
    typeof data._id === 'string' &&
    'text' in data &&
    typeof data.text === 'string'
  );
};
