import path from "path";
// import { getAllSnippetsArray } from "./helpers/snippet.helper";
import { SnippetModel } from "./types";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
import { visit } from "unist-util-visit";
import rehypePrettyCode from "rehype-pretty-code";
import { allSnippets } from "@/lib/all-snippets";

const ROOT_DIR = path.join(process.cwd());
// const PAGES_DIR = path.join(ROOT_DIR, ".pages/snippets");

export const getAllSnippets = async (): Promise<
  (SnippetModel & { description: string; language: string })[]
> => {
  // const tempSnippets = allSnippets;

  // const snippets: (SnippetModel & { description: string; language: string })[] =
  //   [];

  // for (const snippet of tempSnippets) {
  //   const mdx = fs.readFileSync(snippet.mdxFilePath, "utf-8");
  //   const { frontmatter } = await serialize(mdx, {
  //     parseFrontmatter: true,
  //   });
  //   snippets.push({
  //     ...snippet,
  //     description: (frontmatter.description as string) ?? "",
  //     language: (frontmatter.language as string) ?? "",
  //   });
  // }
  return allSnippets;
};

const REHYPE_THEME_OPTIONS = {
  theme: "github-light",
  // theme: "aurora-x",
  // theme: "dracula",
  keepBackground: true,
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
  const snippets = allSnippets;
  const tempSnippet = snippets.find((s) => s.slug === slug);
  if (!tempSnippet) return null;

  const serializedMdx = await serialize(
    fs.readFileSync(path.join(ROOT_DIR + tempSnippet.mdxFilePath), "utf-8"),
    {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          () => (tree: any) =>
            visit(tree, (node) => {
              if (node?.type === "element" && node?.tagName === "pre") {
                const [codeEl] = node.children;
                if (codeEl.tagName !== "code") {
                  return;
                }

                let __title__ = "";
                if (codeEl.data?.meta.includes("title=")) {
                  const regex = /title="([^"]*)"/;
                  const match = codeEl.data?.meta.match(regex);
                  __title__ = match ? match[1] : "";
                }

                node.__title__ = __title__;
              }
            }),
          [rehypePrettyCode, REHYPE_THEME_OPTIONS],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          () => (tree: any) =>
            visit(tree, (node) => {
              if (node?.type === "element") {
                if (!("data-rehype-pretty-code-figure" in node.properties)) {
                  return;
                }
                const preElement = node.children.at(-1);
                if (preElement.tagName !== "pre") {
                  return;
                }
                if (node.__title__) {
                  preElement.properties["__title__"] = node.__title__;
                }
              }
            }),
        ],
      },
    }
  );
  console.log(serializedMdx);
  const snippet = {
    ...tempSnippet,
    name: (serializedMdx.frontmatter.name as string) ?? tempSnippet.name,
    code: serializedMdx,
  };
  return snippet;
};
