import { Command } from "commander";

import noteCommand from "./commands/note.js";
import githubCommand from "./commands/github.js";
import jsonCommand from "./commands/json.js";
import fileCommand from "./commands/file.js";
import uuidCommand from "./commands/uuid.js";

const program = new Command();

program
  .name("devtool")
  .description("Developer Productivity CLI")
  .version("1.0.0");

program.addCommand(noteCommand);
program.addCommand(githubCommand);
program.addCommand(jsonCommand);
program.addCommand(fileCommand);
program.addCommand(uuidCommand);

program.parse();