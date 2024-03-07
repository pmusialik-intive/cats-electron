import { isLastTimestampValid } from './isLastTimestampValid';

describe('isLastTimestampValid', () => {
  test('returns false for undefined timestamp', () => {
    expect(isLastTimestampValid(undefined)).toBe(false);
  });

  test('returns false for NaN timestamp', () => {
    expect(isLastTimestampValid(NaN)).toBe(false);
  });

  test('returns false for 0 timestamp', () => {
    expect(isLastTimestampValid(0)).toBe(false);
  });

  test('returns false for negative timestamp', () => {
    expect(isLastTimestampValid(-1)).toBe(false);
  });

  test('returns false for timestamp in the future', () => {
    const futureTimestamp = new Date().getTime() + 5000;
    expect(isLastTimestampValid(futureTimestamp)).toBe(false);
  });

  test('returns true for valid timestamp', () => {
    const pastTimestamp = new Date().getTime() - 1000;
    expect(isLastTimestampValid(pastTimestamp)).toBe(true);
  });
});
