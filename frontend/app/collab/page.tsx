'use client'

import React, { useRef, useEffect } from 'react'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { MonacoBinding } from 'y-monaco'
import Editor, { OnMount } from '@monaco-editor/react'

const MonacoYjsEditor: React.FC = () => {
  // Refs to hold Yjs and binding instances for cleanup
  const ydocRef = useRef<Y.Doc | null>(null)
  const providerRef = useRef<WebrtcProvider | null>(null)
  const bindingRef = useRef<MonacoBinding | null>(null)

  // Monaco onMount callback
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Initialize Yjs document
    const ydoc = new Y.Doc()
    ydocRef.current = ydoc

    // Set up WebRTC provider (peer-to-peer)
    const provider = new WebrtcProvider('monaco-demo-room', ydoc)
    providerRef.current = provider

    // Shared text type
    const ytext = ydoc.getText('monaco')

    // Bind Monaco model to Yjs text
    const model = editor.getModel()
    if (model) {
      bindingRef.current = new MonacoBinding(
        ytext,
        model,
        new Set([editor]),
        provider.awareness
      )
    }

    // Optional: focus/cursor styling from awareness
    provider.awareness.setLocalStateField('user', {
      name: `User${Math.floor(Math.random() * 100)}`
    })
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      bindingRef.current?.destroy()
      providerRef.current?.destroy()
      ydocRef.current?.destroy()
    }
  }, [])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Editor
        height="70%"
        defaultLanguage="javascript"
        defaultValue="// Start collaborating..."
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{ minimap: { enabled: false } }}
      />
    </div>
  )
}

export default MonacoYjsEditor
