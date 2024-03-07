import { calculateTimeToFetch } from './calculateTimeToFetch';

describe('calculateTimeToFetch', () => {
  test('returns 0 when fetchingFrequency is negative', () => {
    expect(calculateTimeToFetch(-10, 0)).toBe(0);
  });

  test('returns 0 when lastTimestamp is in the future', () => {
    const futureTimestamp = new Date().getTime() + 1000;
    expect(calculateTimeToFetch(1000, futureTimestamp)).toBe(0);
  });

  test('returns remaining time when lastTimestamp is in the past', () => {
    const pastTimestamp = new Date().getTime() - 1000;
    expect(calculateTimeToFetch(2000, pastTimestamp)).toBeGreaterThan(0);
  });
});
