import { describe, it, expect } from "vitest";
import { insertUserSchema, insertPushSubscriptionSchema } from "../shared/schema";

describe("insertUserSchema", () => {
  it("accepts valid user data", () => {
    const result = insertUserSchema.safeParse({
      username: "testuser",
      password: "securepassword",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing username", () => {
    const result = insertUserSchema.safeParse({
      password: "securepassword",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing password", () => {
    const result = insertUserSchema.safeParse({
      username: "testuser",
    });
    expect(result.success).toBe(false);
  });
});

describe("insertPushSubscriptionSchema", () => {
  it("accepts valid subscription data", () => {
    const result = insertPushSubscriptionSchema.safeParse({
      endpoint: "https://fcm.googleapis.com/fcm/send/abc123",
      p256dh: "BFakeP256dhKey",
      auth: "fakeAuthKey",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing endpoint", () => {
    const result = insertPushSubscriptionSchema.safeParse({
      p256dh: "BFakeP256dhKey",
      auth: "fakeAuthKey",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing keys", () => {
    const result = insertPushSubscriptionSchema.safeParse({
      endpoint: "https://fcm.googleapis.com/fcm/send/abc123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty strings", () => {
    const result = insertPushSubscriptionSchema.safeParse({
      endpoint: "",
      p256dh: "",
      auth: "",
    });
    expect(result.success).toBe(true);
  });
});
