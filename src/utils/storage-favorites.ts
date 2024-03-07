import { FAVORITE_CAT_FACTS } from '../constants/local-storage';
import { CatFact } from '../types/CatFact';

export const getStoredFavorites = (): CatFact[] => {
  const storedFavorites = localStorage.getItem(FAVORITE_CAT_FACTS);

  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const storeFavorites = (favorites: CatFact[]): void => {
  localStorage.setItem(FAVORITE_CAT_FACTS, JSON.stringify(favorites));
};

export const addFavorite = (newFavorite: CatFact): void => {
  const storedFavorites = getStoredFavorites();

  if (storedFavorites.some((fact) => fact._id === newFavorite._id)) {
    return;
  }

  const updatedFavorites = [newFavorite, ...storedFavorites];
  localStorage.setItem(FAVORITE_CAT_FACTS, JSON.stringify(updatedFavorites));
};

export const removeFavorite = (id: string): void => {
  const storedFavorites = getStoredFavorites();
  const updatedFavorites = storedFavorites.filter((fact) => fact._id !== id);

  localStorage.setItem(FAVORITE_CAT_FACTS, JSON.stringify(updatedFavorites));
};
