import { Editor } from "@monaco-editor/react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { ClipboardCheck, Copy } from "lucide-react";
import React, { useEffect, useState } from "react";

const OutputEditor = ({
  outputData,
  setOutputData,
}: {
  outputData: string;
  setOutputData: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(outputData);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);
  return (
    <div className=" flex flex-col">
      <div className="menu-bar border-b p-1  flex justify-between">
        <h3 className="text-muted-foreground">Output</h3>
        <div className="controls">
          <button
            className="text-sm text-muted-foreground"
            onClick={handleCopy}
          >
            {isCopied ? <ClipboardCheck size={13} /> : <Copy size={13} />}
          </button>
        </div>
      </div>
      <Editor
        className="w-full"
        defaultLanguage="json"
        value={outputData}
        onChange={(value) => {
          setOutputData(value ?? "");
        }}
      />
    </div>
  );
};

export default OutputEditor;
