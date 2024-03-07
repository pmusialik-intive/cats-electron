import { CatFact } from '../types/CatFact.type';
import { isValidCatFact } from '../validators/isValidCatFact';
import { CAT_FACT_URL } from './catFactUrls';

const INVALID_CAT_FACT = 'Invalid cat fact response';

export async function getRandomCatFact(): Promise<CatFact> {
  try {
    const response = await fetch(CAT_FACT_URL.random);
    const data = await response.json();

    if (!isValidCatFact(data)) {
      throw new Error(INVALID_CAT_FACT);
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.message === INVALID_CAT_FACT) {
      throw error;
    }

    throw new Error('Failed to fetch cat fact');
  }
}
