import { getRandomCatFact } from './getRandomCatFact';
import { CAT_FACT_URL } from './catFactUrls';
import { isValidCatFact } from '../validators/isValidCatFact';

describe('getRandomCatFact', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('fetches and returns a valid cat fact', async () => {
    const mockCatFact = { text: 'Cats can jump up to six times their length.', _id: '1' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockCatFact),
    });

    const catFact = await getRandomCatFact();

    expect(fetch).toHaveBeenCalledWith(CAT_FACT_URL.random);
    expect(catFact).toEqual(mockCatFact);
    expect(isValidCatFact(catFact)).toBeTruthy();
  });

  test('throws an error for an invalid cat fact response', async () => {
    const invalidCatFact = { incorrectField: 'Invalid data structure' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(invalidCatFact),
    });

    await expect(getRandomCatFact()).rejects.toThrow('Invalid cat fact response');

    expect(fetch).toHaveBeenCalledWith(CAT_FACT_URL.random);
    expect(isValidCatFact(invalidCatFact)).toBeFalsy();
  });

  test('handles fetch failure gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getRandomCatFact()).rejects.toThrow('Failed to fetch cat fact');

    expect(fetch).toHaveBeenCalledWith(CAT_FACT_URL.random);
  });
});
