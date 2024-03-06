import { useCallback, useEffect, useState } from 'react';
import { CatFact } from '../types/CatFact.type';
import { LAST_CAT_FACT, LAST_CAT_FACT_TIMESTAMP } from '../constants/local-storage';

import { getRandomCatFact } from '../api/getRandomCatFact';
import { getStoredFrequency } from '../utils/frequency';

export const useDailyFact = () => {
  // TODO validate default
  const [catFact, setCatFact] = useState<CatFact>(JSON.parse(localStorage.getItem(LAST_CAT_FACT)));
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDailyFact = useCallback(() => {
    const fetchData = async () => {
      try {
        const fact = await getRandomCatFact();
        setIsLoading(false);
        setIsError(false);
        setCatFact(fact);

        localStorage.setItem(LAST_CAT_FACT, JSON.stringify(fact));
        localStorage.setItem(LAST_CAT_FACT_TIMESTAMP, `${new Date().getTime()}`);
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
    const lastTimestampNumber = +localStorage.getItem(LAST_CAT_FACT_TIMESTAMP);
    const currentTime = new Date().getTime();

    if (isNaN(lastTimestampNumber) || lastTimestampNumber > currentTime || !catFact) {
      fetchDailyFact();
      return;
    }

    const timeSinceLastFetch = currentTime - lastTimestampNumber;
    const frequency = getStoredFrequency();
    const remainingTime = timeSinceLastFetch > frequency ? 0 : frequency - timeSinceLastFetch;

    const timeoutId = setTimeout(() => {
      fetchDailyFact();
    }, remainingTime);

    return () => clearTimeout(timeoutId);
  }, [catFact, fetchDailyFact]);

  return { catFact, isLoading, isError, fetchDailyFact };
};
