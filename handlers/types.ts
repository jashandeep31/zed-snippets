export interface SnippetModel {
  name: string;
  slug: string;
  mdxFilePath: string;
  jsonFilePath: string;
}
export interface Snippet extends SnippetModel {
  mdx: string;
  description: string;
  snippets: string;
}
