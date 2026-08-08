import { Command } from "commander";
import { readJsonFile, validateJsonFile } from "../services/json.js";

const jsonCommand = new Command("json");

jsonCommand.description("JSON utilities");

jsonCommand
  .command("format")
  .argument("<file>", "Path to JSON file")
  .description("Format and display a JSON file")
  .action(async (file) => {
    try {
      const data = await readJsonFile(file);

      console.log(JSON.stringify(data, null, 2));
    } catch {
      console.log("Unable to read or parse the JSON file.");
    }
  });

jsonCommand
  .command("validate")
  .argument("<file>", "Path to JSON file")
  .description("Validate a JSON file")
  .action(async (file) => {
    const valid = await validateJsonFile(file);

    if (valid) {
      console.log("✓ Valid JSON");
    } else {
      console.log("✗ Invalid JSON");
    }
  });

export default jsonCommand;