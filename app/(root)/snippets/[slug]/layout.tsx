// import { getSnippetBySlug } from "@/handlers/snippets.handler";
import React from "react";
import type { Metadata } from "next";
import { allSnippets } from "@/lib/all-snippets";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const snippet = allSnippets.find((s) => s.slug === params.slug);

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

const page = async ({
  metaInfo,
  snippets,
}: {
  metaInfo: React.ReactNode;
  snippets: React.ReactNode;
}) => {
  return (
    <>
      <div className="container md:mt-12 mt-6">
        {metaInfo}
        {snippets}
      </div>
    </>
  );
};

export default page;
