import { buttonVariants } from "@/components/ui/button";
import { allSnippets } from "@/lib/all-snippets";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const snippet = allSnippets.find((s) => s.slug === params.slug);
  if (!snippet) {
    return <div>Snippet not found</div>;
  }
  return (
    <div>
      <h1 className="text-lg text-primary md:text-3xl lg:text-4xl font-bold capitalize ">
        {snippet.name.split("_").join(" ")}
      </h1>
      <p className="text-muted-foreground font-medium text-sm">
        {snippet.description}
      </p>
      <div>
        <div className="mt-4">
          <Link
            href={`https://github.com/jashandeep31/zed-snippets/blob/main/pages/snippets/${snippet.slug}/snippet.json`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "outline-primary border-primary hover:bg-primary hover:text-white duration-300"
            )}
            target="__blank"
          >
            Get Snippets JSON
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
