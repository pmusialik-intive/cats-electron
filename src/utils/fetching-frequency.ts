import { defaultFetchingFrequencyValue, fetchingFrequencyOptions } from '../constants/frequency';
import { FETCHING_FREQUENCY } from '../constants/local-storage';

const isValidFetchingFrequency = (value: number) =>
  fetchingFrequencyOptions.some((option) => option.value === +value);

export const getStoredFetchingFrequency = () => {
  const storedFetchingFrequency = +localStorage.getItem(FETCHING_FREQUENCY);

  return isValidFetchingFrequency(storedFetchingFrequency)
    ? storedFetchingFrequency
    : defaultFetchingFrequencyValue;
};

export const storeFetchingFrequency = (value: unknown) => {
  const numberValue = +value;

  if (isValidFetchingFrequency(numberValue)) {
    localStorage.setItem(FETCHING_FREQUENCY, `${numberValue}`);
  }
};
