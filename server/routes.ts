import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getVapidPublicKey, sendPushNotification } from "./pushService";
import { insertPushSubscriptionSchema } from "@shared/schema";

let weatherCache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION = 10 * 60 * 1000;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/weather", async (_req, res) => {
    try {
      if (weatherCache && Date.now() - weatherCache.timestamp < CACHE_DURATION) {
        return res.json(weatherCache.data);
      }

      const lat = 32.6552;
      const lon = -79.9404;

      let forecastRaw: any = null;
      let marine: any = null;

      try {
        const forecastRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_gusts_10m,wind_direction_10m,uv_index&daily=sunrise,sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FNew_York&forecast_days=1`
        );
        if (forecastRes.ok) {
          forecastRaw = await forecastRes.json();
        } else {
          const errText = await forecastRes.text().catch(() => "");
          console.error("Forecast API error:", forecastRes.status, errText);
        }
      } catch (e) {
        console.error("Forecast fetch failed:", e);
      }

      try {
        const marineRes = await fetch(
          `https://marine-api.open-meteo.com/v1/marine?latitude=32.60&longitude=-79.85&current=wave_height,wave_period,sea_surface_temperature&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=1`
        );
        if (marineRes.ok) {
          marine = await marineRes.json();
        }
      } catch (e) {
        console.error("Marine fetch failed:", e);
      }

      if (!forecastRaw?.current) {
        throw new Error("Weather API request failed - no forecast data");
      }

      const current = forecastRaw.current;
      const daily = forecastRaw.daily;

      const tideEstimate = getTideEstimate(lat, lon);

      const data = {
        temp: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        windGusts: Math.round(current.wind_gusts_10m),
        windDirection: current.wind_direction_10m,
        weatherCode: current.weather_code,
        condition: getConditionFromCode(current.weather_code),
        icon: getIconFromCode(current.weather_code),
        uvIndex: current.uv_index != null ? Math.round(current.uv_index * 10) / 10 : null,
        uvLevel: current.uv_index != null ? getUvLevel(current.uv_index) : null,
        waterTemp: marine?.current?.sea_surface_temperature != null ? Math.round(marine.current.sea_surface_temperature) : null,
        waveHeight: marine?.current?.wave_height != null ? Math.round(marine.current.wave_height * 3.281 * 10) / 10 : null,
        wavePeriod: marine?.current?.wave_period != null ? Math.round(marine.current.wave_period) : null,
        sunrise: daily?.sunrise?.[0] || null,
        sunset: daily?.sunset?.[0] || null,
        tides: tideEstimate,
      };

      weatherCache = { data, timestamp: Date.now() };
      res.json(data);
    } catch (error) {
      console.error("Weather fetch error:", error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  app.get("/api/push/vapid-key", (_req, res) => {
    res.json({ publicKey: getVapidPublicKey() });
  });

  app.post("/api/push/subscribe", async (req, res) => {
    try {
      const { endpoint, keys } = req.body;
      if (!endpoint || !keys?.p256dh || !keys?.auth) {
        return res.status(400).json({ error: "Invalid subscription data" });
      }

      const parsed = insertPushSubscriptionSchema.parse({
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
      });

      await storage.saveSubscription(parsed);
      res.json({ success: true });
    } catch (error) {
      console.error("Subscribe error:", error);
      res.status(500).json({ error: "Failed to save subscription" });
    }
  });

  app.post("/api/push/unsubscribe", async (req, res) => {
    try {
      const { endpoint } = req.body;
      if (!endpoint) {
        return res.status(400).json({ error: "Endpoint required" });
      }
      await storage.removeSubscription(endpoint);
      res.json({ success: true });
    } catch (error) {
      console.error("Unsubscribe error:", error);
      res.status(500).json({ error: "Failed to remove subscription" });
    }
  });

  app.post("/api/push/send", async (req, res) => {
    try {
      const adminKey = req.headers["x-admin-key"];
      if (adminKey !== process.env.ADMIN_PUSH_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { title, body, url: rawUrl } = req.body;
      if (!title || !body) {
        return res.status(400).json({ error: "Title and body required" });
      }

      let url = "/";
      if (rawUrl && typeof rawUrl === "string") {
        if (rawUrl.startsWith("/")) {
          url = rawUrl;
        }
      }

      const subscriptions = await storage.getAllSubscriptions();
      let sent = 0;
      let failed = 0;
      const staleEndpoints: string[] = [];

      await Promise.allSettled(
        subscriptions.map(async (sub) => {
          const success = await sendPushNotification(
            { endpoint: sub.endpoint, p256dh: sub.p256dh, auth: sub.auth },
            { title, body, url: url || "/" }
          );
          if (success) {
            sent++;
          } else {
            failed++;
            staleEndpoints.push(sub.endpoint);
          }
        })
      );

      for (const endpoint of staleEndpoints) {
        await storage.removeSubscription(endpoint);
      }

      res.json({ sent, failed, cleaned: staleEndpoints.length });
    } catch (error) {
      console.error("Send push error:", error);
      res.status(500).json({ error: "Failed to send notifications" });
    }
  });

  app.get("/api/push/stats", async (req, res) => {
    try {
      const adminKey = req.headers["x-admin-key"];
      if (adminKey !== process.env.ADMIN_PUSH_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const count = await storage.getSubscriptionCount();
      res.json({ subscribers: count });
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({ error: "Failed to get stats" });
    }
  });

  return httpServer;
}

function getConditionFromCode(code: number): string {
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

function getIconFromCode(code: number): string {
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

function getUvLevel(uv: number): { label: string; color: string } {
  if (uv <= 2) return { label: "Low", color: "green" };
  if (uv <= 5) return { label: "Moderate", color: "yellow" };
  if (uv <= 7) return { label: "High", color: "orange" };
  if (uv <= 10) return { label: "Very High", color: "red" };
  return { label: "Extreme", color: "purple" };
}

function getTideEstimate(lat: number, _lon: number): { nextHigh: string; nextLow: string; current: string } {
  const now = new Date();
  const estOffset = -5;
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const estNow = new Date(utcMs + estOffset * 3600000);

  const lunarCycleDays = 29.53;
  const refNewMoon = new Date("2024-01-11T11:57:00Z");
  const daysSinceRef = (now.getTime() - refNewMoon.getTime()) / (1000 * 60 * 60 * 24);
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

  const hoursToNextHigh = nextHighHour >= currentHour ? nextHighHour - currentHour : 24 - currentHour + nextHighHour;
  const hoursToNextLow = nextLowHour >= currentHour ? nextLowHour - currentHour : 24 - currentHour + nextLowHour;

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
