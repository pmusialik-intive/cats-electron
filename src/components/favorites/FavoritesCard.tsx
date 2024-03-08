import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { CatFact } from '../../types/CatFact';
import { getStoredFavorites, storeFavorites } from '../../utils/local-storage/favorites';
import { useToast } from '../ui/use-toast';
import { FavoriteFactRow } from './FavoriteFactRow';

export const FavoritesCard = () => {
  const [favorites, setFavorites] = useState<CatFact[]>(getStoredFavorites());
  const { toast } = useToast();

  const handleRemoveFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((fact) => fact._id !== id);
    setFavorites(updatedFavorites);
    storeFavorites(updatedFavorites);

    toast({
      title: 'Success!',
      description: 'Cat fact removed from favorites.',
    });
  };

  return (
    <Card>
      <CardContent className="space-y-2 p-5">
        {favorites.length === 0 && <p className="text-center">No favorites yet.</p>}

        {favorites.map((fact) => (
          <FavoriteFactRow key={fact._id} fact={fact} onRemove={handleRemoveFavorite} />
        ))}
      </CardContent>
    </Card>
  );
};
