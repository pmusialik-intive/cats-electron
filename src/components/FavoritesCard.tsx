import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { CatFact } from '../types/CatFact';
import { getStoredFavorites, storeFavorites } from '../utils/local-storage/favorites';
import { useToast } from './ui/use-toast';
import { Trash2 } from 'lucide-react';

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
          <div key={fact._id} className="flex items-center border-b py-3">
            <p className="grow line-clamp-5">{fact.text}</p>
            <button className="ml-1" onClick={() => handleRemoveFavorite(fact._id)}>
              <Trash2 strokeWidth={1.5} size={16} />
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
