import {
  defaultFetchingFrequencyValue,
  fetchingFrequencyOptions,
} from '../../constants/fetching-frequency';
import { STORAGE_KEY } from '../../constants/storage-key';

export const isValidFetchingFrequency = (value: number) =>
  fetchingFrequencyOptions.some((option) => option.value === +value);

export const getStoredFetchingFrequency = () => {
  const storedFetchingFrequency = +localStorage.getItem(STORAGE_KEY.fetchingFrequency);

  return isValidFetchingFrequency(storedFetchingFrequency)
    ? storedFetchingFrequency
    : defaultFetchingFrequencyValue;
};

export const storeFetchingFrequency = (value: unknown) => {
  const numberValue = +value;

  if (isValidFetchingFrequency(numberValue)) {
    localStorage.setItem(STORAGE_KEY.fetchingFrequency, `${numberValue}`);
  }
};
