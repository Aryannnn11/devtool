import { Command } from "commander";
import { generateUUID } from "../utils/uuid.js";

const uuidCommand = new Command("uuid");

uuidCommand
  .description("Generate a unique UUID")
  .action(() => {
    const uuid = generateUUID();

    console.log(`Generated UUID:\n${uuid}`);
  });

export default uuidCommand;