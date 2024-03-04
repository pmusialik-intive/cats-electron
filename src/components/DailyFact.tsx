import { useState, useEffect } from 'react';
import { getRandomCatFact } from '../api/getRandomCatFact';

export const DailyFact = () => {
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
    <div>
      <h2>Daily Cat Fact</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Sorry, something went wrong!</p>}
      {catFactText && <p>{catFactText}</p>}
    </div>
  );
};
