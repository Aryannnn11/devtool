function createNote(notes, text) {
  const newId =
    notes.length > 0
      ? Math.max(...notes.map((note) => note.id)) + 1
      : 1;

  return {
    id: newId,
    text,
    createdAt: new Date().toISOString()
  };
}

function removeNote(notes, id) {
  const noteId = Number(id);

  const noteIndex = notes.findIndex(
    (note) => note.id === noteId
  );

  if (noteIndex === -1) {
    return {
      notes,
      removedNote: null
    };
  }

  const updatedNotes = [...notes];
  const removedNote = updatedNotes.splice(noteIndex, 1)[0];

  return {
    notes: updatedNotes,
    removedNote
  };
}

export { createNote, removeNote };