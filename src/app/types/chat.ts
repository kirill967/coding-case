export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatService = {
  generateStream: (
    messages: ChatMessage[],
    model?: string
  ) => Promise<Response>;
};
