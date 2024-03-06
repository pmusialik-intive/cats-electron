import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { useCallback } from 'react';
import { CatFact } from '../types/CatFact.type';
import { addFavorite } from '../utils/storage-favorites';
import { useToast } from './ui/use-toast';
import { useCatFactsContext } from '../hooks/useCatFactsContext';

export const CatFactsCard = () => {
  const { catFacts, isLoading, isError, fetchCatFact, removeCatFact } = useCatFactsContext();
  const { toast } = useToast();

  const addToFavorites = (fact: CatFact) => {
    addFavorite(fact);

    toast({
      title: 'Success!',
      description: 'Cat fact added to favorites.',
    });
  };

  const handleAddToFavorites = useCallback(
    (catFact: CatFact) => {
      addToFavorites(catFact);
      fetchCatFact();
    },
    [addToFavorites, fetchCatFact],
  );

  return (
    <Card>
      <CardContent className="space-y-2 p-5">
        {catFacts.length === 0 && isLoading && <p>Loading...</p>}
        {catFacts.length === 0 && isError && <p>Sorry, something went wrong!</p>}

        {catFacts.map((fact) => (
          <div key={fact._id} className="flex items-center justify-between">
            <p key={fact._id}>{fact.text}</p>
            <div>
              <button className="ml-1" onClick={() => handleAddToFavorites(fact)}>
                +
              </button>
              <button className="ml-1" onClick={() => removeCatFact(fact._id)}>
                X
              </button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        {catFacts.length === 0 && isError && <Button onClick={fetchCatFact}>Try again</Button>}
      </CardFooter>
    </Card>
  );
};
