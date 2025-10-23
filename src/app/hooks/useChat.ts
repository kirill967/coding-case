"use client";

import { useState, useCallback, useMemo } from "react";
import { createChatService } from "@/services/ai-service";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function useChat(params?: { onError?: (message: string) => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setLoading] = useState(false);

  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const reset = useCallback(() => {
    setMessages([]);
  }, []);

  const streamIntoMessage = useCallback(
    async (res: Response) => {
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;
      let buffer = "";
      let assistantMsg: ChatMessage = { role: "assistant", content: "" };
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const delta = line.slice(6);
              if (delta) {
                assistantMsg.content += delta;
                setMessages((prev) => {
                  if (
                    prev.length > 0 &&
                    prev[prev.length - 1].role === "assistant"
                  ) {
                    return [
                      ...prev.slice(0, prev.length - 1),
                      { ...assistantMsg },
                    ];
                  } else {
                    return [...prev, { ...assistantMsg }];
                  }
                });
              }
            }
          }
        }
        if (buffer && buffer.startsWith("data: ")) {
          const delta = buffer.slice(6);
          if (delta) {
            assistantMsg.content += delta;
            setMessages((prev) => {
              if (
                prev.length > 0 &&
                prev[prev.length - 1].role === "assistant"
              ) {
                return [...prev.slice(0, prev.length - 1), { ...assistantMsg }];
              } else {
                return [...prev, { ...assistantMsg }];
              }
            });
          }
        }
      } catch (e) {
        params?.onError?.("Streaming error");
      }
    },
    [params]
  );

  const chatService = useMemo(() => createChatService(), []);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      setLoading(true);
      const userMsg: ChatMessage = { role: "user", content: text };
      addMessage(userMsg);
      try {
        const res = await chatService.generateStream([...messages, userMsg]);
        await streamIntoMessage(res);
      } catch (e) {
        params?.onError?.("Failed to send message");
      } finally {
        setLoading(false);
      }
    },
    [messages, addMessage, streamIntoMessage, params, chatService]
  );

  return useMemo(
    () => ({
      isLoading,
      messages,
      send,
      reset,
    }),
    [isLoading, messages, send, reset]
  );
}
