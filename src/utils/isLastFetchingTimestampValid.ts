export const isLastFetchingTimestampValid = (timestamp: number) => {
  if (timestamp <= 0 || isNaN(timestamp)) {
    return false;
  }

  const currentTime = new Date().getTime();

  return timestamp < currentTime;
};
