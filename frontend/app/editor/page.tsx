"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Editor from "@monaco-editor/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defaultSnippets } from "@/constants/page";
import { ModeToggle } from "@/components/ModeToggle";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { executeCode } from "@/lib/api";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Info, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import TooltipHelper from "@/components/ToolTip";

export default function CollaborativeCodeEditor() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [stdin, setStdin] = useState("");
  const [code, setCode] = useState(
    () => defaultSnippets.find((s) => s.name === "javascript")?.code || ""
  );
  const editorRef = useRef<any>(null);

  const themes = ["vs-dark", "vs-light", "hc-black"];

  const {
    mutate: runCode,
    data: output,
    isPending,
    isError,
    error,
  } = useMutation<any>({
    mutationFn: async () => {
      const sourcecode = editorRef.current.getValue();
      const res = await executeCode(selectedLanguage as any, sourcecode, stdin);
      return res.run;
    },
    onSuccess: (data) => {
      const signals = data?.signal;

      signals
        ? toast("Request timeout or resource exhaustion", {
            style: {
              border: "1px solid red",
              padding: "16px",
              color: "red",
            },
          })
        : toast.success("Code executed successfully");
    },
    onError: () => {
      toast.error("Error executing code");
    },
  });

  const stdout = output?.stdout.split("\n");
  const stderr = output?.stderr;
  const signals = output?.signals;



  const changeLanguage = useCallback((language: string) => {
    setSelectedLanguage(language);
    const snippet = defaultSnippets.find((s) => s.name === language);
    setCode(snippet?.code || "");
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        editorRef.current.setValue(snippet?.code || "");
      }
    }
  }, []);

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <div className="border-b px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-sm">Language:</label>
            <Select
              onValueChange={changeLanguage}
              defaultValue="javascript"
              value={selectedLanguage}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  {defaultSnippets.map((language) => (
                    <SelectItem key={language.name} value={language.name}>
                      {language.name.charAt(0).toUpperCase() +
                        language.name.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Theme Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-sm">Theme:</label>
            <Select
              onValueChange={setSelectedTheme}
              defaultValue="vs-dark"
              value={selectedTheme}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Themes</SelectLabel>
                  {themes.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Button disabled={isPending} onClick={() => runCode()}>
            {isPending && (
              <p>
                <Loader2 className="h-4 w-4 animate-spin " />
              </p>
            )}
            Run Code
          </Button>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-[calc(100vh-3.5rem)]"
        >
          <ResizablePanel minSize={25} defaultSize={60} className="">
            <Editor
              height="100%"
              language={selectedLanguage}
              theme={selectedTheme}
              value={code}
              onMount={(editor) => {
                editorRef.current = editor;
                editor.focus();
              }}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                wordWrap: "on",
                bracketPairColorization: { enabled: true },
                guides: {
                  bracketPairs: true,
                  indentation: true,
                },
              }}
            />
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={75}>
                <div className="w-full p-2">
                  <h1 className="text-2xl font-bold mb-4 border-b text-center p-1">
                    Output
                  </h1>

                  {stderr ? (
                    <div className="bg-black text-red-400 p-3 rounded font-mono text-sm whitespace-pre-wrap">
                      <strong>Error:</strong>
                      <pre>{stderr}</pre>
                    </div>
                  ) : stdout && stdout.join("").trim() !== "" ? (
                    <div className="bg-black text-green-400 p-3 rounded font-mono text-sm whitespace-pre-wrap">
                      <pre>{stdout.join("\n")}</pre>
                    </div>
                  ) : (
                    <p className="text-green-300">
                      // Click "Run Code" to see the output here
                    </p>
                  )}

                  {isError && (
                    <div className="text-red-500 text-xs mt-2 font-mono">
                      {JSON.stringify(error)}
                    </div>
                  )}
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25}>
                <div className="p-4 h-full">
                  <h2 className="text-xl font-semibold mb-2 flex items-center justify-start gap-2">
                      Input
                    <TooltipHelper message="Give the inputs Before running the code">
                      
                       <Info />

                    </TooltipHelper>
                  </h2>
                  <Textarea
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    placeholder="Type input here like terminal..."
                    className="w-full h-full p-2 text-sm font-mono  rounded resize-none"
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
