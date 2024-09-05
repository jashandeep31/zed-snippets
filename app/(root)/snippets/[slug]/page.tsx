import { getSnippetBySlug } from "@/handlers/snippets.handler";
import React from "react";
import Mdx from "./components/Mdx";

const page = async ({ params }: { params: { slug: string } }) => {
  const snippet = await getSnippetBySlug(params.slug);
  if (!snippet) {
    return <div>Snippet not found</div>;
  }

  return (
    <div className="container md:mt-12 mt-6">
      <h1 className="text-lg text-primary md:text-3xl lg:text-4xl font-bold capitalize ">
        {snippet.name.split("_").join(" ")}
      </h1>
      <p className="text-muted-foreground font-medium text-sm">
        {snippet.description}
      </p>

      <div className="mt-6">
        <Mdx code={snippet.code} />
      </div>
    </div>
  );
};

export default page;
