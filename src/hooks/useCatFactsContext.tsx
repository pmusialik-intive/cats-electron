import { useCallback, useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { CatFact } from '../types/CatFact.type';
import { LAST_CAT_FACT_TIMESTAMP } from '../constants/local-storage';
import { getRandomCatFact } from '../api/getRandomCatFact';
import { useToast } from '../components/ui/use-toast';
import { useFetchingFrequencyContext } from './useFetchingFrequencyContext';

type CatFactsContextType = {
  catFacts: CatFact[];
  isLoading: boolean;
  isError: boolean;
  removeCatFact: (id: string) => void;
  fetchCatFact: () => void;
};

const CatFactsContext = createContext<CatFactsContextType>({
  catFacts: null,
  isLoading: false,
  isError: false,
  removeCatFact: () => {
    return undefined;
  },
  fetchCatFact: () => {
    return undefined;
  },
});

export const CatFactsProvider = ({ children }: { children: ReactNode }) => {
  const [catFacts, setCatFacts] = useState<CatFact[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { fetchingFrequency } = useFetchingFrequencyContext();

  const fetchCatFact = useCallback(() => {
    const fetchData = async () => {
      try {
        const fact = await getRandomCatFact();
        localStorage.setItem(LAST_CAT_FACT_TIMESTAMP, `${new Date().getTime()}`);

        setIsLoading(false);
        setIsError(false);
        setCatFacts((facts) => [fact, ...facts]);

        toast({
          title: 'Info',
          description: 'New cat fact available!',
        });
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setCatFacts(null);
      }
    };

    setIsLoading(true);
    setIsLoading(true);
    fetchData();
  }, []);

  const removeCatFact = useCallback((id: string) => {
    setCatFacts((facts) => facts.filter((fact) => fact._id !== id));
  }, []);

  useEffect(() => {
    const lastTimestampNumber = +localStorage.getItem(LAST_CAT_FACT_TIMESTAMP);
    const currentTime = new Date().getTime();

    if (isNaN(lastTimestampNumber) || lastTimestampNumber > currentTime || !catFacts) {
      fetchCatFact();
      return;
    }

    const timeSinceLastFetch = currentTime - lastTimestampNumber;
    const remainingTime =
      timeSinceLastFetch > fetchingFrequency ? 0 : fetchingFrequency - timeSinceLastFetch;

    const timeoutId = setTimeout(() => {
      fetchCatFact();
    }, remainingTime);

    return () => clearTimeout(timeoutId);
  }, [fetchingFrequency, catFacts, fetchCatFact]);

  return (
    <CatFactsContext.Provider value={{ catFacts, isLoading, isError, fetchCatFact, removeCatFact }}>
      {children}
    </CatFactsContext.Provider>
  );
};

export const useCatFactsContext = () => useContext(CatFactsContext);
