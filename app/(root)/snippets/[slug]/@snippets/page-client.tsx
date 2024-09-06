"use client";
import { SnippetModel } from "@/handlers/types";
import React, { useEffect, useState } from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Mdx from "./components/mdx";

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
      <div className="mt-6 mdx">
        <Mdx code={snippet.code} />
      </div>
    </div>
  );
};

export default PageClient;
