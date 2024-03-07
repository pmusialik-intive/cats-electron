import React, { PropsWithChildren } from 'react';
import { CatFactsProvider } from '../hooks/useCatFactsContext';
import { FetchingFrequencyProvider } from '../hooks/useFetchingFrequencyContext';
import { NotificationFrequencyProvider } from '../hooks/useNotificationFrequencyContext';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <FetchingFrequencyProvider>
      <CatFactsProvider>
        <NotificationFrequencyProvider>{children}</NotificationFrequencyProvider>
      </CatFactsProvider>
    </FetchingFrequencyProvider>
  );
};
