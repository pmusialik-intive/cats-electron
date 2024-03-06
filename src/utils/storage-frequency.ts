import { defaultFrequencyValue, frequencyOptions } from '../constants/frequency';
import { NOTIFICATION_FREQUENCY } from '../constants/local-storage';

const isValidFrequency = (value: number) =>
  frequencyOptions.some((option) => option.value === +value);

export const getStoredFrequency = () => {
  const storedFrequency = +localStorage.getItem(NOTIFICATION_FREQUENCY);

  return isValidFrequency(storedFrequency) ? storedFrequency : defaultFrequencyValue;
};

export const storeFrequency = (value: unknown) => {
  const numberValue = +value;

  if (isValidFrequency(numberValue)) {
    localStorage.setItem(NOTIFICATION_FREQUENCY, `${numberValue}`);
  }
};
