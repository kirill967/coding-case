"use client";

import { useChat } from "@/app/hooks/useChat";
import { ChatMessage } from "@/app/components/chat/ChatMessage";
import { ChatInput } from "@/app/components/chat/ChatInput";

export function Chat() {
  const { messages, send, isLoading } = useChat();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="text-3xl font-bold mb-8 px-8"> </div>
      <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col justify-end pb-0">
        <div className="flex-1 overflow-y-auto w-full max-w-full sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-0 mb-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className="sticky bottom-0 bg-gray-50 z-10 pt-2 pb-4 px-2 sm:px-0">
          <ChatInput onSend={send} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
