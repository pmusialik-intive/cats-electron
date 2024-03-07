export const isLastFetchingTimestampValid = (timestamp: number) => {
  if (!timestamp || isNaN(timestamp)) {
    return false;
  }

  const currentTime = new Date().getTime();

  return timestamp < currentTime;
};
