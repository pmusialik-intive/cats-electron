import { AppTabs } from './AppTabs';
import { Toaster } from './ui/toaster';

export const App = () => {
  return (
    <>
      <main>
        <AppTabs />
      </main>
      <Toaster />
    </>
  );
};
