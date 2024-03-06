import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { getStoredFetchingFrequency, storeFetchingFrequency } from '../utils/fetching-frequency';

type FrequencyContextType = {
  fetchingFrequency: number;
  setFetchingFrequency: Dispatch<SetStateAction<number>>;
};

const FetchingFrequencyContext = createContext<FrequencyContextType>({
  fetchingFrequency: getStoredFetchingFrequency(),
  setFetchingFrequency: () => {
    return undefined;
  },
});

export const FetchingFrequencyProvider = ({ children }: { children: ReactNode }) => {
  const [fetchingFrequency, setFetchingFrequency] = useState(getStoredFetchingFrequency());

  useEffect(() => {
    storeFetchingFrequency(fetchingFrequency);
  }, [fetchingFrequency]);

  return (
    <FetchingFrequencyContext.Provider value={{ fetchingFrequency, setFetchingFrequency }}>
      {children}
    </FetchingFrequencyContext.Provider>
  );
};

export const useFetchingFrequencyContext = () => useContext(FetchingFrequencyContext);
