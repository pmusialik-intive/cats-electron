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
} from '../utils/notification-frequency';
import {
  LAST_CAT_FACT_TIMESTAMP,
  NEW_FACTS_NOTIFICATION_FACT_TIMESTAMP,
} from '../constants/local-storage';
import { useToast } from '../components/ui/use-toast';

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
    NEW_FACTS_NOTIFICATION_FACT_TIMESTAMP,
  );
  const lastCatFactTimestamp = +localStorage.getItem(LAST_CAT_FACT_TIMESTAMP);

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
        NEW_FACTS_NOTIFICATION_FACT_TIMESTAMP,
        localStorage.getItem(LAST_CAT_FACT_TIMESTAMP),
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
