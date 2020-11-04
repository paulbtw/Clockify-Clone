export const pad0Left = (num: string | number) => String("0" + num).slice(-2);

export const getTimeDuration = (
  startTime: Date | number | string,
  endTime: Date | number | string
) => {
  if (typeof startTime === "string" || typeof startTime === "number") {
    startTime = new Date(startTime);
  }

  if (typeof endTime === "string" || typeof endTime === "number") {
    endTime = new Date(endTime);
  }

  const durationInSecond = Math.round(
    (endTime.getTime() - startTime.getTime()) / 1000
  );

  // https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
  return new Date(durationInSecond * 1000).toISOString().substr(11, 8);
};


