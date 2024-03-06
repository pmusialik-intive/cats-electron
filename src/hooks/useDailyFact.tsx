import { useCallback, useEffect, useState } from 'react';
import { CatFact } from '../types/CatFact.type';
import {
  LAST_CAT_FACT,
  LAST_CAT_FACT_TIMESTAMP,
  NOTIFICATION_FREQUENCY,
} from '../constants/local-storage';
import { addFavorite } from '../utils/favorites';
import { getRandomCatFact } from '../api/getRandomCatFact';
import { HOUR } from '../constants/time';
import { defaultFrequencyValue } from '../utils/frequency';

export const useDailyFact = () => {
  const [catFact, setCatFact] = useState<CatFact>();
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
    const notificationFrequencyNumber = notificationFrequency
      ? +notificationFrequency
      : defaultFrequencyValue;
    const shouldFetchNewFact = now - lastTimestampNumber > notificationFrequencyNumber;

    setShouldFetchNewFact(shouldFetchNewFact);
  }, []);

  const fetchDailyFact = useCallback(() => {
    const fetchData = async () => {
      try {
        const fact = await getRandomCatFact();
        setIsLoading(false);
        setIsError(false);
        setCatFact(fact);

        const storageFact = {
          id: fact._id,
          timestamp: new Date().getTime(),
        };
        localStorage.setItem(LAST_CAT_FACT, JSON.stringify(storageFact));
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setCatFact(null);
      }
    };

    setCatFact(null);
    setIsLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (!shouldFetchNewFact) {
      return;
    }

    fetchDailyFact();
    setShouldFetchNewFact(false);
  }, [shouldFetchNewFact]);

  const addToFavorites = (fact: CatFact) => {
    addFavorite(fact);
  };

  const handleAddToFavorites = useCallback(() => {
    addToFavorites(catFact);
    fetchDailyFact();
  }, [catFact]);

  return { catFact, isLoading, isError, fetchDailyFact, handleAddToFavorites };
};
