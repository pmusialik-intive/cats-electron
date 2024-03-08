import { storeArray, getStorageArray, storeNumber, getStorageNumber } from './local-storage';
import { STORAGE_KEY } from '../../constants/storage-key';
import { localStorageMock } from '../../mocks/localStorageMock';

const arrayKey = STORAGE_KEY.pushNotificationFactsIds;
const numberKey = STORAGE_KEY.pushNotificationTimestamp;

describe('LocalStorage', () => {
  afterEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  describe('storeArray', () => {
    it('should store an array correctly', () => {
      const testArray = ['item1', 'item2'];
      storeArray(arrayKey, testArray);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(arrayKey, JSON.stringify(testArray));
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('getStorageArray', () => {
    it('should retrieve an array correctly and call getItem with proper arguments', () => {
      const testArray = ['item1', 'item2'];
      localStorageMock.setItem(arrayKey, JSON.stringify(testArray));

      const retrievedArray = getStorageArray(arrayKey);
      expect(retrievedArray).toEqual(testArray);
      expect(localStorageMock.getItem).toHaveBeenCalledWith(arrayKey);
      expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if no data found', () => {
      // Make sure that no data is stored
      expect(localStorageMock.getItem(arrayKey)).toBeUndefined();

      const retrievedArray = getStorageArray(arrayKey);
      expect(retrievedArray).toEqual([]);
    });

    it('should return an empty array for invalid data', () => {
      localStorageMock.setItem(arrayKey, 'aaa');

      // Make sure that invalid data is stored
      expect(localStorageMock.getItem(arrayKey)).toEqual('aaa');

      const retrievedArray = getStorageArray(arrayKey);
      expect(retrievedArray).toEqual([]);
    });
  });

  describe('storeNumber', () => {
    it('should store a number correctly and call setItem with proper arguments', () => {
      const testNumber = 123;
      storeNumber(numberKey, testNumber);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(numberKey, testNumber.toString());
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('getStorageNumber', () => {
    it('should retrieve a number correctly and call getItem with proper arguments', () => {
      const testNumber = 123;
      localStorageMock.setItem(numberKey, testNumber.toString());

      const retrievedNumber = getStorageNumber(numberKey);
      expect(retrievedNumber).toBe(testNumber);
      expect(localStorageMock.getItem).toHaveBeenCalledWith(numberKey);
      expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
    });
  });
});
