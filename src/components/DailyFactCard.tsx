import { useState, useEffect } from 'react';
import { getRandomCatFact } from '../api/getRandomCatFact';
import { Card, CardContent } from './ui/card';
import { LAST_CAT_FACT } from '../constants/local-storage';

export const DailyFactCard = () => {
  const [catFactText, setCatFactText] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fact = await getRandomCatFact();
        setIsLoading(false);
        setIsError(false);
        setCatFactText(fact.text);

        const storageObject = {
          id: fact._id, 
          timestamp: new Date().getTime(),
        };
        localStorage.setItem(LAST_CAT_FACT, JSON.stringify(storageObject));
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setCatFactText('');
      }
    };

    setIsLoading(true);
    fetchData();
  }, []);

  return (
    <Card>
      <CardContent className="space-y-2 p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Sorry, something went wrong!</p>}
        {catFactText && <p>{catFactText}</p>}
      </CardContent>
    </Card>
  );
};
