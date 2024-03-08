import { ObjectValues } from '../types/ObjectValues';

export const STORAGE_KEY = {
  lastCatFactTimestamp: 'lastCatFactTimestamp',
  favoriteCatFacts: 'favoriteCatFacts',
  notificationFrequency: 'notificationFrequency',
  fetchingFrequency: 'fetchingFrequency',
  pushNotificationFactsIds: 'pushNotificationFactsIds',
  pushNotificationTimestamp: 'pushNotificationTimestamp',
} as const;

export type StorageKey = ObjectValues<typeof STORAGE_KEY>;
