import { describe, it, expect } from "vitest";

describe("JSON utilities", () => {
  it("should parse valid JSON", () => {
    const json = '{"name":"devtool"}';

    const result = JSON.parse(json);

    expect(result.name).toBe("devtool");
  });

  it("should reject invalid JSON", () => {
    const json = '{"name":}';

    expect(() => JSON.parse(json)).toThrow();
  });

  it("should format JSON correctly", () => {
    const data = {
      name: "devtool",
      version: "1.0.0"
    };

    const formatted = JSON.stringify(data, null, 2);

    expect(formatted).toContain('"name": "devtool"');
    expect(formatted).toContain('"version": "1.0.0"');
  });
});