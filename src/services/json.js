import { readFile } from "fs/promises";

async function readJsonFile(filePath) {
  const data = await readFile(filePath, "utf-8");

  return JSON.parse(data);
}

async function validateJsonFile(filePath) {
  try {
    await readJsonFile(filePath);
    return true;
  } catch {
    return false;
  }
}

export { readJsonFile, validateJsonFile };