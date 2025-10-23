import type { ChatMessage } from "@/app/types/chat";

export function ChatMessage({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className="my-1 sm:my-2">
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`group py-2 sm:py-1.5 px-3 rounded-2xl text-sm sm:text-base ${
            isUser
              ? "bg-gray-100 text-gray-950"
              : "bg-transparent text-chat-text-primary pl-2"
          }`}
          style={{
            maxWidth: "90%",
            minWidth: "0",
          }}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    </div>
  );
}
