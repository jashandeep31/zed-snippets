import { getSnippetBySlug } from "@/handlers/snippets.handler";
import React from "react";
import PageClient from "./components/page-client";
import type { Metadata } from "next";
import { allSnippets } from "@/lib/all-snippets";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const snippet = await getSnippetBySlug(params.slug);
  if (!snippet) {
    return {
      title: "Page Not Found | Zed Snippets",
      description:
        "The requested snippet could not be found. Explore other code snippets on Zed Snippets.",
    };
  }
  return {
    title: snippet.name + ` | Zed Snippets`,
    description: snippet.description,
    keywords: `${snippet.language}, code snippet, ${snippet.name}, Zed Snippets`,
  };
}

const page = async ({ params }: { params: { slug: string } }) => {
  // const snippet = await getSnippetBySlug(params.slug);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const snippet: any = allSnippets.find((s) => s.slug === params.slug);
  if (!snippet) {
    return <div>Snippet not found</div>;
  }

  return <PageClient snippet={snippet} />;
};

export default page;
