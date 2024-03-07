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

const isLastFactDifferent = () => {
  const lastNotificationFactTimestamp = +localStorage.getItem(
    STORAGE_KEY.newFactsNotificationFactTimestamp,
  );
  const lastCatFactTimestamp = +localStorage.getItem(STORAGE_KEY.lastCatFactTimestamp);

  if (isNaN(lastNotificationFactTimestamp) || isNaN(lastCatFactTimestamp)) {
    return false;
  }

  return lastNotificationFactTimestamp !== lastCatFactTimestamp;
};

export const NotificationFrequencyProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [notificationFrequency, setNotificationFrequency] = useState(
    getStoredNotificationFrequency(),
  );

  useEffect(() => {
    storeNotificationFrequency(notificationFrequency);
  }, [notificationFrequency]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isLastFactDifferent()) {
        toast({
          title: 'Info',
          description: 'Cat facts changed!',
        });
      }

      localStorage.setItem(
        STORAGE_KEY.newFactsNotificationFactTimestamp,
        localStorage.getItem(STORAGE_KEY.lastCatFactTimestamp),
      );
    }, notificationFrequency);

    return () => {
      clearInterval(intervalId);
    };
  }, [notificationFrequency, toast]);

  return (
    <NotificationFrequencyContext.Provider
      value={{ notificationFrequency, setNotificationFrequency }}
    >
      {children}
    </NotificationFrequencyContext.Provider>
  );
};

export const useNotificationFrequencyContext = () => useContext(NotificationFrequencyContext);
