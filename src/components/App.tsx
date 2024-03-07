import { AppProviders } from './AppProviders';
import { AppTabs } from './AppTabs';
import { Toaster } from './ui/toaster';

export const App = () => {
  return (
    <AppProviders>
      <main className="container mx-auto max-w-screen-xl">
        <AppTabs />
      </main>
      <Toaster />
    </AppProviders>
  );
};
