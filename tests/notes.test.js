import { describe, it, expect } from "vitest";
import {
  createNote,
  removeNote
} from "../src/utils/notes.js";

describe("Note logic", () => {
  it("should create a new note", () => {
    const notes = [
      {
        id: 1,
        text: "Learn JavaScript",
        createdAt: "2026-08-09"
      }
    ];

    const note = createNote(notes, "Learn Node.js");

    expect(note.id).toBe(2);
    expect(note.text).toBe("Learn Node.js");
    expect(note).toHaveProperty("createdAt");
  });

  it("should create the first note with ID 1", () => {
    const note = createNote([], "First note");

    expect(note.id).toBe(1);
  });

  it("should remove a note", () => {
    const notes = [
      {
        id: 1,
        text: "Learn JavaScript"
      },
      {
        id: 2,
        text: "Learn Node.js"
      }
    ];

    const result = removeNote(notes, 1);

    expect(result.removedNote.text).toBe("Learn JavaScript");
    expect(result.notes).toHaveLength(1);
    expect(result.notes[0].id).toBe(2);
  });

  it("should return null when note does not exist", () => {
    const notes = [
      {
        id: 1,
        text: "Learn JavaScript"
      }
    ];

    const result = removeNote(notes, 999);

    expect(result.removedNote).toBeNull();
    expect(result.notes).toHaveLength(1);
  });
});