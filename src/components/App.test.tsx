import { render, act, waitFor, screen } from '@testing-library/react';
import { App } from './App';
import { CAT_FACT_URL } from '../api/catFactUrls';
import '@testing-library/jest-dom';
import { AppProviders } from './AppProviders';

const mockText = 'Cats are nice';

describe('App', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ _id: '1', text: mockText }),
    });
  });

  afterEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('renders the app without crashing', async () => {
    await act(async () => {
      render(
        <AppProviders>
          <App />
        </AppProviders>,
      );
    });
  });

  test('sends a proper request when the component mounts', async () => {
    await act(async () => {
      render(
        <AppProviders>
          <App />
        </AppProviders>,
      );
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(global.fetch).toHaveBeenCalledWith(CAT_FACT_URL.random);
  });

  test('displays fetched data after receiving the response', async () => {
    await act(async () => {
      render(
        <AppProviders>
          <App />
        </AppProviders>,
      );
    });

    await waitFor(() => expect(screen.getByText(mockText)).toBeVisible());
  });
});
