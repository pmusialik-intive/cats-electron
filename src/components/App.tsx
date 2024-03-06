import { CatFactsProvider } from '../hooks/useCatFactsContext';
import { FetchingFrequencyProvider } from '../hooks/useFetchingFrequencyContext';
import { NotificationFrequencyProvider } from '../hooks/useNotificationFrequencyContext';
import { AppTabs } from './AppTabs';
import { Toaster } from './ui/toaster';

export const App = () => {
  return (
    <FetchingFrequencyProvider>
      <CatFactsProvider>
        <NotificationFrequencyProvider>
          <main>
            <AppTabs />
          </main>
          <Toaster />
        </NotificationFrequencyProvider>
      </CatFactsProvider>
    </FetchingFrequencyProvider>
  );
};
