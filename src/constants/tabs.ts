import { ObjectValues } from '../utils/object-values';

export const TAB_ID = {
  dailyFact: 'daily-fact',
  favorites: 'favorites',
  settings: 'settings',
} as const;

export type TabId = ObjectValues<typeof TAB_ID>;
