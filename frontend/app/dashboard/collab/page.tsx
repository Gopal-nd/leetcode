'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as Y from 'yjs'
import { MonacoBinding } from 'y-monaco'
import { Awareness } from 'y-protocols/awareness'
import Editor from '@monaco-editor/react'
import { io, Socket } from 'socket.io-client'
import { Users, Wifi, WifiOff, Copy } from 'lucide-react'
import dynamic from 'next/dynamic'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'

const SOCKET_URL = 'http://localhost:8000'

// Util to get room name from URL (can be enhanced later)
const getRoomName = () => {
  return 'default-room'
}

export default function CollaborativeEditor() {
  const [connectionStatus, setConnectionStatus] = useState('connecting')
  const [userCount, setUserCount] = useState(1)
  const [roomName] = useState(getRoomName)

  // Refs
  const ydocRef = useRef<Y.Doc | null>(null)
  const awarenessRef = useRef<Awareness | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const bindingRef = useRef<MonacoBinding | null>(null)
  const editorRef = useRef<any>(null)

  const onMount = (editor: any) => {
    editorRef.current = editor

    const ydoc = new Y.Doc()
    const ytext = ydoc.getText('monaco')
    const awareness = new Awareness(ydoc)

    ydocRef.current = ydoc
    awarenessRef.current = awareness

    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      forceNew: true,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setConnectionStatus('connected')
      socket.emit('join-room', roomName)
    })

    socket.on('disconnect', () => {
      setConnectionStatus('disconnected')
    })

    socket.on('init-document', (state) => {
      if (state?.length) {
        Y.applyUpdate(ydoc, new Uint8Array(state))
      }

      const model = editor.getModel()
      if (model) {
        bindingRef.current = new MonacoBinding(
          ytext,
          model,
          new Set([editor]),
          awareness
        )
      }
    })

    socket.on('document-update', (update) => {
      if (update?.length) {
        Y.applyUpdate(ydoc, new Uint8Array(update))
      }
    })

    socket.on('user-count', (count) => {
      setUserCount(count)
    })

    ydoc.on('update', (update) => {
      socket.emit('document-update', update)
    })

    awareness.setLocalStateField('user', {
      name: `User${Math.floor(Math.random() * 1000)}`,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    })
  }

  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}${window.location.pathname}?room=${roomName}`
      navigator.clipboard.writeText(shareUrl)
      alert('Share link copied to clipboard!')
    }
  }

  useEffect(() => {
    return () => {
      bindingRef.current?.destroy()
      awarenessRef.current?.destroy()
      socketRef.current?.disconnect()
      ydocRef.current?.destroy()
    }
  }, [])

  return (
    <div className="h-screen w-full flex flex-col bg-background text-foreground">
      {/* Header */}
      <div className="bg-muted px-4 py-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Collaborative Editor</h1>
          <div className="flex items-center gap-2 text-sm">
            {connectionStatus === 'connected' ? (
              <Wifi className="text-green-500" size={16} />
            ) : (
              <WifiOff className="text-red-500" size={16} />
            )}
            <span className="text-muted-foreground">Room: {roomName}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users size={16} />
            <span>{userCount} online</span>
          </div>
          <Button
            onClick={copyShareLink}
            className="flex items-center gap-2 px-3 py-1.5  rounded text-sm"
          >
            <Copy size={14} />
            <span>Share</span>
          </Button>
        </div>
      </div>

      {/* Main Editor UI */}
      <div className="flex-1">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-[calc(100vh-3.5rem)]"
        >
          <ResizablePanel minSize={25} defaultSize={60} className=''>
            <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue={`// Welcome to the collaborative editor!\nfunction hello() {\n  console.log("Hello World")\n}\nhello();`}
              theme="vs-dark"
              onMount={onMount}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
                wordWrap: 'on',
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
