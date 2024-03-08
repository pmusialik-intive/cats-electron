import { render, act, waitFor, screen } from '@testing-library/react';
import { App } from './App';
import '@testing-library/jest-dom';
import { AppProviders } from './AppProviders';
import { CAT_FACT_URL } from '../constants/api';

const mockText = 'Cats are nice';

jest.mock('./common/Icon', () => {
  return {
    __esModule: true,
    Icon: () => <span></span>,
  };
});

describe('App', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ _id: '1', text: mockText }),
    });

    await act(async () => {
      render(
        <AppProviders>
          <App />
        </AppProviders>,
      );
    });
  });

  afterEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('sends a proper request when the component mounts', async () => {
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(global.fetch).toHaveBeenCalledWith(CAT_FACT_URL.random);
  });

  test('displays fetched data after receiving the response', async () => {
    await waitFor(() => expect(screen.getByText(mockText)).toBeVisible());
  });
});
