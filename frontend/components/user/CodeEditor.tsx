"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { Problem, TestCaseResult } from "@/types/Problem";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useOutputResponse } from "@/store/useOutputResponse";
import { useProblemLanguageStore } from "@/store/useProblemsStore";

const CodeEditor = ({ problem }: { problem: Problem }) => {
  const [languages, setLanguages] = useState<{
    language: string;
    code: number;
  }>({ language: "javascript", code: 63 });

  const {
    testcases,
    status,
    setTestCases,
    setStatus,
    scrollTargetRef,
    setScrollTargetRef,
  } = useOutputResponse();

   const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  useEffect(() => {
    setScrollTargetRef(ref);
  }, []);


  const [res, setRes] = React.useState();
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
  const { lang, setLang } = useProblemLanguageStore();

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

  const { mutate: SubmitCode, isPending: isSubmitting } = useMutation({
    mutationFn: async () => {
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
      return result.data;
    },

    onSuccess: (data) => {
      // Invalidate and refetch
      setRes(data.data);
      setTestCases([]);
      setStatus("");
      setTestCases(data.data.testCases);
      setStatus(data.data.status);

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });

      toast.success(data.message || "Code submitted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Error submitting code");
    },
  });

  const { mutate: Runcode, isPending: isRunning } = useMutation({
    mutationFn: async () => {
      const stdin = problem.testCases.map((testCase) => testCase.input);
      const expected_output = problem.testCases.map(
        (testCase) => testCase.output
      );
      const result = await axiosInstance.post("/execute-code/run", {
        source_code: code,
        language_id: languages.code,
        stdin: stdin,
        expected_outputs: expected_output,
        problemId: problem.id,
      });
      return result.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      setRes(data.data);
      setTestCases([]);
      setStatus("");
      setTestCases(data.data.testCases);
      setStatus(data.data.status);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
      toast.success(data.message || "Code submitted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Error submitting code");
    },
  });
  if (res) {
    console.log(res);
  }

  return (
    <div className="flex flex-col">
      <div className="h-10 flex justify-between items-center">
        <h1 className="text-2xl p-2 font-bold">{">_ Code Editor"}</h1>
        <div className="h-10 flex items-center justify-between gap-3">
          <Button
            disabled={isRunning}
            className={"bg-green-600"}
            onClick={() => Runcode()}
          >
            {" "}
            {isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
            ) : (
              ""
            )}{" "}
            Run
          </Button>

          <Button
            disabled={isSubmitting}
            onClick={() => SubmitCode()}
            className={"bg-red-600"}
          >
            {" "}
            {isSubmitting ? (
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
