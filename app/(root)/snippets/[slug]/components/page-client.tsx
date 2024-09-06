"use client";
import { SnippetModel } from "@/handlers/types";
import React, { useEffect, useState } from "react";
import Mdx from "./mdx";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const PageClient = ({
  snippet,
}: {
  snippet: SnippetModel & {
    description: string;
    language: string;
    code: MDXRemoteSerializeResult<
      Record<string, unknown>,
      Record<string, unknown>
    >;
  };
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "instant" });
      }
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <div className="container md:mt-12 mt-6">
        <h1 className="text-lg text-primary md:text-3xl lg:text-4xl font-bold capitalize ">
          {snippet.name.split("_").join(" ")}
        </h1>
        <p className="text-muted-foreground font-medium text-sm">
          {snippet.description}
        </p>
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
        <div className="mt-6 mdx">{/* <Mdx code={snippet.code} /> */}</div>
      </div>
    </div>
  );
};

export default PageClient;
