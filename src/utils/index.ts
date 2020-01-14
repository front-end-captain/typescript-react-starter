export function parseRemainingMillisecond(millisecond: number): string {
  const millisecondABS = Math.abs(millisecond);
  const millisecondOfHour = 60 * 60 * 1000;
  const millisecondOfMinute = 60 * 1000;
  const millisecondOfSecond = 1000;
  const hours = Math.floor(millisecondABS / millisecondOfHour);
  const minutes = Math.floor((millisecondABS - hours * millisecondOfHour) / millisecondOfMinute);
  const seconds = Math.floor(
    (millisecondABS - hours * millisecondOfHour - minutes * millisecondOfMinute) / millisecondOfSecond,
  );

  const adaptHours = hours.toString().padStart(2, "0");
  const adaptMinutes = minutes.toString().padStart(2, "0");
  const adaptSeconds = seconds.toString().padStart(2, "0");

  return `${adaptHours}:${adaptMinutes}:${adaptSeconds}`;
}

export function getLocalUserRole(): number[] {
  return [1];
}
