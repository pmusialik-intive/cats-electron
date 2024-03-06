import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { useCallback } from 'react';
import { CatFact } from '../types/CatFact.type';
import { addFavorite } from '../utils/favorites';
import { useToast } from './ui/use-toast';
import { useDailyFactContext } from '../hooks/useDailyFactContext';

export const DailyFactCard = () => {
  const { catFact, isLoading, isError, fetchDailyFact } = useDailyFactContext();
  const { toast } = useToast();

  const addToFavorites = (fact: CatFact) => {
    addFavorite(fact);

    toast({
      title: 'Success!',
      description: 'Cat fact added to favorites.',
    });
  };

  const handleAddToFavorites = useCallback(() => {
    addToFavorites(catFact);
    fetchDailyFact();
  }, [catFact]);

  return (
    <Card>
      <CardContent className="space-y-2 p-5">
        {!catFact && isLoading && <p>Loading...</p>}
        {isError && <p>Sorry, something went wrong!</p>}
        {catFact?.text && <p>{catFact.text}</p>}
      </CardContent>
      <CardFooter>
        {!isError && (
          <Button disabled={!catFact} onClick={handleAddToFavorites}>
            Add to favorites
          </Button>
        )}

        {isError && <Button onClick={fetchDailyFact}>Try again</Button>}
      </CardFooter>
    </Card>
  );
};
