import { STORAGE_KEY } from '../../constants/storage-key';
import { CatFact } from '../../types/CatFact';

export const getStoredFavorites = (): CatFact[] => {
  const storedFavorites = localStorage.getItem(STORAGE_KEY.favoriteCatFacts);

  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const storeFavorites = (favorites: CatFact[]): void => {
  localStorage.setItem(STORAGE_KEY.favoriteCatFacts, JSON.stringify(favorites));
};

export const addFavorite = (newFavorite: CatFact): void => {
  const storedFavorites = getStoredFavorites();

  if (storedFavorites.some((fact) => fact._id === newFavorite._id)) {
    return;
  }

  const updatedFavorites = [newFavorite, ...storedFavorites];
  localStorage.setItem(STORAGE_KEY.favoriteCatFacts, JSON.stringify(updatedFavorites));
};

export const removeFavorite = (id: string): void => {
  const storedFavorites = getStoredFavorites();
  const updatedFavorites = storedFavorites.filter((fact) => fact._id !== id);

  localStorage.setItem(STORAGE_KEY.favoriteCatFacts, JSON.stringify(updatedFavorites));
};
