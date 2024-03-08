import {
  defaultNotificationFrequencyValue,
  notificationFrequencyOptions,
} from '../../constants/notification-frequency';
import { STORAGE_KEY } from '../../constants/storage-key';
import { getStorageNumber, storeNumber } from './local-storage';

export const isValidNotificationFrequency = (value: number) =>
  notificationFrequencyOptions.some((option) => option.value === +value);

export const getStoredNotificationFrequency = () => {
  const storedNotificationFrequency = getStorageNumber(STORAGE_KEY.notificationFrequency);

  return isValidNotificationFrequency(storedNotificationFrequency)
    ? storedNotificationFrequency
    : defaultNotificationFrequencyValue;
};

export const storeNotificationFrequency = (value: unknown) => {
  const numberValue = +value;

  if (isValidNotificationFrequency(numberValue)) {
    storeNumber(STORAGE_KEY.notificationFrequency, numberValue);
  }
};
