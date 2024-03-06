import { useCallback, useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { CatFact } from '../types/CatFact.type';
import { LAST_CAT_FACT, LAST_CAT_FACT_TIMESTAMP } from '../constants/local-storage';
import { getRandomCatFact } from '../api/getRandomCatFact';
import { getStoredFrequency } from '../utils/frequency';
import { useToast } from '../components/ui/use-toast';

type DailyFactContextType = {
  catFact: CatFact | null;
  isLoading: boolean;
  isError: boolean;
  fetchDailyFact: () => void;
};

const DailyFactContext = createContext<DailyFactContextType>({
  catFact: null,
  isLoading: false,
  isError: false,
  fetchDailyFact: () => {
    return undefined;
  },
});

export const DailyFactProvider = ({ children }: { children: ReactNode }) => {
  // TODO validate default
  const [catFact, setCatFact] = useState<CatFact>(JSON.parse(localStorage.getItem(LAST_CAT_FACT)));
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchDailyFact = useCallback(() => {
    const fetchData = async () => {
      try {
        const fact = await getRandomCatFact();

        localStorage.setItem(LAST_CAT_FACT, JSON.stringify(fact));
        localStorage.setItem(LAST_CAT_FACT_TIMESTAMP, `${new Date().getTime()}`);

        setIsLoading(false);
        setIsError(false);
        setCatFact(fact);

        toast({
          title: 'Info',
          description: 'New cat fact available!',
        });
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setCatFact(null);
      }
    };

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
    console.log('✒️ ||| ✒️', frequency, '<- frequency');

    const remainingTime = timeSinceLastFetch > frequency ? 0 : frequency - timeSinceLastFetch;

    const timeoutId = setTimeout(() => {
      fetchDailyFact();
    }, remainingTime);

    return () => clearTimeout(timeoutId);
  }, [catFact, fetchDailyFact]);

  return (
    <DailyFactContext.Provider value={{ catFact, isLoading, isError, fetchDailyFact }}>
      {children}
    </DailyFactContext.Provider>
  );
};

export const useDailyFactContext = () => useContext(DailyFactContext);
