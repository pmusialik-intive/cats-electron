import { render, screen, fireEvent } from '@testing-library/react';
import {
  FetchingFrequencyProvider,
  useFetchingFrequencyContext,
} from './useFetchingFrequencyContext';
import '@testing-library/jest-dom';
import { storeFetchingFrequency } from '../utils/fetching-frequency';

const UPDATE_FREQUENCY_TEXT = 'Update Frequency';
const UPDATE_FREQUENCY_VALUE = 10000;
const FREQUENCY_DEFAULT = 5000;

jest.mock('../utils/fetching-frequency', () => ({
  getStoredFetchingFrequency: jest.fn().mockReturnValue(FREQUENCY_DEFAULT),
  storeFetchingFrequency: jest.fn(),
}));

describe('FetchingFrequencyContext functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const TestDisplayComponent = () => {
    const { fetchingFrequency } = useFetchingFrequencyContext();
    return <div>Frequency: {fetchingFrequency}</div>;
  };

  const TestUpdateComponent = () => {
    const { setFetchingFrequency } = useFetchingFrequencyContext();
    return (
      <button onClick={() => setFetchingFrequency(UPDATE_FREQUENCY_VALUE)}>
        {UPDATE_FREQUENCY_TEXT}
      </button>
    );
  };

  it('provides the initial fetching frequency', () => {
    render(
      <FetchingFrequencyProvider>
        <TestDisplayComponent />
      </FetchingFrequencyProvider>,
    );

    expect(screen.getByText(`Frequency: ${FREQUENCY_DEFAULT}`)).toBeInTheDocument();
  });

  it('updates the fetching frequency', async () => {
    render(
      <FetchingFrequencyProvider>
        <TestDisplayComponent />
        <TestUpdateComponent />
      </FetchingFrequencyProvider>,
    );

    expect(screen.getByText(`Frequency: ${FREQUENCY_DEFAULT}`)).toBeVisible();

    const button = screen.getByText(UPDATE_FREQUENCY_TEXT);
    fireEvent.click(button);

    expect(screen.getByText(`Frequency: ${UPDATE_FREQUENCY_VALUE}`)).toBeVisible();
  });

  it('properly invokes storing fetching frequency', async () => {
    render(
      <FetchingFrequencyProvider>
        <TestUpdateComponent />
      </FetchingFrequencyProvider>,
    );

    expect(storeFetchingFrequency).toHaveBeenCalledTimes(1);

    const button = screen.getByText(UPDATE_FREQUENCY_TEXT);
    fireEvent.click(button);

    expect(storeFetchingFrequency).toHaveBeenCalledTimes(2);
    expect(storeFetchingFrequency).toHaveBeenCalledWith(UPDATE_FREQUENCY_VALUE);
  });
});
