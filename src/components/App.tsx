import { AppProviders } from './AppProviders';
import { AppTabs } from './AppTabs';
import { Toaster } from './ui/toaster';

export const App = () => {
  return (
    <AppProviders>
      <main>
        <AppTabs />
      </main>
      <Toaster />
    </AppProviders>
  );
};
