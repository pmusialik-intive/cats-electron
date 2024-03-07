import {
  getStoredFavorites,
  storeFavorites,
  addFavorite,
  removeFavorite,
} from './storage-favorites';

describe('Storage Favorites', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  const sampleCatFacts = [
    { _id: '1', text: 'Cats are small.' },
    { _id: '2', text: 'Cats like food.' },
  ];

  it('should retrieve empty array if no favorites stored', () => {
    const favorites = getStoredFavorites();
    expect(favorites).toEqual([]);
  });

  it('should store favorites', () => {
    storeFavorites(sampleCatFacts);

    expect(getStoredFavorites()).toEqual(sampleCatFacts);
  });

  it('should add a new favorite if not already added', () => {
    const newFact = { _id: '3', text: 'Cats have nine lives.' };
    addFavorite(newFact);
    expect(getStoredFavorites()).toContainEqual(newFact);
  });

  it('should not add a duplicate favorite', () => {
    addFavorite(sampleCatFacts[0]);
    addFavorite(sampleCatFacts[0]); // Attempt to add duplicate
    const favorites = getStoredFavorites();
    const occurrences = favorites.filter((fact) => fact._id === sampleCatFacts[0]._id).length;
    expect(occurrences).toBe(1);
  });

  it('should remove a favorite by id', () => {
    storeFavorites(sampleCatFacts);
    removeFavorite('1');
    const favorites = getStoredFavorites();
    expect(favorites).not.toContainEqual(sampleCatFacts[0]);
    expect(favorites.length).toBe(1);
  });
});
