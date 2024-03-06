import { DailyFactProvider } from '../hooks/useDailyFactContext';
import { AppTabs } from './AppTabs';
import { Toaster } from './ui/toaster';

export const App = () => {
  return (
    <DailyFactProvider>
      <main>
        <AppTabs />
      </main>
      <Toaster />
    </DailyFactProvider>
  );
};
