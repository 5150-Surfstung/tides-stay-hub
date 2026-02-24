import { describe, it, expect } from "vitest";

const BASE_URL = "http://localhost:5000";

describe("API endpoints", () => {
  describe("GET /api/weather", () => {
    it("returns weather data with expected shape", async () => {
      const res = await fetch(`${BASE_URL}/api/weather`);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data).toHaveProperty("temp");
      expect(data).toHaveProperty("feelsLike");
      expect(data).toHaveProperty("humidity");
      expect(data).toHaveProperty("windSpeed");
      expect(data).toHaveProperty("condition");
      expect(data).toHaveProperty("icon");
      expect(data).toHaveProperty("tides");
      expect(typeof data.temp).toBe("number");
      expect(typeof data.condition).toBe("string");
    });

    it("returns tide data with nextHigh, nextLow, current", async () => {
      const res = await fetch(`${BASE_URL}/api/weather`);
      const data = await res.json();
      expect(data.tides).toHaveProperty("nextHigh");
      expect(data.tides).toHaveProperty("nextLow");
      expect(data.tides).toHaveProperty("current");
    });

    it("returns UV data when available", async () => {
      const res = await fetch(`${BASE_URL}/api/weather`);
      const data = await res.json();
      if (data.uvIndex !== null) {
        expect(typeof data.uvIndex).toBe("number");
        expect(data.uvLevel).toHaveProperty("label");
        expect(data.uvLevel).toHaveProperty("color");
      }
    });
  });

  describe("GET /api/push/vapid-key", () => {
    it("returns a publicKey field", async () => {
      const res = await fetch(`${BASE_URL}/api/push/vapid-key`);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toHaveProperty("publicKey");
      expect(typeof data.publicKey).toBe("string");
    });
  });

  describe("GET /api/push/stats", () => {
    it("rejects requests without admin key", async () => {
      const res = await fetch(`${BASE_URL}/api/push/stats`);
      expect(res.status).toBe(401);
    });

    it("returns subscriber count with valid admin key", async () => {
      const res = await fetch(`${BASE_URL}/api/push/stats`, {
        headers: { "x-admin-key": "dev-admin-key" },
      });
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toHaveProperty("subscribers");
      expect(typeof data.subscribers).toBe("number");
    });
  });

  describe("POST /api/push/subscribe", () => {
    it("rejects invalid subscription data", async () => {
      const res = await fetch(`${BASE_URL}/api/push/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: "" }),
      });
      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/push/send", () => {
    it("rejects requests without admin key", async () => {
      const res = await fetch(`${BASE_URL}/api/push/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Test", body: "Test body" }),
      });
      expect(res.status).toBe(401);
    });

    it("rejects requests with wrong admin key", async () => {
      const res = await fetch(`${BASE_URL}/api/push/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": "wrong-key",
        },
        body: JSON.stringify({ title: "Test", body: "Test body" }),
      });
      expect(res.status).toBe(401);
    });

    it("requires title and body with valid admin key", async () => {
      const res = await fetch(`${BASE_URL}/api/push/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": "dev-admin-key",
        },
        body: JSON.stringify({ title: "", body: "" }),
      });
      expect(res.status).toBe(400);
    });

    it("succeeds with valid admin key and payload (0 subscribers)", async () => {
      const res = await fetch(`${BASE_URL}/api/push/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": "dev-admin-key",
        },
        body: JSON.stringify({
          title: "Test Deal",
          body: "Half off pool towels!",
        }),
      });
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toHaveProperty("sent");
      expect(data).toHaveProperty("failed");
      expect(data.sent).toBe(0);
    });
  });

  describe("POST /api/push/unsubscribe", () => {
    it("rejects without endpoint", async () => {
      const res = await fetch(`${BASE_URL}/api/push/unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      expect(res.status).toBe(400);
    });
  });
});
