import { STORAGE_KEY } from '../constants/storage-key';
import { CatFact } from '../types/CatFact';

export const areNewFactsAvailable = (catsFacts: CatFact[]) => {
  const notifiedFactsIdsStorage = localStorage.getItem(
    STORAGE_KEY.notifiedFactsIds,
  );

  const notifiedFactsIds = notifiedFactsIdsStorage ? JSON.parse(notifiedFactsIdsStorage) : [];
  const newFactsAvailable = catsFacts.some(catFact => !notifiedFactsIds.includes(catFact._id));
  
  return newFactsAvailable;
};