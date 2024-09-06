import React from "react";
import { Lora } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
const lora = Lora({ subsets: ["latin"] });
import "./landing.css";
import { getAllSnippets } from "@/handlers/snippets.handler";

export default async function page() {
  const snippets = await getAllSnippets();
  return (
    <div className="">
      <section className="container md:mt-12 mt-6  pt-6 md:pt-10 lg:pt-32">
        <div className="max-w-[64rem] mx-auto flex flex-col items-center">
          <h1
            className={`text-3xl md:text-5xl lg:text-6xl font-medium text-primary  ${lora.className}`}
          >
            Zed Code Snippets
          </h1>
          <p className="text-muted-foreground mt-7">
            Get you custom code snippets for zed code editor.
          </p>
          <div className="flex items-center gap-2 mt-8">
            <Input className="bg-background" />{" "}
            <Button variant={"outline"}>Search</Button>
          </div>
        </div>
      </section>
      <section className=" container mt-6 md:mt-12 lg:mt-24">
        <div className="grid md:grid-cols-4 gap-4">
          {snippets.map((snippet) => (
            <Link
              key={snippet.slug}
              href={`/snippets/${snippet.slug}`}
              className="border p-2 rounded  hover:border-primary  duration-300 bg-background h-full flex flex-col justify-between"
            >
              <div>
                <h2 className={cn(lora.className, "")}>{snippet.slug}</h2>
                <p className="text-muted-foreground text-sm">
                  {snippet.description}
                  {snippet.mdxFilePath}
                </p>
              </div>
              <h3 className="text-muted-foreground flex items-center gap-1 text-sm font-medium mt-4">
                <Code size={16} /> <span>{snippet.language}</span>
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
