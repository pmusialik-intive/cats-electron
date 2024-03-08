import { useCallback } from 'react';
import { CatFact } from '../../types/CatFact';
import { addFavorite } from '../../utils/local-storage/favorites';
import { useToast } from '../ui/use-toast';
import { useCatFactsContext } from '../../hooks/useCatFactsContext';
import { ListItem } from '../common/ListItem';
import { Icon } from '../common/Icon';

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
    removeCatFact(fact._id);
    fetchCatFact();

    toast({
      title: 'Success!',
      description: 'Cat fact added to favorites.',
    });
  }, [fact, addFavorite, fetchCatFact, toast]);

  return (
    <ListItem text={fact.text}>
      <button className="ml-1" onClick={handleAddToFavorites}>
        <Icon name="star" />
      </button>
      <button className="ml-1" onClick={handleRemove}>
        <Icon name="trash-2" />
      </button>
    </ListItem>
  );
};
