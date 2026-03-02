function formatTime(hours: number): string {
  const h = String(Math.floor(hours)).padStart(2, "0");
  const m = String(Math.floor((hours % 1) * 60)).padStart(2, "0");
  const s = String(Math.floor((((hours % 1) * 60) % 1) * 60)).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function getMarsTime(date: Date = new Date(), longitude: number = 0): string {
  // julian date UTC
  const JD_UTC = date.getTime() / 86400000 + 2440587.5;

  // terrestrial time (TT) offset ≈ 69.184 seconds
  const JD_TT = JD_UTC + 69.184 / 86400;

  // mars sol date
  const MSD = (JD_TT - 2405522.0028779) / 1.0274912517;

  // mars coordinated time in hours
  let hours = (MSD % 1) * 24;

  // apply longitude offset for local mean solar time
  if (longitude !== 0) {
    hours = (hours + longitude / 15) % 24;
    if (hours < 0) hours += 24;
  }

  return formatTime(hours);
}

export const getMarsCoordinatedTime = (date?: Date) => getMarsTime(date);
export const getCuriosityLocalTime = (date?: Date) => getMarsTime(date, 137.42);
