import path from "path";
import fs from "fs";
import { checkAndCreateDir, getSnippetsSchema } from "./script-helpers.mjs";
import { serialize } from "next-mdx-remote/serialize";
import * as z from "zod";
import { fromError } from "zod-validation-error";
import chalk from "chalk";

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
  const allSnippets = getSnippetsSchema(PAGES_DIR);
  for (const tempSnippet of allSnippets) {
    try {
      const validateMdx = fs.readFileSync(tempSnippet.mdxFilePath, "utf-8");
      const serializedMdx = await serialize(validateMdx, {
        parseFrontmatter: true,
      });
      const parsedMdx = snippetMdxValidationSchema.safeParse(
        serializedMdx.frontmatter
      );
      if (!parsedMdx.success) {
        console.log(
          chalk.red.bgRed.bold(fromError(parsedMdx.error).toString())
        );
        console.log(chalk.yellow("Skipping snippet: ", tempSnippet.name));
      } else {
        validSnippets.push(tempSnippet);
        console.log(chalk.bgGreen("Validated snippet: ", tempSnippet.name));
        const validateSnippetDir = path
          .join(PAGES_DIR, tempSnippet.slug)
          .replace("/pages", "/.pages");
        checkAndCreateDir(validateSnippetDir);

        let newMdx = `${validateMdx}`;
        const snippets = JSON.parse(fs.readFileSync(tempSnippet.jsonFilePath));

        newMdx = `
<table>
  <tr>
    <th>Prefix</th>
    <th>Description</th>
  </tr>
`;

        Object.keys(snippets).forEach((key) => {
          newMdx =
            newMdx +
            `\n<tr>
  <td>${snippets[key].prefix}</td>
  <td>${snippets[key].description}</td>
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

        // fs.writeFileSync(
        //   tempSnippet.jsonFilePath,
        //   path.join(validateSnippetDir, "snippet.json")
        // );
      }
    } catch (e) {
      console.log(chalk.red.bgRed.bold(e.toString()));
      console.log(chalk.yellow("Skipping snippet: ", tempSnippet.name));
    }
  }
};
snippetsMdxPreProcessor();