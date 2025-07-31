'use client'
import React, { useRef, useEffect, useState } from 'react'
import *  as Y from 'yjs'
import { MonacoBinding } from 'y-monaco'
import { Awareness } from 'y-protocols/awareness'
import Editor, { OnMount } from '@monaco-editor/react'
import { io, Socket } from 'socket.io-client'
import { Users, Wifi, WifiOff, Copy } from 'lucide-react'

const SOCKET_URL = 'http://localhost:8000'
import dynamic from 'next/dynamic'

// Get room from URL or use default
const getRoomName = () => {
  
  return 'default-room'
}

export default function CollaborativeEditor() {
  const [connectionStatus, setConnectionStatus] = useState('connecting')
  const [userCount, setUserCount] = useState(1)
  const [roomName] = useState() // get the username
  
  // Refs for Yjs and Socket
  const ydocRef = useRef<Y.Doc | null>(null)
  const awarenessRef = useRef<any>(null)
  const socketRef = useRef<any>(null)
  const bindingRef = useRef<MonacoBinding | null>(null)
  const editorRef = useRef<any>(null)

  const onMount = (editor : any) => {
    console.log('📝 Editor mounted')
    editorRef.current = editor

    // 1. Create Yjs document and awareness
    const ydoc = new Y.Doc()
    const awareness = new Awareness(ydoc)
    const ytext = ydoc.getText('monaco')
    
    ydocRef.current = ydoc
    awarenessRef.current = awareness

    // 2. Connect to socket
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      forceNew: true
    })
    socketRef.current = socket

    // 3. Socket event handlers
    socket.on('connect', () => {
      console.log('✅ Connected:', socket.id)
      setConnectionStatus('connected')
      socket.emit('join-room', roomName)
    })

    socket.on('disconnect', () => {
      console.log('❌ Disconnected')
      setConnectionStatus('disconnected')
    })

    socket.on('init-document', (state) => {
      console.log('📄 Received initial document')
      if (state && state.length > 0) {
        Y.applyUpdate(ydoc, new Uint8Array(state))
      }
      
      // Create binding AFTER applying initial state
      const model = editor.getModel()
      if (model) {
        bindingRef.current = new MonacoBinding(
          ytext,
          model,
          new Set([editor]),
          awareness
        )
        console.log('🔗 Monaco binding created')
      }
    })

    socket.on('document-update', (update) => {
      console.log('📥 Received update from server')
      if (update && update.length > 0) {
        Y.applyUpdate(ydoc, new Uint8Array(update))
      }
    })

    socket.on('user-count', (count) => {
      setUserCount(count)
    })

    // 4. Send local changes to server
    ydoc.on('update', (update) => {
      console.log('📤 Sending update to server')
      socket.emit('document-update', update)
    })

    // Set user info
    awareness.setLocalStateField('user', {
      name: `User${Math.floor(Math.random() * 1000)}`,
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    })
  }

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?room=${roomName}`
    navigator.clipboard.writeText(shareUrl)
    alert('Share link copied to clipboard!')
  }

  // Cleanup
  useEffect(() => {
    return () => {
      console.log('🧹 Cleaning up...')
      bindingRef.current?.destroy() 
      awarenessRef.current?.destroy()
      socketRef.current?.disconnect()
      ydocRef.current?.destroy()
    }
  }, [])

  return (
    <div className="h-screen w-full flex flex-col bg-gray-900">
      {/* Simple Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <h1 className="text-white font-semibold">Collaborative Editor</h1>
          <div className="flex items-center space-x-2 text-sm">
            {connectionStatus === 'connected' ? (
              <Wifi className="text-green-500" size={16} />
            ) : (
              <WifiOff className="text-red-500" size={16} />
            )}
            <span className="text-gray-300">Room: {roomName}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-300">
            <Users size={16} />
            <span>{userCount} online</span>
          </div>
          <button
            onClick={copyShareLink}
            className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
          >
            <Copy size={14} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// Welcome to the collaborative editor!\n// Share the link above to collaborate in real-time\n\nfunction hello() {\n  console.log('Hello, world!');\n}\n\nhello();"
          theme="vs-dark"
          onMount={onMount}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            wordWrap: 'on'
            
          }}
        />
      </div>
    </div>
  )
}