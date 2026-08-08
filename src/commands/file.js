import { Command } from "commander";
import { getFileInfo } from "../services/file.js";

const fileCommand = new Command("file");

fileCommand
  .description("Inspect a file")
  .argument("<path>", "Path to the file")
  .action(async (filePath) => {
    try {
      const info = await getFileInfo(filePath);

      if (info.isDirectory) {
        console.log("The provided path is a directory.");
        return;
      }

      const sizeInKB = (info.size / 1024).toFixed(2);

      console.log(`\nFile: ${info.name}`);
      console.log(`Size: ${sizeInKB} KB`);
      console.log(`Extension: ${info.extension || "None"}`);
      console.log(`Created: ${info.createdAt.toLocaleString()}`);
      console.log(`Modified: ${info.modifiedAt.toLocaleString()}`);
    } catch (error) {
      console.log("Unable to inspect the file.");
    }
  });

export default fileCommand;