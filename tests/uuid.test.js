import { describe, it, expect } from "vitest";
import { generateUUID } from "../src/utils/uuid.js";

describe("UUID generator", () => {
  it("should generate a UUID", () => {
    const uuid = generateUUID();

    expect(uuid).toBeDefined();
    expect(typeof uuid).toBe("string");
  });

  it("should generate unique UUIDs", () => {
    const uuid1 = generateUUID();
    const uuid2 = generateUUID();

    expect(uuid1).not.toBe(uuid2);
  });

  it("should generate a UUID with the correct format", () => {
    const uuid = generateUUID();

    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });
});