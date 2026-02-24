import { describe, it, expect } from "vitest";
import {
  getConditionFromCode,
  getIconFromCode,
  getUvLevel,
  getTideEstimate,
} from "../server/weather-utils";

describe("getConditionFromCode", () => {
  it("returns Clear Sky for code 0", () => {
    expect(getConditionFromCode(0)).toBe("Clear Sky");
  });

  it("returns Mostly Clear for code 1", () => {
    expect(getConditionFromCode(1)).toBe("Mostly Clear");
  });

  it("returns Overcast for code 3", () => {
    expect(getConditionFromCode(3)).toBe("Overcast");
  });

  it("returns Foggy for code 45", () => {
    expect(getConditionFromCode(45)).toBe("Foggy");
  });

  it("returns Thunderstorm for code 95", () => {
    expect(getConditionFromCode(95)).toBe("Thunderstorm");
  });

  it("returns Severe Thunderstorm for code 99", () => {
    expect(getConditionFromCode(99)).toBe("Severe Thunderstorm");
  });

  it("returns Unknown for unmapped codes", () => {
    expect(getConditionFromCode(100)).toBe("Unknown");
    expect(getConditionFromCode(-1)).toBe("Unknown");
    expect(getConditionFromCode(10)).toBe("Unknown");
  });

  it("covers all precipitation types", () => {
    expect(getConditionFromCode(51)).toBe("Light Drizzle");
    expect(getConditionFromCode(61)).toBe("Light Rain");
    expect(getConditionFromCode(65)).toBe("Heavy Rain");
    expect(getConditionFromCode(71)).toBe("Light Snow");
    expect(getConditionFromCode(75)).toBe("Heavy Snow");
    expect(getConditionFromCode(80)).toBe("Light Showers");
    expect(getConditionFromCode(82)).toBe("Heavy Showers");
  });
});

describe("getIconFromCode", () => {
  it("returns sun for clear sky (0)", () => {
    expect(getIconFromCode(0)).toBe("sun");
  });

  it("returns cloud-sun for partly cloudy (1-2)", () => {
    expect(getIconFromCode(1)).toBe("cloud-sun");
    expect(getIconFromCode(2)).toBe("cloud-sun");
  });

  it("returns cloud for overcast (3)", () => {
    expect(getIconFromCode(3)).toBe("cloud");
  });

  it("returns cloud-fog for fog range (4-48)", () => {
    expect(getIconFromCode(45)).toBe("cloud-fog");
    expect(getIconFromCode(48)).toBe("cloud-fog");
  });

  it("returns cloud-drizzle for drizzle range (49-55)", () => {
    expect(getIconFromCode(51)).toBe("cloud-drizzle");
    expect(getIconFromCode(55)).toBe("cloud-drizzle");
  });

  it("returns cloud-rain for rain range (56-65)", () => {
    expect(getIconFromCode(61)).toBe("cloud-rain");
    expect(getIconFromCode(65)).toBe("cloud-rain");
  });

  it("returns snowflake for snow range (66-75)", () => {
    expect(getIconFromCode(71)).toBe("snowflake");
    expect(getIconFromCode(75)).toBe("snowflake");
  });

  it("returns cloud-rain for showers range (76-82)", () => {
    expect(getIconFromCode(80)).toBe("cloud-rain");
    expect(getIconFromCode(82)).toBe("cloud-rain");
  });

  it("returns cloud-lightning for thunderstorms (83+)", () => {
    expect(getIconFromCode(95)).toBe("cloud-lightning");
    expect(getIconFromCode(99)).toBe("cloud-lightning");
  });
});

describe("getUvLevel", () => {
  it("returns Low for UV 0-2", () => {
    expect(getUvLevel(0)).toEqual({ label: "Low", color: "green" });
    expect(getUvLevel(1)).toEqual({ label: "Low", color: "green" });
    expect(getUvLevel(2)).toEqual({ label: "Low", color: "green" });
  });

  it("returns Moderate for UV 3-5", () => {
    expect(getUvLevel(3)).toEqual({ label: "Moderate", color: "yellow" });
    expect(getUvLevel(5)).toEqual({ label: "Moderate", color: "yellow" });
  });

  it("returns High for UV 6-7", () => {
    expect(getUvLevel(6)).toEqual({ label: "High", color: "orange" });
    expect(getUvLevel(7)).toEqual({ label: "High", color: "orange" });
  });

  it("returns Very High for UV 8-10", () => {
    expect(getUvLevel(8)).toEqual({ label: "Very High", color: "red" });
    expect(getUvLevel(10)).toEqual({ label: "Very High", color: "red" });
  });

  it("returns Extreme for UV above 10", () => {
    expect(getUvLevel(11)).toEqual({ label: "Extreme", color: "purple" });
    expect(getUvLevel(15)).toEqual({ label: "Extreme", color: "purple" });
  });

  it("handles fractional UV values", () => {
    expect(getUvLevel(2.5)).toEqual({ label: "Moderate", color: "yellow" });
    expect(getUvLevel(0.5)).toEqual({ label: "Low", color: "green" });
  });
});

describe("getTideEstimate", () => {
  const follyBeachLat = 32.6552;
  const follyBeachLon = -79.9404;

  it("returns an object with nextHigh, nextLow, and current", () => {
    const result = getTideEstimate(follyBeachLat, follyBeachLon);
    expect(result).toHaveProperty("nextHigh");
    expect(result).toHaveProperty("nextLow");
    expect(result).toHaveProperty("current");
  });

  it("nextHigh and nextLow match time format (H:MM AM/PM)", () => {
    const result = getTideEstimate(follyBeachLat, follyBeachLon);
    const timePattern = /^\d{1,2}:\d{2} (AM|PM)$/;
    expect(result.nextHigh).toMatch(timePattern);
    expect(result.nextLow).toMatch(timePattern);
  });

  it("current is one of the four valid tide states", () => {
    const result = getTideEstimate(follyBeachLat, follyBeachLon);
    const validStates = [
      "Rising",
      "Falling",
      "Rising (Near High)",
      "Falling (Near Low)",
    ];
    expect(validStates).toContain(result.current);
  });
});
