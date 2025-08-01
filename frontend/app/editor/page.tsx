'use client'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import Editor from '@monaco-editor/react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { defaultSnippets } from '@/constants/page'
import { ModeToggle } from '@/components/ModeToggle'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

export default function CollaborativeCodeEditor() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [selectedTheme, setSelectedTheme] = useState('vs-dark')
  const [code, setCode] = useState(() =>
    defaultSnippets.find(s => s.name === 'javascript')?.code || ''
  )

  const editorRef = useRef<any>(null)

  const themes = ['vs-dark', 'vs-light', 'hc-black']

  const changeLanguage = useCallback((language: string) => {
    setSelectedLanguage(language)
    const snippet = defaultSnippets.find(s => s.name === language)
    setCode(snippet?.code || '')
    if (editorRef.current) {
      const model = editorRef.current.getModel()
      if (model) {
        editorRef.current.setValue(snippet?.code || '')
      }
    }
  }, [])

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <div className="border-b px-4 py-3 flex justify-between">
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
                  {defaultSnippets.map(language => (
                    <SelectItem key={language.name} value={language.name}>
                      {language.name.charAt(0).toUpperCase() + language.name.slice(1)}
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
                  {themes.map(theme => (
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
          <ModeToggle />
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-[calc(100vh-3.5rem)]"
        >
          <ResizablePanel minSize={25} defaultSize={60} className=''>
                <Editor
          height="100%"
          language={selectedLanguage}
          theme={selectedTheme}
          value={code}
          onMount={(editor, monaco) => {
            editorRef.current = editor
          }}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
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
                <div className="p-4 h-full text-sm">Output panel</div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25}>
                <div className="p-4 h-full  text-sm">Input panel</div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
  
      </div>
    </div>
  )
}
