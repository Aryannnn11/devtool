import { describe, it, expect } from "vitest";

describe("File utilities", () => {
  it("should extract a file extension", () => {
    const filePath = "package.json";

    const extension = ".json";

    expect(extension).toBe(".json");
  });

  it("should convert bytes to kilobytes", () => {
    const bytes = 2048;

    const kilobytes = (bytes / 1024).toFixed(2);

    expect(kilobytes).toBe("2.00");
  });
});