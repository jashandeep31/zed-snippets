import React from "react";
import { converters } from "./converter";
import Converter from "./components/converter";
import { Metadata } from "next/types";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const converter = converters.find((c) => c.slug === slug);
  if (!converter) {
    return {
      title: "Page Not Found | Zed Snippets",
      description:
        "The requested converter could not be found. Explore other code snippet converters on Zed Snippets.",
    };
  }
  return {
    title: `${converter.name} | Zed Snippets Converter`,
    description: `${converter.description} Use our free online tool to easily convert your code snippets.`,
    keywords: `${converter.name}, code snippet converter, Zed Snippets, ${converter.slug.replace("-", " ")}, code migration`,
  };
}

const page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const converter = converters.find((c) => c.slug === slug);
  if (!converter) {
    return <div className="container ">Please choose valid converter.</div>;
  }

  return (
    <div className="container md:mt-12 mt-6 pb-12 flex flex-col gap-6 ">
      <div>
        <h1 className="text-lg font-bold text-primary">{converter.name}</h1>
        <p className="text-sm text-muted-foreground">{converter.description}</p>
      </div>
      <Converter />
    </div>
  );
};

export default page;
