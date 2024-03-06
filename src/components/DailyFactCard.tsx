import { useState, useEffect } from 'react';
import { getRandomCatFact } from '../api/getRandomCatFact';
import { Card, CardContent } from './ui/card';
import {
  LAST_CAT_FACT,
  LAST_CAT_FACT_TIMESTAMP,
  NOTIFICATION_FREQUENCY,
} from '../constants/local-storage';
import { HOUR } from '../constants/time';

export const DailyFactCard = () => {
  const [catFactText, setCatFactText] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldFetchNewFact, setShouldFetchNewFact] = useState(false);

  useEffect(() => {
    const lastTimestamp = localStorage.getItem(LAST_CAT_FACT_TIMESTAMP);
    const lastCatFact = localStorage.getItem(LAST_CAT_FACT);

    if (!lastCatFact || !lastTimestamp) {
      setShouldFetchNewFact(true);
      return;
    }

    const now = new Date().getTime();
    const lastTimestampNumber = +lastTimestamp;
    const notificationFrequency = localStorage.getItem(NOTIFICATION_FREQUENCY);
    const notificationFrequencyNumber = notificationFrequency ? +notificationFrequency : HOUR;
    const shouldFetchNewFact = now - lastTimestampNumber > notificationFrequencyNumber;

    setShouldFetchNewFact(shouldFetchNewFact);
  }, []);

  useEffect(() => {
    if (!shouldFetchNewFact) {
      return;
    }

    const fetchData = async () => {
      try {
        const fact = await getRandomCatFact();
        setIsLoading(false);
        setIsError(false);
        setCatFactText(fact.text);

        const storageFact = {
          id: fact._id,
          timestamp: new Date().getTime(),
        };
        localStorage.setItem(LAST_CAT_FACT, JSON.stringify(storageFact));
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setCatFactText('');
      }
    };

    setIsLoading(true);
    fetchData();
  }, [shouldFetchNewFact]);

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
