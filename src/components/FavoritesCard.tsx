import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { CatFact } from '../types/CatFact.type';
import { getStoredFavorites, storeFavorites } from '../utils/favorites';
import { useToast } from './ui/use-toast';

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
        {favorites.map((fact) => (
          <div key={fact._id} className="flex items-center justify-between">
            <p>{fact.text}</p>
            <button className="ml-1" onClick={() => handleRemoveFavorite(fact._id)}>
              X
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
