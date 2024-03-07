import { isLastFetchingTimestampValid } from './isLastFetchingTimestampValid';

describe('isLastFetchingTimestampValid', () => {
  test('returns false for undefined timestamp', () => {
    expect(isLastFetchingTimestampValid(undefined)).toBe(false);
  });

  test('returns false for NaN timestamp', () => {
    expect(isLastFetchingTimestampValid(NaN)).toBe(false);
  });

  test('returns false for 0 timestamp', () => {
    expect(isLastFetchingTimestampValid(0)).toBe(false);
  });

  test('returns false for negative timestamp', () => {
    expect(isLastFetchingTimestampValid(-1)).toBe(false);
  });

  test('returns false for timestamp in the future', () => {
    const futureTimestamp = new Date().getTime() + 5000;
    expect(isLastFetchingTimestampValid(futureTimestamp)).toBe(false);
  });

  test('returns true for valid timestamp', () => {
    const pastTimestamp = new Date().getTime() - 1000;
    expect(isLastFetchingTimestampValid(pastTimestamp)).toBe(true);
  });
});
