import fs from "fs";
import { SnippetModel } from "../types";
import path from "path";

export const getAllSnippetsArray = (dir: string): SnippetModel[] => {
  const snippets: SnippetModel[] = [];
  const allFilesAndFolders = fs.readdirSync(dir);
  let presentFiles = [];
  for (const item of allFilesAndFolders) {
    const isFolder = fs.lstatSync(path.join(dir, item)).isDirectory();
    if (isFolder) {
      presentFiles = [];
      snippets.push(...getAllSnippetsArray(path.join(dir, item)));
    } else {
      console.log(`first`);
      if (item.includes(".mdx") || item.includes(".json")) {
        presentFiles.push(item);
      }
    }

    if (presentFiles.length >= 1) {
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
