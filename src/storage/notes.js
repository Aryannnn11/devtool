import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

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

  const newId =
    notes.length > 0
      ? Math.max(...notes.map((note) => note.id)) + 1
      : 1;

  const newNote = {
    id: newId,
    text,
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);

  await saveNotes(notes);

  return newNote;
}

async function removeNote(id) {
  const notes = await getNotes();

  const noteId = Number(id);

  const noteIndex = notes.findIndex(
    (note) => note.id === noteId
  );

  if (noteIndex === -1) {
    return null;
  }

  const removedNote = notes.splice(noteIndex, 1)[0];

  await saveNotes(notes);

  return removedNote;
}

export {
  getNotes,
  saveNotes,
  addNote,
  removeNote
};