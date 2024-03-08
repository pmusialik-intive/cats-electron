import { StorageKey } from '../../constants/storage-key';

export const storeArray = (key: StorageKey, arr: unknown[]) => {
  localStorage.setItem(key, JSON.stringify(arr));
};

export const storeNumber = (key: StorageKey, num: number) => {
  localStorage.setItem(key, num.toString());
};

export const getStorageNumber = (key: StorageKey): number | null => {
  const stringValue = localStorage.getItem(key);

  if (!stringValue) {
    return null;
  }

  const numberValue = Number(stringValue);

  return isNaN(numberValue) ? null : numberValue;
};

export const getStorageArray = (key: StorageKey) => {
  const stringValue = localStorage.getItem(key);

  try {
    const parsedData = JSON.parse(stringValue);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    return [];
  }
};
