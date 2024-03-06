import { Card, CardContent, CardFooter } from './ui/card';

import { Button } from './ui/button';

import { useDailyFact } from '../hooks/useDailyFact';

export const DailyFactCard = () => {
  const { catFact, isLoading, isError, fetchDailyFact, handleAddToFavorites } = useDailyFact();

  return (
    <Card>
      <CardContent className="space-y-2 p-5">
        {isLoading && <p>Loading...</p>}
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
