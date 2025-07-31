"use client";
import React, { useEffect, useState } from "react";
import { Problem } from "@/types/Problem";
import { GoogleGenAI } from "@google/genai";
import { useSession } from "@/lib/auth-client";
import { useProblemLanguageStore } from "@/store/useProblemsStore";
import { ChatInput } from "./user/editor/ChatInput";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

const Gemini = ({ problem }: { problem: Problem }) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });

  const { data: session, isPending } = useSession();
  const { lang } = useProblemLanguageStore();

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [storageKey, setStorageKey] = useState<string | null>(null);
  const scrollTargetRef = React.useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (session?.user?.email) {
      setStorageKey(`gemini-chat-${problem.id}-${session.user.email}`);
    }
  }, [session?.user?.email, problem.id]);


  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed: ChatMessage[] = JSON.parse(saved);
          setChatHistory(parsed);
        } catch (err) {
          console.error("Failed to parse stored chat:", err);
        }
      }
    }
  }, [storageKey]);


  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(chatHistory));
    }
  }, [chatHistory, storageKey]);

  const handleSend = async (message: string) => {
    if (!storageKey) return;

    setLoading(true);

    const newUserMsg: ChatMessage = { role: "user", content: message };
    const newHistory = [...chatHistory, newUserMsg];
    setChatHistory(newHistory);

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: newHistory.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
      config: {
        maxOutputTokens: 1000,
        systemInstruction: `You are a coding assistant helping users with interview preparation. Problem context: ${JSON.stringify(
          problem
        )}. Language: ${lang}. User: ${session?.user?.name}. Provide output in Markdown format.`,
      },
    });

    const response = await chat.sendMessage({ message });

    const modelMsg: ChatMessage = {
      role: "model",
      content: response.text || "No response.",
    };

    setChatHistory((prev) => [...prev, modelMsg]);
    scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" });
    setLoading(false);
  };

  if (isPending || !session) return <div>Loading session...</div>;

  return (
    <div className="p-4 border rounded-lg w-full h-full mx-auto">
      <div className="min-h-[75vh] max-h-[70vh] overflow-y-auto mb-4 px-2 space-y-4">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`p-3 border-t-blue-400 rounded-lg whitespace-pre-wrap ${
              msg.role === "user"
                ? "text-right "
                : "text-left "
            }`}
            ref={scrollTargetRef}
          >
            <Markdown
            
              children={msg.content}
              components={{
                code({ children, className, ...rest }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      PreTag="div"
                      language={match[1]}
                      style={dracula}
                      customStyle={{
                        borderRadius: "0.5rem",
                        fontSize: "0.9rem",
                        margin: "0.5rem 0",
                        width: "100%",
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="px-1 py-0.5 border rounded" {...rest}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </div>
        ))}
        {loading && (
          <div className="flex justify-start items-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 "></div>
            <span className="ml-2 text-sm tsxt-start">Thinking...</span>
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default Gemini;
