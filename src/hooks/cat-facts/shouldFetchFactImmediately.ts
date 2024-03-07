export const isLastFetchingTimestampValid = (timestamp: number) => {
  if (!timestamp || isNaN(timestamp)) {
    return false;
  }

  const currentTime = new Date().getTime();

  return timestamp < currentTime;
};

export const calculateTimeToFetch = (fetchingFrequency: number, lastTimestamp: number) => {
  const currentTime = new Date().getTime();
  const timeSinceLastFetch = currentTime - lastTimestamp;
  const remainingTime = fetchingFrequency - timeSinceLastFetch;

  return remainingTime > 0 ? remainingTime : 0;
};
