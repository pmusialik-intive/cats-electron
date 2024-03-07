import {
  defaultFetchingFrequencyValue,
  fetchingFrequencyOptions,
} from '../constants/fetching-frequency';
import { FETCHING_FREQUENCY } from '../constants/local-storage';
import { localStorageMock } from '../test-utils/localStorageMock';
import {
  getStoredFetchingFrequency,
  isValidFetchingFrequency,
  storeFetchingFrequency,
} from './fetching-frequency';

describe('isValidFetchingFrequency', () => {
  it('returns true for a valid frequency', () => {
    expect(isValidFetchingFrequency(fetchingFrequencyOptions[0].value)).toBeTruthy();
  });

  it('returns false for an invalid frequency', () => {
    const invalidFrequency999 = 999;
    const invalidFrequency0 = 0;

    expect(isValidFetchingFrequency(invalidFrequency999)).toBeFalsy();
    expect(isValidFetchingFrequency(invalidFrequency0)).toBeFalsy();
  });
});

describe('getStoredFetchingFrequency', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('returns default value if nothing is stored', () => {
    expect(getStoredFetchingFrequency()).toBe(defaultFetchingFrequencyValue);
  });

  it('returns stored value if it is valid', () => {
    const validFrequency = fetchingFrequencyOptions[0].value;
    localStorageMock.setItem(FETCHING_FREQUENCY, `${validFrequency}`);
    expect(getStoredFetchingFrequency()).toBe(validFrequency);
  });
});

describe('storeFetchingFrequency', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('stores a valid frequency', () => {
    const validFrequency = fetchingFrequencyOptions[0].value;
    storeFetchingFrequency(validFrequency);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(FETCHING_FREQUENCY, `${validFrequency}`);
  });

  it('does not store an invalid frequency', () => {
    const invalidFrequency = 999;
    storeFetchingFrequency(invalidFrequency);
    expect(localStorageMock.setItem).not.toHaveBeenCalledWith(
      FETCHING_FREQUENCY,
      `${invalidFrequency}`,
    );
  });
});
