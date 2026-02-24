export function getConditionFromCode(code: number): string {
  const conditions: Record<number, string> = {
    0: "Clear Sky",
    1: "Mostly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Icy Fog",
    51: "Light Drizzle",
    53: "Drizzle",
    55: "Heavy Drizzle",
    61: "Light Rain",
    63: "Rain",
    65: "Heavy Rain",
    71: "Light Snow",
    73: "Snow",
    75: "Heavy Snow",
    80: "Light Showers",
    81: "Showers",
    82: "Heavy Showers",
    95: "Thunderstorm",
    96: "Thunderstorm w/ Hail",
    99: "Severe Thunderstorm",
  };
  return conditions[code] || "Unknown";
}

export function getIconFromCode(code: number): string {
  if (code === 0) return "sun";
  if (code <= 2) return "cloud-sun";
  if (code === 3) return "cloud";
  if (code <= 48) return "cloud-fog";
  if (code <= 55) return "cloud-drizzle";
  if (code <= 65) return "cloud-rain";
  if (code <= 75) return "snowflake";
  if (code <= 82) return "cloud-rain";
  return "cloud-lightning";
}

export function getUvLevel(uv: number): { label: string; color: string } {
  if (uv <= 2) return { label: "Low", color: "green" };
  if (uv <= 5) return { label: "Moderate", color: "yellow" };
  if (uv <= 7) return { label: "High", color: "orange" };
  if (uv <= 10) return { label: "Very High", color: "red" };
  return { label: "Extreme", color: "purple" };
}

export function getTideEstimate(
  _lat: number,
  _lon: number,
): { nextHigh: string; nextLow: string; current: string } {
  const now = new Date();
  const estOffset = -5;
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const estNow = new Date(utcMs + estOffset * 3600000);

  const lunarCycleDays = 29.53;
  const refNewMoon = new Date("2024-01-11T11:57:00Z");
  const daysSinceRef =
    (now.getTime() - refNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const lunarPhase = (daysSinceRef % lunarCycleDays) / lunarCycleDays;

  const baseHighHour = (lunarPhase * 24 * 2) % 24;
  const tidalPeriod = 12.42;
  const currentHour = estNow.getHours() + estNow.getMinutes() / 60;

  let nextHighHour = baseHighHour;
  while (nextHighHour < currentHour) nextHighHour += tidalPeriod;
  if (nextHighHour >= 24) nextHighHour -= 24;

  let nextLowHour = baseHighHour + tidalPeriod / 2;
  if (nextLowHour >= 24) nextLowHour -= 24;
  while (nextLowHour < currentHour) nextLowHour += tidalPeriod;
  if (nextLowHour >= 24) nextLowHour -= 24;

  const formatHour = (h: number): string => {
    const hrs = Math.floor(h);
    const mins = Math.round((h - hrs) * 60);
    const period = hrs >= 12 ? "PM" : "AM";
    const displayHrs = hrs > 12 ? hrs - 12 : hrs === 0 ? 12 : hrs;
    return `${displayHrs}:${mins.toString().padStart(2, "0")} ${period}`;
  };

  const hoursToNextHigh =
    nextHighHour >= currentHour
      ? nextHighHour - currentHour
      : 24 - currentHour + nextHighHour;
  const hoursToNextLow =
    nextLowHour >= currentHour
      ? nextLowHour - currentHour
      : 24 - currentHour + nextLowHour;

  let currentTide: string;
  if (hoursToNextHigh < hoursToNextLow) {
    if (hoursToNextHigh < 2) currentTide = "Rising (Near High)";
    else currentTide = "Rising";
  } else {
    if (hoursToNextLow < 2) currentTide = "Falling (Near Low)";
    else currentTide = "Falling";
  }

  return {
    nextHigh: formatHour(nextHighHour),
    nextLow: formatHour(nextLowHour),
    current: currentTide,
  };
}
