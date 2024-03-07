import React, { ReactNode } from 'react';
import { FetchingFrequencyProvider } from '../hooks/useFetchingFrequencyContext';
import { CatFactsProvider } from '../hooks/cat-facts/useCatFactsContext';
import { NotificationFrequencyProvider } from '../hooks/useNotificationFrequencyContext';

export function wrapWithProviders(component: ReactNode) {
  return (
    <FetchingFrequencyProvider>
      <CatFactsProvider>
        <NotificationFrequencyProvider>{component}</NotificationFrequencyProvider>
      </CatFactsProvider>
    </FetchingFrequencyProvider>
  );
}
