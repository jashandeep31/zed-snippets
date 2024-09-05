import * as z from "zod";

// Define the schema for a single snippet
const snippetSchema = z.object({
  prefix: z.string(),
  body: z.union([z.string(), z.array(z.string())]),
  description: z.string().nullable().optional(),
});

// Define the schema for all snippets (a record of Snippet objects)
const snippetsSchema = z.record(snippetSchema);

type Snippets = z.infer<typeof snippetsSchema>;

// Converter interface updated to use the inferred types
export interface Converter {
  name: string;
  slug: string;
  description: string;
  convertor: (value: string) => string;
  validator: (value: string) => boolean;
}

export const converters: Converter[] = [
  {
    name: "VS Code to Zed",
    slug: "vs-to-zed",
    description:
      "Convert your valid VS Code snippets to the Zed VS Code snippets",

    convertor: (value: string) => {
      const rawSnippets = JSON.parse(value) as Snippets;

      const snippets: Snippets = {};

      Object.keys(rawSnippets).forEach((key) => {
        const snippet = rawSnippets[key];
        snippets[snippet.description ?? key] = {
          prefix: snippet.prefix,
          body: snippet.body,
          description: snippet.description ?? key,
        };
      });

      return JSON.stringify(snippets, null, 2);
    },

    validator: (value: string) => {
      try {
        const rawSnippets = JSON.parse(value);
        const parsed = snippetsSchema.safeParse(rawSnippets); // Validate against the ZED schema
        if (!parsed.success) {
          return false;
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
];
