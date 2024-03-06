import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { getStoredFrequency, storeFrequency } from '../utils/storage-frequency';

type FrequencyContextType = {
  fetchingFrequency: number;
  setFetchingFrequency: Dispatch<SetStateAction<number>>;
};

const FetchingFrequencyContext = createContext<FrequencyContextType>({
  fetchingFrequency: getStoredFrequency(),
  setFetchingFrequency: () => {
    return undefined;
  },
});

export const FetchingFrequencyProvider = ({ children }: { children: ReactNode }) => {
  const [fetchingFrequency, setFetchingFrequency] = useState(getStoredFrequency());

  useEffect(() => {
    storeFrequency(fetchingFrequency);
  }, [fetchingFrequency]);

  return (
    <FetchingFrequencyContext.Provider value={{ fetchingFrequency, setFetchingFrequency }}>
      {children}
    </FetchingFrequencyContext.Provider>
  );
};

export const useFetchingFrequencyContext = () => useContext(FetchingFrequencyContext);
