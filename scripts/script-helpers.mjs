import fs from "fs";
import path from "path";

export const getSnippetsSchema = (dir) => {
  const snippets = [];
  const allFilesAndFolders = fs.readdirSync(dir);
  let presentFiles = [];
  for (const item of allFilesAndFolders) {
    const isFolder = fs.lstatSync(path.join(dir, item)).isDirectory();
    if (isFolder) {
      presentFiles = [];
      snippets.push(...getSnippetsSchema(path.join(dir, item)));
    } else {
      if (item.includes(".mdx") || item.includes(".json")) {
        presentFiles.push(item);
      }
    }
    if (presentFiles.length === 2) {
      const slug = path.join(dir, presentFiles[0], "..").split("/").pop();
      if (slug) {
        snippets.push({
          name: slug,
          slug,
          mdxFilePath: path.join(
            dir,
            presentFiles.find((file) => file.includes(".mdx")) || ""
          ),
          jsonFilePath: path.join(
            dir,
            presentFiles.find((file) => file.includes(".json")) || ""
          ),
        });
      }
    }
  }
  return snippets;
};

export function checkAndCreateDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
