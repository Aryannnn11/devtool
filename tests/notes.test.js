import { describe, it, expect } from "vitest";
import { addNote, removeNote } from "../src/storage/notes.js";

describe("Notes", () => {
  it("should create a note", async () => {
    const note = await addNote("Test note");

    expect(note).toHaveProperty("id");
    expect(note.text).toBe("Test note");
    expect(note).toHaveProperty("createdAt");
  });

  it("should create notes with different IDs", async () => {
    const note1 = await addNote("First note");
    const note2 = await addNote("Second note");

    expect(note1.id).not.toBe(note2.id);
  });

  it("should return null when removing a missing note", async () => {
    const result = await removeNote(999999);

    expect(result).toBeNull();
  });
});