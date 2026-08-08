import { Command } from "commander";
import {
  getNotes,
  addNote,
  removeNote
} from "../storage/notes.js";

const noteCommand = new Command("note");

noteCommand.description("Manage your developer notes");

noteCommand
  .command("add")
  .argument("<text>", "Note content")
  .description("Add a new note")
  .action(async (text) => {
    try {
      const note = await addNote(text);

      console.log(`✓ Note added: "${note.text}"`);
    } catch {
      console.log("Unable to add note.");
    }
  });

noteCommand
  .command("list")
  .description("List all notes")
  .action(async () => {
    try {
      const notes = await getNotes();

      if (notes.length === 0) {
        console.log("No notes found.");
        return;
      }

      console.log("\nYour Notes:\n");

      notes.forEach((note) => {
        console.log(`[${note.id}] ${note.text}`);
        console.log(`    Created: ${note.createdAt}`);
        console.log();
      });
    } catch {
      console.log("Unable to load notes.");
    }
  });

noteCommand
  .command("remove")
  .argument("<id>", "ID of the note to remove")
  .description("Remove a note")
  .action(async (id) => {
    try {
      const removedNote = await removeNote(id);

      if (!removedNote) {
        console.log(`Note with ID ${id} not found.`);
        return;
      }

      console.log(`✓ Removed note: "${removedNote.text}"`);
    } catch {
      console.log("Unable to remove note.");
    }
  });

export default noteCommand;