import { isValidCatFact } from './isValidCatFact';
import { CatFact } from '../types/CatFact.type';

describe('isValidCatFact', () => {
  it('returns true for valid CatFact response', () => {
    const validCatFact: CatFact = {
      _id: '1',
      text: 'This is a valid cat fact.',
    };
    expect(isValidCatFact(validCatFact)).toBe(true);
  });

  it('returns false for invalid CatFact response with missing _id', () => {
    const invalidCatFact: Partial<CatFact> = {
      text: 'This cat fact is missing the ID.',
    };
    expect(isValidCatFact(invalidCatFact)).toBe(false);
  });

  it('returns false for invalid CatFact response with missing text', () => {
    const invalidCatFact: Partial<CatFact> = {
      _id: '2',
    };
    expect(isValidCatFact(invalidCatFact)).toBe(false);
  });
});
