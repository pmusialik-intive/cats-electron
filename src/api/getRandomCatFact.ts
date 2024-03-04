import { CatFact } from '../types/CatFact.type';
import { isValidCatFactResponse } from '../validators/isValidCatFactResponse';
import { CAT_FACT_URL } from './catFactUrls';

export async function getRandomCatFact(): Promise<CatFact> {
  try {
    const response = await fetch(CAT_FACT_URL.random);
    const data = await response.json();

    if (!isValidCatFactResponse(data)) {
      throw new Error('Invalid cat fact response');
    }

    return data;
  } catch (error) {
    console.error('Error fetching cat fact: ', error);
    throw new Error('Failed to fetch cat fact');
  }
}
