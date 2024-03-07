import { areNewFactsAvailable } from './areNewFactsAvailable';
import { localStorageMock } from '../mocks/localStorageMock';

describe('areNewFactsAvailable', () => {
  it('returns false when no new facts are available', () => {
    const notifiedFactsIds = ['1', '2', '3'];
    const catsFacts = [
      { _id: '1', text: 'Fact 1' },
      { _id: '2', text: 'Fact 2' },
      { _id: '3', text: 'Fact 3' },
    ];

    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(notifiedFactsIds));

    expect(areNewFactsAvailable(catsFacts)).toBe(false);
  });

  it('returns true when new facts are available', () => {
    const notifiedFactsIds = ['1', '2', '3'];
    const catsFacts = [
      { _id: '1', text: 'Fact 1' },
      { _id: '2', text: 'Fact 2' },
      { _id: '3', text: 'Fact 3' },
      { _id: '4', text: 'Fact 4' },
    ];

    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(notifiedFactsIds));

    expect(areNewFactsAvailable(catsFacts)).toBe(true);
  });

  it('returns true when notified facts are empty', () => {
    const catsFacts = [
      { _id: '1', text: 'Fact 1' },
      { _id: '2', text: 'Fact 2' },
      { _id: '3', text: 'Fact 3' },
    ];

    localStorageMock.getItem.mockReturnValueOnce(null);

    expect(areNewFactsAvailable(catsFacts)).toBe(true);
  });
});
