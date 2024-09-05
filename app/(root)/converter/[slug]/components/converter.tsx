"use client";
import React, { useCallback, useEffect, useState } from "react";
import { converters, Converter as IConverter } from "../converter";
import { usePathname } from "next/navigation";
import InputEditor from "./input-editor";
import OutputEditor from "./output-editor";

const Converter = () => {
  const pathname = usePathname();
  const [converter, setConverter] = useState<
    "loading" | "not-found" | IConverter
  >("loading");
  const [inputData, setInputData] = useState<{
    input: string;
    error: string;
    isValid: boolean;
  }>({
    input: `{}`,
    isValid: true,
    error: "",
  });
  const [outputData, setOutputData] = useState("");

  const handleConversion = useCallback(() => {
    if (typeof converter === "object") {
      const isValid = converter.validator(inputData.input);
      if (isValid) {
        setInputData((prevState) => ({
          ...prevState,
          isValid,
        }));
        setOutputData(converter.convertor(inputData.input));
      } else {
        setInputData((prevState) => ({
          ...prevState,
          isValid,
        }));
        setOutputData("");
      }
    }
  }, [converter, inputData.input]);

  useEffect(() => {
    if (converter === "loading" || converter === "not-found") return;
    handleConversion();
  }, [inputData.input, converter, handleConversion]);

  useEffect(() => {
    const converter = converters.find(
      (c) => c.slug === pathname.replace("/converter/", "")
    );
    if (converter) {
      setConverter(converter);
    }
  }, [pathname]);

  if (converter === "not-found") {
    return <div className="container">Please choose valid convertor</div>;
  }
  return (
    <div className="border flex-1 grid md:grid-cols-2">
      <InputEditor inputData={inputData} setInputData={setInputData} />
      <OutputEditor outputData={outputData} setOutputData={setOutputData} />
    </div>
  );
};

export default Converter;

// useEffect(() => {
//   const rawSnippets = JSON.parse(`{
//     "createRef": {
//      "key": "createRef",
//      "prefix": "cref",
//      "body": ["this.\${1:first}Ref = React.createRef()"],
//      "description": "Create ref statement used inside constructor",
//      "scope": "typescript,typescriptreact,javascript,javascriptreact"
//     },"createRef1": {
//      "key": "createRef",
//      "prefix": "cref",
//      "body": ["this.\${1:first}Ref = React.createRef()"],
//      "description": "Create ref statement used inside constructor",
//      "scope": "typescript,typescriptreact,javascript,javascriptreact"
//     }}`);

//   interface Snippet {
//     prefix: string;
//     body: string[];
//     description: string;
//   }

//   const snippets: {
//     [key: string]: Snippet;
//   } = {};
//   Object.keys(rawSnippets).map((key) => {
//     const snippet = rawSnippets[key];
//     snippets[snippet.description] = {
//       prefix: snippet.prefix,
//       body: snippet.body,
//       description: snippet.description,
//     };
//   });
//   setConvertedData(JSON.stringify(snippets, null, 2));
// }, []);
