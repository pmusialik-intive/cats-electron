import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { useCatFactsContext } from '../../hooks/useCatFactsContext';

import { CatFactRow } from './CatFactRow';

export const CatFactsCard = () => {
  const { catFacts, isLoading, isError, fetchCatFact } = useCatFactsContext();

  return (
    <Card>
      <CardContent className="space-y-2 p-5">
        {catFacts.length === 0 && isLoading && <p>Loading...</p>}
        {catFacts.length === 0 && !isLoading && isError && <p>Sorry, something went wrong!</p>}

        {catFacts.map((fact) => (
          <CatFactRow key={fact._id} fact={fact} />
        ))}
      </CardContent>
      <CardFooter>
        {catFacts.length === 0 && isError && <Button onClick={fetchCatFact}>Try again</Button>}
      </CardFooter>
    </Card>
  );
};
