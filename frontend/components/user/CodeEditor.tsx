import React, { useEffect, useMemo, useState } from "react";
import { Editor } from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Problem } from "@/types/Problem";

const CodeEditor = ({ problem }: { problem: Problem }) => {
  const [languages, setLanguages] = React.useState<{
    language: string;
    code: number;
  }>({ language: "javascript", code: 63 });
  const [code, setCode] = React.useState<string>("");

  function getJudge0LanguageId(language: string) {
    const languageMap: { [key: string]: number } = {
      PYTHON: 71,
      JAVA: 62,
      JAVASCRIPT: 63,
    };
    language = language.toUpperCase();

    return languageMap[language];
  }

  const languagesList = [
    {
      language: "javascript",
      code: 63,
    },
    {
      language: "java",
      code: 62,
    },
    {
      language: "python",
      code: 71,
    },
  ];

  useEffect(() => {
    setCode(problem.codeSnippets['JAVASCRIPT']);
  }, []);

useEffect(() => {
    setCode(problem.codeSnippets[languages.language.toUpperCase() as keyof typeof problem.codeSnippets]);
}, [problem, languages.language]);

  const handleLanguageChange = (language: string) => {
    setLanguages({
      language,
      code: getJudge0LanguageId(language),
    });
  };

  return (
    <div className="flex flex-col">
      <div className="h-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{">_ Code Editor"}</h1>
        <div>
          <Select
            onValueChange={handleLanguageChange}
            value={languages.language}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {languagesList.map(({ language, code }) => (
                  <SelectItem key={code} value={language}>
                    <SelectLabel>{language}</SelectLabel>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="h-[70vh]">
        <Editor
          className="mt-1 rounded border border-b-0 h-full"
          height="100%"
          language={languages.language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          defaultLanguage="javascript"
          defaultValue={code}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            mouseWheelScrollSensitivity: 1,
            wordWrap: "on",
            scrollbar: {
              alwaysConsumeMouseWheel: false,
              handleMouseWheel: true,
            },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
