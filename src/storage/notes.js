import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import {
  createNote,
  removeNote as removeNoteLogic
} from "../utils/notes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const notesFile = path.join(__dirname, "notes.json");

async function getNotes() {
  try {
    const data = await readFile(notesFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveNotes(notes) {
  await writeFile(
    notesFile,
    JSON.stringify(notes, null, 2),
    "utf-8"
  );
}

async function addNote(text) {
  const notes = await getNotes();

  const newNote = createNote(notes, text);

  notes.push(newNote);

  await saveNotes(notes);

  return newNote;
}

async function removeNote(id) {
  const notes = await getNotes();

  const { notes: updatedNotes, removedNote } =
    removeNoteLogic(notes, id);

  if (!removedNote) {
    return null;
  }

  await saveNotes(updatedNotes);

  return removedNote;
}

export {
  getNotes,
  saveNotes,
  addNote,
  removeNote
};