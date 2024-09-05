import { Editor } from "@monaco-editor/react";
import React from "react";

const InputEditor = ({
  setInputData,
  inputData,
}: {
  setInputData: React.Dispatch<
    React.SetStateAction<{
      input: string;
      error: string;
      isValid: boolean;
    }>
  >;
  inputData: {
    input: string;
    error: string;
    isValid: boolean;
  };
}) => {
  return (
    <div className="border-r flex flex-col">
      <div className="menu-bar border-b p-1 ">
        <h3 className="text-muted-foreground">Input</h3>
        <div className="controls"></div>
      </div>
      <div>
        {inputData.isValid ? (
          <p className="text-xs text-green-600 ">Json is valid</p>
        ) : (
          <p className="text-xs text-red-600 ">Json is invalid</p>
        )}
      </div>

      <Editor
        className="w-full"
        defaultLanguage="json"
        onChange={(value) =>
          setInputData({
            ...inputData,
            input: value ?? "",
          })
        }
        value={inputData.input}
      />
    </div>
  );
};

export default InputEditor;
