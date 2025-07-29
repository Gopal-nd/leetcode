"use client";
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
import { useProblemLanguageStore } from "@/store/useProblemsStore";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { axiosInstance } from "@/lib/axios";

const CodeEditor = ({ problem }: { problem: Problem }) => {
  const [languages, setLanguages] = React.useState<{
    language: string;
    code: number;
  }>({ language: "javascript", code: 63 });
  const [res, setRes] = React.useState();
  const [code, setCode] = React.useState<string>("");
  const { executeCode, isExecuting, submission } =
    useProblemLanguageStore() as {
      executeCode: (
        source_code: string,
        language_id: number,
        stdin: string[],
        expected_outputs: string[],
        problemId: string
      ) => void;
      isExecuting: boolean;
      submission: any;
    };

  function getJudge0LanguageId(language: string) {
    const languageMap: { [key: string]: number } = {
      PYTHON: 71,
      JAVA: 62,
      JAVASCRIPT: 63,
    };
    language = language.toUpperCase();

    return languageMap[language];
  }
  const { lang, setLang } = useProblemLanguageStore() as {
    lang: string;
    setLang: (language: string) => void;
  };

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
    setCode(problem.codeSnippets["JAVASCRIPT"]);
  }, []);

  useEffect(() => {
    setCode(
      problem.codeSnippets[
        languages.language.toUpperCase() as keyof typeof problem.codeSnippets
      ]
    );
  }, [problem, languages.language]);

  const handleLanguageChange = (language: string) => {
    setLanguages({
      language,
      code: getJudge0LanguageId(language),
    });
    setLang(language);
  };

  const handleCodeSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const stdin = problem.testCases.map((testCase) => testCase.input);
      const expected_output = problem.testCases.map(
        (testCase) => testCase.output
      );
      const result = await axiosInstance.post("/execute-code", {
        source_code: code,
        language_id: languages.code,
        stdin: stdin,
        expected_outputs: expected_output,
        problemId: problem.id,
      });

      setRes(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.log("Error executing code", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="h-10 flex justify-between items-center">
        <h1 className="text-2xl p-2 font-bold">{">_ Code Editor"}</h1>
        <div className="h-10 flex items-center justify-between gap-3">
          <Button
            disabled={isExecuting}
            className={"bg-green-600"}
            onClick={handleCodeSubmit}
          >
            {" "}
            {isExecuting ? (
              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
            ) : (
              ""
            )}{" "}
            Run
          </Button>

          <Button disabled={isExecuting} className={"bg-red-600"}>
            {" "}
            {isExecuting ? (
              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
            ) : (
              ""
            )}{" "}
            Submit
          </Button>
        </div>
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
      <div>
        <div className="h-[70vh] flex-col-reverse">
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
    </div>
  );
};

export default CodeEditor;
