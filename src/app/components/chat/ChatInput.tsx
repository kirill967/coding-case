import { useState } from "react";
import { ChatButton } from "@/app/components/ui/chat-button";
import { AddButton } from "@/app/components/ui/add-button";

export function ChatInput({
  onSend,
  isLoading,
}: {
  onSend: (text: string) => void;
  isLoading: boolean;
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 sm:p-4">
      <div className="w-full max-w-full sm:max-w-md md:max-w-3xl lg:max-w-3xl mx-auto">
        <div className="flex items-center gap-2 border border-gray-300 rounded-3xl px-2 py-1 bg-white shadow-sm">
          <AddButton />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 text-base focus:outline-none transition bg-transparent border-none shadow-none"
            aria-label="Message input"
          />
          <ChatButton
            isLoading={isLoading}
            disabled={isLoading || !input.trim()}
          />
        </div>
      </div>
    </form>
  );
}
