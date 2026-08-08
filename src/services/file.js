import { stat } from "fs/promises";
import path from "path";

async function getFileInfo(filePath) {
  const stats = await stat(filePath);

  return {
    name: path.basename(filePath),
    extension: path.extname(filePath),
    size: stats.size,
    createdAt: stats.birthtime,
    modifiedAt: stats.mtime,
    isFile: stats.isFile(),
    isDirectory: stats.isDirectory()
  };
}

export { getFileInfo };