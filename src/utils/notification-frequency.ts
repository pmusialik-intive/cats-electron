import {
  defaultNotificationFrequencyValue,
  notificationFrequencyOptions,
} from '../constants/frequency';
import { NOTIFICATION_FREQUENCY } from '../constants/local-storage';

const isValidNotificationFrequency = (value: number) =>
  notificationFrequencyOptions.some((option) => option.value === +value);

export const getStoredNotificationFrequency = () => {
  const storedNotificationFrequency = +localStorage.getItem(NOTIFICATION_FREQUENCY);

  return isValidNotificationFrequency(storedNotificationFrequency)
    ? storedNotificationFrequency
    : defaultNotificationFrequencyValue;
};

export const storeNotificationFrequency = (value: unknown) => {
  const numberValue = +value;

  if (isValidNotificationFrequency(numberValue)) {
    localStorage.setItem(NOTIFICATION_FREQUENCY, `${numberValue}`);
  }
};
