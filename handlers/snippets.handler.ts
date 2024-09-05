import path from "path";
import { getAllSnippetsArray } from "./helpers/snippet.helper";
import { SnippetModel } from "./types";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
// import { visit } from "unist-util-visit";
import rehypePrettyCode from "rehype-pretty-code";

const ROOT_DIR = path.join(process.cwd());
const PAGES_DIR = path.join(ROOT_DIR, ".pages/snippets");

export const getAllSnippets = async (): Promise<
  (SnippetModel & { description: string; language: string })[]
> => {
  const tempSnippets = getAllSnippetsArray(PAGES_DIR);

  const snippets: (SnippetModel & { description: string; language: string })[] =
    [];

  for (const snippet of tempSnippets) {
    const mdx = fs.readFileSync(snippet.mdxFilePath, "utf-8");
    const { frontmatter } = await serialize(mdx, {
      parseFrontmatter: true,
    });
    console.log(frontmatter.description);
    snippets.push({
      ...snippet,
      description: (frontmatter.description as string) ?? "",
      language: (frontmatter.language as string) ?? "",
    });
  }
  console.log(`first`);
  return snippets;
};

const REHYPE_THEME_OPTIONS = {
  // theme: "github-light",
  theme: "aurora-x",
  // theme: "dracula",
  keepBackground: false,
};

export const getSnippetBySlug = async (
  slug: string
): Promise<
  | (SnippetModel & {
      description: string;
      language: string;
      code: MDXRemoteSerializeResult<
        Record<string, unknown>,
        Record<string, unknown>
      >;
    })
  | null
> => {
  const snippets = await getAllSnippets();
  const tempSnippet = snippets.find((s) => s.slug === slug);
  if (!tempSnippet) return null;
  const serializedMdx = await serialize(
    fs.readFileSync(tempSnippet.mdxFilePath, "utf-8"),
    {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [[rehypePrettyCode, REHYPE_THEME_OPTIONS]],
      },
    }
  );

  const snippet = {
    ...tempSnippet,
    code: serializedMdx,
  };
  return snippet;
};