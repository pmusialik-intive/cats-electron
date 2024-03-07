import { useCallback } from 'react';
import { CatFact } from '../types/CatFact';
import { addFavorite } from '../utils/local-storage/favorites';
import { useToast } from './ui/use-toast';
import { useCatFactsContext } from '../hooks/cat-facts/useCatFactsContext';
import { Star, Trash2 } from 'lucide-react';

interface Props {
  fact: CatFact;
}

export const CatFactRow = ({ fact }: Props) => {
  const { fetchCatFact, removeCatFact } = useCatFactsContext();
  const { toast } = useToast();

  const handleRemove = useCallback(() => {
    removeCatFact(fact._id);

    toast({
      title: 'Success!',
      description: 'Cat fact removed from the list.',
    });
  }, [fact._id, removeCatFact, fetchCatFact, toast]);

  const handleAddToFavorites = useCallback(() => {
    addFavorite(fact);
    handleRemove();
    fetchCatFact();

    toast({
      title: 'Success!',
      description: 'Cat fact added to favorites.',
    });
  }, [fact, addFavorite, fetchCatFact, toast]);

  return (
    <div
      className={`group flex items-center justify-between py-3 border-b last:pb-0 last:border-0`}
    >
      <p className="flex-1 line-clamp-5" key={fact._id}>
        {fact.text}
      </p>
      <div className="invisible group-hover:visible">
        <button className="ml-1" onClick={handleAddToFavorites}>
          <Star strokeWidth={1.5} size={16} />
        </button>
        <button className="ml-1" onClick={handleRemove}>
          <Trash2 strokeWidth={1.5} size={16} />
        </button>
      </div>
    </div>
  );
};
