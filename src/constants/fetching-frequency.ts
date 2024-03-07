import { HOUR, MINUTE, SECOND } from '../constants/time';

export const fetchingFrequencyOptions = [
  { label: '10 seconds', value: 10 * SECOND },
  { label: '30 seconds', value: 30 * SECOND },
  { label: '1 minute', value: MINUTE },
  { label: '5 minutes', value: 5 * MINUTE },
  { label: '10 minutes', value: 10 * MINUTE },
  { label: '30 minutes', value: 30 * MINUTE },
  { label: '1 hour', value: 1 * HOUR },
];

export const defaultFetchingFrequencyValue = fetchingFrequencyOptions[1].value;
