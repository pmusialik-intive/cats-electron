import {
  defaultFetchingFrequencyValue,
  fetchingFrequencyOptions,
} from '../../constants/fetching-frequency';
import { STORAGE_KEY } from '../../constants/storage-key';
import { getStorageNumber, storeNumber } from './local-storage';

export const isValidFetchingFrequency = (value: number) =>
  fetchingFrequencyOptions.some((option) => option.value === +value);

export const getStoredFetchingFrequency = () => {
  const storedFetchingFrequency = getStorageNumber(STORAGE_KEY.fetchingFrequency);

  return isValidFetchingFrequency(storedFetchingFrequency)
    ? storedFetchingFrequency
    : defaultFetchingFrequencyValue;
};

export const storeFetchingFrequency = (value: unknown) => {
  const numberValue = +value;

  if (isValidFetchingFrequency(numberValue)) {
    storeNumber(STORAGE_KEY.fetchingFrequency, numberValue);
  }
};
