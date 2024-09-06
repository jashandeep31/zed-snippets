import path from "path";
import fs from "fs";
import { checkAndCreateDir, getSnippetsSchema } from "./script-helpers.mjs";
import { serialize } from "next-mdx-remote/serialize";
import * as z from "zod";
import { fromError } from "zod-validation-error";
import chalk from "chalk";
import he from "he";

export const ROOT_DIR = process.cwd();
export const PAGES_DIR = path.join(ROOT_DIR, "/pages/snippets");

const snippetMdxValidationSchema = z.object({
  name: z.string(),
  description: z.string().refine((val) => val.split(/\s+/).length <= 20, {
    message: "Max length of description is 20 words",
  }),
  language: z.enum(["javascript", "python"]),
});

const snippetsMdxPreProcessor = async () => {
  const validSnippets = [];
  const searchQueries = [];
  const allSnippets = getSnippetsSchema(PAGES_DIR);
  for (const tempSnippet of allSnippets) {
    try {
      const validateMdx = fs.readFileSync(tempSnippet.mdxFilePath, "utf-8");
      const serializedMdx = await serialize(validateMdx, {
        parseFrontmatter: true,
      });
      const parsedMdx = snippetMdxValidationSchema.safeParse(
        serializedMdx.frontmatter,
      );
      if (!parsedMdx.success) {
        console.log(
          chalk.red.bgRed.bold(fromError(parsedMdx.error).toString()),
        );
        console.log(chalk.yellow("Skipping snippet: ", tempSnippet.name));
      } else {
        validSnippets.push(tempSnippet);
        console.log(chalk.bgGreen("Validated snippet: ", tempSnippet.name));
        const validateSnippetDir = path
          .join(PAGES_DIR, tempSnippet.slug)
          .replace("/pages", "/.pages");
        checkAndCreateDir(validateSnippetDir);
        searchQueries.push({
          name: tempSnippet.name,
          url: `/snippets/${tempSnippet.slug}`,
          description: serializedMdx.frontmatter.description,
          type: "page",
        });

        let newMdx = `${validateMdx}`;
        const snippets = JSON.parse(fs.readFileSync(tempSnippet.jsonFilePath));

        newMdx =
          newMdx +
          `\n
<table>
  <tr>
    <th>Prefix</th>
    <th>Description</th>
  </tr>
`;

        Object.keys(snippets).forEach((key) => {
          searchQueries.push({
            name: snippets[key].prefix + " - " + tempSnippet.name,
            url: `/snippets/${tempSnippet.slug}#${snippets[key].prefix}`,
            description: snippets[key].description,
            type: "snippet",
          });
          newMdx =
            newMdx +
            `\n<tr>
          <td><a href="#${snippets[key].prefix}">${
            snippets[key].prefix
          }</a></td>
          <td>${he.encode(snippets[key].description, {
            useNamedReferences: false,
            decimal: false,
            encodeEverything: true,
          })}</td>
        </tr>`;
        });

        newMdx = newMdx + `\n</table>`;

        Object.keys(snippets).forEach((key) => {
          newMdx =
            newMdx +
            `
\n

\`\`\`json title="${snippets[key].prefix}"
${JSON.stringify(snippets[key], null, 2)}
\`\`\`
`;
        });
        fs.writeFileSync(path.join(validateSnippetDir, "page.mdx"), newMdx);
        fs.writeFileSync(
          ROOT_DIR + "/lib/search-queries.ts",
          `export const searchQueries:{name:string; url:string ; description:string ; type:"page"|"snippet"}[] = ${JSON.stringify(
            // sorby type
            searchQueries.sort((a, b) => {
              if (a.type === "page" && b.type === "snippet") {
                return -1; // "page" comes before "snippet"
              } else if (a.type === "snippet" && b.type === "page") {
                return 1; // "snippet" comes after "page"
              }
              return 0; // If both are the same, no change
            }),
          )}`,
        );
        fs.copyFileSync(
          tempSnippet.jsonFilePath,
          path.join(validateSnippetDir, "snippet.json"),
        );
      }
    } catch (e) {
      console.log(chalk.bgRed.bold(e.toString()));
      console.log(chalk.yellow("Skipping snippet: ", tempSnippet.name));
    }
  }
};
snippetsMdxPreProcessor();
