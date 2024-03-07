import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppTabs } from './AppTabs';
import * as CatFactsCardModule from './CatFactsCard';
import * as FavoritesCardModule from './FavoritesCard';
import { act } from 'react-dom/test-utils';

jest.mock('./CatFactsCard', () => ({
  __esModule: true,
  CatFactsCard: jest.fn(() => <div data-testid="mockCatFactsCard">Mock Cat Facts</div>),
}));

jest.mock('./FavoritesCard', () => ({
  __esModule: true,
  FavoritesCard: jest.fn(() => <div data-testid="mockFavoritesCard">Mock Favorites</div>),
}));

describe('AppTabs', () => {
  beforeEach(() => {
    render(<AppTabs />);
  });

  it('renders CatFactsCard and checks for a single call', () => {
    expect(CatFactsCardModule.CatFactsCard).toHaveBeenCalledTimes(1);

    const mockCatFactsCard = screen.getByTestId('mockCatFactsCard');
    expect(mockCatFactsCard).toBeInTheDocument();
    expect(mockCatFactsCard.textContent).toBe('Mock Cat Facts');
  });

  it('should display all tabs', () => {
    expect(screen.getByRole('tab', { name: 'Cat Facts' })).toBeVisible();
    expect(screen.getByRole('tab', { name: 'Favorites' })).toBeVisible();
    expect(screen.getByRole('tab', { name: 'Settings' })).toBeVisible();
  });

  it('should have the first tab active by default', () => {
    const catFactsTab = screen.getByRole('tab', { name: 'Cat Facts' });
    expect(catFactsTab).toHaveAttribute('aria-selected', 'true');
  });

  it('should change tabs on click', async () => {
    expect(FavoritesCardModule.FavoritesCard).not.toHaveBeenCalled();

    const favoritesTab = screen.getByRole('tab', { name: 'Favorites' });

    await act(() => {
      favoritesTab.focus();
      fireEvent.keyDown(document.activeElement || document.body);
    });

    await waitFor(() => expect(FavoritesCardModule.FavoritesCard).toHaveBeenCalledTimes(1));
    expect(favoritesTab).toHaveAttribute('aria-selected', 'true');
  });
});
