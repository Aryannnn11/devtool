"use strict";

// This is a browser-only, safe simulation of DevTool's commands.
// It never executes shell commands or reads a visitor's local files.
const output = document.querySelector("#output");
const form = document.querySelector("#command-form");
const input = document.querySelector("#command");
const clearButton = document.querySelector("#clear");
const DEMO_NOTES_KEY = "devtool-browser-demo-notes-v1";
const files = {
  "example.json": '{ "project": "DevTool", "version": 1, "features": ["uuid", "json", "notes"] }',
  "invalid.json": '{ "project": "DevTool", missingQuotes: true }',
  "package.json": '{ "name": "aryan-devtool-cli", "version": "1.0.0", "type": "module" }'
};
let memoryNotes = [];
let history = [];
let historyIndex = 0;

function line(message = "", kind = "") {
  const node = document.createElement("div");
  node.className = "line " + kind;
  node.textContent = String(message);
  output.append(node);
  output.scrollTop = output.scrollHeight;
  return node;
}
function notesRead() {
  try {
    const parsed = JSON.parse(localStorage.getItem(DEMO_NOTES_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch { return memoryNotes; }
}
function notesWrite(notes) {
  memoryNotes = notes;
  try { localStorage.setItem(DEMO_NOTES_KEY, JSON.stringify(notes)); } catch { /* storage disabled */ }
}
// Whitespace and quoted arguments; deliberately not a full shell parser.
function parseArgs(text) {
  const result = [];
  let part = "", quote = null, started = false;
  for (const c of text) {
    if (quote) {
      if (c === quote) quote = null;
      else part += c;
    } else if (c === '"' || c === "'") {
      quote = c; started = true;
    } else if (/\s/.test(c)) {
      if (started) { result.push(part); part = ""; started = false; }
    } else {
      part += c; started = true;
    }
  }
  if (quote) throw new Error("Unclosed quote. Try wrapping text in matching quotes.");
  if (started) result.push(part);
  return result;
}
function help() {
  line("DevTool — Developer Productivity CLI (browser playground)", "ok");
  line("");
  line("  help                          Show available commands");
  line("  uuid                          Generate a UUID");
  line("  github owner/repo             Read public GitHub repository metadata");
  line("  note add \"your note\"          Add a browser-local note");
  line("  note list                     List your notes");
  line("  note remove ID                Delete one note");
  line("  json validate example.json    Validate sample JSON");
  line("  json format example.json      Format sample JSON");
  line("  file example.json             Inspect a sample file");
  line("  files                         List available demo files");
  line("  clear                         Clear terminal output");
  line("");
  line("Tip: Use ↑ / ↓ for history, or tap a shortcut above.", "muted");
}
async function github(args) {
  if (args.length !== 1 || !/^[\w.-]+\/[\w.-]+$/.test(args[0]) || args[0].length > 150) {
    line("Usage: github owner/repo", "warn"); return;
  }
  const [owner, repo] = args[0].split("/");
  const loading = line("Fetching public GitHub metadata…", "muted");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const response = await fetch(
      "https://api.github.com/repos/" + encodeURIComponent(owner) + "/" + encodeURIComponent(repo),
      { headers: { "Accept": "application/vnd.github+json" }, signal: controller.signal }
    );
    if (response.status === 404) throw new Error("Repository not found.");
    if (response.status === 403) throw new Error("GitHub API rate limit reached. Try again later.");
    if (!response.ok) throw new Error("GitHub returned HTTP " + response.status);
    const data = await response.json();
    loading.textContent = "Repository: " + data.full_name;
    loading.className = "line ok";
    line("Description: " + (data.description || "No description"));
    line("Stars: " + data.stargazers_count + "   Forks: " + data.forks_count);
    line("Language: " + (data.language || "Not specified"));
    line("Open issues: " + data.open_issues_count);
    return;
  } catch (err) {
    loading.textContent = err.name === "AbortError" ? "GitHub request timed out." : (err.message || "GitHub lookup failed.");
    loading.className = "line err";
  } finally {
    clearTimeout(timer);
  }
}
function json(args) {
  const [action, name] = args;
  if (!["validate", "format"].includes(action) || args.length !== 2) {
    line("Usage: json validate <demo-file> | json format <demo-file>", "warn"); return;
  }
  if (!Object.hasOwn(files, name)) {
    line("File not found in demo. Type 'files' to list sample files.", "err"); return;
  }
  try {
    const parsed = JSON.parse(files[name]);
    if (action === "validate") line("✓ Valid JSON: " + name, "ok");
    else line(JSON.stringify(parsed, null, 2));
  } catch {
    line("✗ Invalid JSON: " + name, "err");
  }
}
function file(args) {
  const name = args[0];
  if (args.length !== 1 || !Object.hasOwn(files, name)) {
    line("Usage: file <demo-file>  — type 'files' to list sample files.", "warn"); return;
  }
  line("File: " + name, "ok");
  line("Size: " + (new Blob([files[name]]).size / 1024).toFixed(2) + " KB");
  line("Extension: .json");
  line("Source: virtual demo filesystem (not your computer)", "muted");
}
function note(args) {
  const action = args[0];
  let notes = notesRead();
  if (action === "add") {
    const value = args.slice(1).join(" ").trim();
    if (!value || value.length > 300) { line("Usage: note add \"text\" (1–300 characters)", "warn"); return; }
    const nextId = Math.max(0, ...notes.map(n => Number(n.id) || 0)) + 1;
    notes = [...notes, { id: nextId, text: value, createdAt: new Date().toISOString() }];
    notesWrite(notes);
    line("✓ Note added [" + nextId + "]: " + value, "ok");
  } else if (action === "list") {
    if (!notes.length) { line("No notes yet. Try: note add \"Ship the project\"", "muted"); return; }
    line("Your local notes (" + notes.length + ")", "ok");
    for (const n of notes) line("[" + n.id + "] " + n.text);
  } else if (action === "remove") {
    const id = Number(args[1]);
    if (args.length !== 2 || !Number.isInteger(id)) { line("Usage: note remove ID", "warn"); return; }
    const updated = notes.filter(n => Number(n.id) !== id);
    if (updated.length === notes.length) { line("Note not found: " + args[1], "warn"); return; }
    notesWrite(updated);
    line("✓ Note " + id + " removed", "ok");
  } else line("Usage: note add \"text\" | note list | note remove ID", "warn");
}
async function execute(raw) {
  const command = raw.trim();
  if (!command) return;
  history.push(command); historyIndex = history.length;
  line("visitor@devtool ~ $ " + command, "input");
  let args;
  try { args = parseArgs(command); } catch (e) { line(e.message, "err"); return; }
  const [cmd, ...rest] = args;
  switch (cmd.toLowerCase()) {
    case "help": case "--help": case "-h": help(); break;
    case "version": case "--version": case "-v": line("DevTool v1.0.0 (browser demo)", "ok"); break;
    case "uuid":
      if (rest.length) line("Usage: uuid", "warn");
      else if (globalThis.crypto?.randomUUID) line(crypto.randomUUID(), "ok");
      else line("UUID generation requires a secure browser context.", "err");
      break;
    case "github": await github(rest); break;
    case "note": note(rest); break;
    case "json": json(rest); break;
    case "file": file(rest); break;
    case "files": line(Object.keys(files).join("   "), "ok"); break;
    case "clear": output.replaceChildren(); break;
    default: line("Command not found: " + cmd + ". Type 'help' for supported commands.", "err");
  }
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = "";
  await execute(text);
  input.focus();
});
clearButton.addEventListener("click", () => { output.replaceChildren(); input.focus(); });
document.querySelectorAll("[data-cmd]").forEach(btn =>
  btn.addEventListener("click", async () => { await execute(btn.dataset.cmd); input.focus(); })
);
input.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && history.length) {
    e.preventDefault(); historyIndex = Math.max(0, historyIndex - 1); input.value = history[historyIndex];
  } else if (e.key === "ArrowDown") {
    e.preventDefault(); historyIndex = Math.min(history.length, historyIndex + 1);
    input.value = history[historyIndex] || "";
  } else if (e.key === "Tab") {
    const commands = ["help", "uuid", "github ", "note add ", "note list", "note remove ", "json format ", "json validate ", "file ", "files", "clear"];
    const matches = commands.filter(c => c.startsWith(input.value.toLowerCase()));
    if (matches.length === 1) { e.preventDefault(); input.value = matches[0]; }
  }
});
line("DevTool browser playground  ·  v1.0.0", "ok");
line("Safe demo mode — no commands run on your machine.", "muted");
line("Type 'help' or select a shortcut to get started.", "muted");
line("");
