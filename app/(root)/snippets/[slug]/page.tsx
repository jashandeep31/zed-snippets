import { getSnippetBySlug } from "@/handlers/snippets.handler";
import React from "react";
import PageClient from "./components/page-client";

const page = async ({ params }: { params: { slug: string } }) => {
  const snippet = await getSnippetBySlug(params.slug);
  if (!snippet) {
    return <div>Snippet not found</div>;
  }

  return <PageClient snippet={snippet} />;
};

export default page;
