import { calculateTimeToFetch } from './calculateTimeToFetch';

describe('calculateTimeToFetch', () => {
  test('should return correct remaining time if last fetch was some time ago', () => {
    const fetchingFrequency = 500;
    const lastTimestamp = new Date().getTime();
    const result = calculateTimeToFetch(fetchingFrequency, lastTimestamp);

    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(501);
  });

  test('should return 0 if remaining time is negative', () => {
    const fetchingFrequency = 2000;
    const lastTimestamp = new Date().getTime() - 3000;
    const result = calculateTimeToFetch(fetchingFrequency, lastTimestamp);
    expect(result).toBe(0);
  });
});
