import { CatFactsProvider } from '../hooks/useCatFactsContext';
import { FetchingFrequencyProvider } from '../hooks/useFetchingFrequencyContext';
import { AppTabs } from './AppTabs';
import { Toaster } from './ui/toaster';

export const App = () => {
  return (
    <FetchingFrequencyProvider>
      <CatFactsProvider>
        <main>
          <AppTabs />
        </main>
        <Toaster />
      </CatFactsProvider>
    </FetchingFrequencyProvider>
  );
};
