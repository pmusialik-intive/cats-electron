import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  getStoredNotificationFrequency,
  storeNotificationFrequency,
} from '../utils/local-storage/notification-frequency';
import { useToast } from '../components/ui/use-toast';
import { STORAGE_KEY } from '../constants/storage-key';
import { areNewFactsAvailable } from '../utils/areNewFactsAvailable';
import { useCatFactsContext } from './useCatFactsContext';
import { calculateTimeToFetch } from '../utils/calculateTimeToFetch';
import { getStorageNumber, storeArray, storeNumber } from '../utils/local-storage/local-storage';

type FrequencyContextType = {
  notificationFrequency: number;
  setNotificationFrequency: Dispatch<SetStateAction<number>>;
};

const NotificationFrequencyContext = createContext<FrequencyContextType>({
  notificationFrequency: getStoredNotificationFrequency(),
  setNotificationFrequency: () => {
    return undefined;
  },
});

export const NotificationFrequencyProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { catFacts } = useCatFactsContext();
  const [notificationFrequency, setNotificationFrequency] = useState(
    getStoredNotificationFrequency(),
  );

  useEffect(() => {
    storeNotificationFrequency(notificationFrequency);
  }, [notificationFrequency]);

  useEffect(() => {
    const lastNotifiedTimestamp = getStorageNumber(STORAGE_KEY.pushNotificationTimestamp) || -1;

    const timeoutId = setTimeout(() => {
      if (areNewFactsAvailable(catFacts)) {
        new Notification('New Cat Facts Available', {
          body: 'Check out the latest cat facts!',
        });
      }

      storeNumber(STORAGE_KEY.pushNotificationTimestamp, new Date().getTime());
      storeArray(
        STORAGE_KEY.pushNotificationFactsIds,
        catFacts.map((fact) => fact._id),
      );
    }, calculateTimeToFetch(notificationFrequency, lastNotifiedTimestamp));

    return () => {
      clearTimeout(timeoutId);
    };
  }, [catFacts, notificationFrequency, toast]);

  return (
    <NotificationFrequencyContext.Provider
      value={{ notificationFrequency, setNotificationFrequency }}
    >
      {children}
    </NotificationFrequencyContext.Provider>
  );
};

export const useNotificationFrequencyContext = () => useContext(NotificationFrequencyContext);
