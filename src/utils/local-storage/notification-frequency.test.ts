import {
  defaultNotificationFrequencyValue,
  notificationFrequencyOptions,
} from '../../constants/notification-frequency';
import { STORAGE_KEY } from '../../constants/storage-key';
import { localStorageMock } from '../../test-utils/localStorageMock';
import {
  getStoredNotificationFrequency,
  isValidNotificationFrequency,
  storeNotificationFrequency,
} from './notification-frequency';

describe('isValidNotificationFrequency', () => {
  it('returns true for a valid frequency', () => {
    expect(isValidNotificationFrequency(notificationFrequencyOptions[0].value)).toBeTruthy();
  });

  it('returns false for an invalid frequency', () => {
    const invalidFrequency999 = 999;
    const invalidFrequency0 = 0;

    expect(isValidNotificationFrequency(invalidFrequency999)).toBeFalsy();
    expect(isValidNotificationFrequency(invalidFrequency0)).toBeFalsy();
  });
});

describe('getStoredNotificationFrequency', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('returns default value if nothing is stored', () => {
    expect(getStoredNotificationFrequency()).toBe(defaultNotificationFrequencyValue);
  });

  it('returns stored value if it is valid', () => {
    const validFrequency = notificationFrequencyOptions[0].value;
    localStorageMock.setItem(STORAGE_KEY.notificationFrequency, `${validFrequency}`);
    expect(getStoredNotificationFrequency()).toBe(validFrequency);
  });
});

describe('storeNotificationFrequency', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('stores a valid frequency', () => {
    const validFrequency = notificationFrequencyOptions[0].value;
    storeNotificationFrequency(validFrequency);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEY.notificationFrequency,
      `${validFrequency}`,
    );
  });

  it('does not store an invalid frequency', () => {
    const invalidFrequency = 999;
    storeNotificationFrequency(invalidFrequency);
    expect(localStorageMock.setItem).not.toHaveBeenCalledWith(
      STORAGE_KEY.notificationFrequency,
      `${invalidFrequency}`,
    );
  });
});
