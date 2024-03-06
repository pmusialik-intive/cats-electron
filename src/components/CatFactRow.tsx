import { useCallback } from 'react';
import { CatFact } from '../types/CatFact.type';
import { addFavorite } from '../utils/storage-favorites';
import { useToast } from './ui/use-toast';
import { useCatFactsContext } from '../hooks/useCatFactsContext';
import { Star, Trash2 } from 'lucide-react';

interface Props {
  fact: CatFact;
}

export const CatFactRow = ({ fact }: Props) => {
  const { fetchCatFact, removeCatFact } = useCatFactsContext();
  const { toast } = useToast();

  const handleRemove = useCallback(() => {
    removeCatFact(fact._id);
    fetchCatFact();

    toast({
      title: 'Success!',
      description: 'Cat fact removed from the list.',
    });
  }, [fact._id, removeCatFact, fetchCatFact, toast]);

  const handleAddToFavorites = useCallback(() => {
    addFavorite(fact);
    handleRemove();

    toast({
      title: 'Success!',
      description: 'Cat fact added to favorites.',
    });
  }, [fact, addFavorite, fetchCatFact, toast]);

  return (
    <div className="flex items-center justify-between border-b py-3">
      <p className="flex-1" key={fact._id}>
        {fact.text}
      </p>
      <div>
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
