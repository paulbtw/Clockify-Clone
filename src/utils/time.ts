export const pad0Left = (num: string | number) => String(`0${num}`).slice(-2);

export const getTimeDuration = (
  startTime: Date | number | string,
  endTime: Date | number | string | null,
) => {
  if (typeof startTime === 'string' || typeof startTime === 'number') {
    startTime = new Date(startTime);
  }

  if (typeof endTime === 'string' || typeof endTime === 'number') {
    endTime = new Date(endTime);
  }
  if (!(endTime instanceof Date)) {
    endTime = new Date();
  }

  const durationInSecond = Math.round(
    (endTime.getTime() - startTime.getTime()) / 1000,
  );

  // https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
  return new Date(durationInSecond * 1000).toISOString().substr(11, 8);
};

export const toAmPm = (date: Date | string | number | null) => {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }

  if (date instanceof Date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${pad0Left(minutes)} ${amPm}`;
  }
  console.log('input is not a date');
  return false;
};
