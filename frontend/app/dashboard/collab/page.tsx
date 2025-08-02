'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as Y from 'yjs'
import { MonacoBinding } from 'y-monaco'
import { Awareness } from 'y-protocols/awareness'
import Editor from '@monaco-editor/react'
import { io, Socket } from 'socket.io-client'
import { Users, Wifi, WifiOff, Copy, Info, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { executeCode } from '@/lib/api'
import TooltipHelper from '@/components/ToolTip'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

const SOCKET_URL = 'http://localhost:8000'

// Util to get room name from URL (can be enhanced later)
const getRoomName = () => {
  return 'default-room'
}

export default function CollaborativeEditor() {
  const [connectionStatus, setConnectionStatus] = useState('connecting')
  const [userCount, setUserCount] = useState(1)
  const [roomName] = useState(getRoomName)
  const [code , setCode] = useState('')
  const [stdin, setStdin] = useState("");
  


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
  // navigator.clipboard.writeText(window.location.href).then(() => {
  //   toast.success('Share link copied to clipboard')
  // })
}

  useEffect(() => {
    return () => {
      bindingRef.current?.destroy()
      awarenessRef.current?.destroy()
      socketRef.current?.disconnect()
      ydocRef.current?.destroy()
    }
  }, [])

  const {
    mutate: runCode,
    data: output,
    isPending,
    isError,
    error,
  } = useMutation<any>({
    mutationFn: async () => {
      const sourcecode = editorRef.current.getValue();
      const res = await executeCode( 'javascript', sourcecode, stdin);
      return res.run;
    },
    onSuccess: (data) => {
      const signals = data?.signal;
      console.log("signals", signals);
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
              defaultValue={`// Welcome to the collaborative editor!\n\n function hello() {\n  console.log("Hello World")\n}\nhello();`}
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
  )
}
