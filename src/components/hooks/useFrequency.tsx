import { NOTIFICATION_FREQUENCY } from '../../constants/local-storage';
import { HOUR, MINUTE, SECOND } from '../../constants/time';

const frequencyOptions = [
  { label: '10 seconds', value: 10 * SECOND },
  { label: '5 minutes', value: 5 * MINUTE },
  { label: '10 minutes', value: 10 * MINUTE },
  { label: '30 minutes', value: 30 * MINUTE },
  { label: '1 hour', value: 1 * HOUR },
  { label: '6 hours', value: 6 * HOUR },
];

const defaultFrequencyValue = frequencyOptions[0];

const isValidFrequency = (value: number) =>
  frequencyOptions.some((option) => option.value === +value);

const getSavedFrequency = () => {
  const storedFrequency = +localStorage.getItem(NOTIFICATION_FREQUENCY);

  return isValidFrequency(storedFrequency) ? storedFrequency : defaultFrequencyValue.value;
};

const saveFrequency = (value: unknown) => {
  const numberValue = +value;

  if (isValidFrequency(numberValue)) {
    localStorage.setItem(NOTIFICATION_FREQUENCY, `${numberValue}`);
  }
};

export const useFrequency = () => {
  const frequency = getSavedFrequency();

  return { frequency, saveFrequency, frequencyOptions };
};
