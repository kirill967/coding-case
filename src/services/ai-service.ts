import type { ChatMessage, ChatService } from "../app/types/chat";

export function createChatService(options?: {
  baseUrl?: string;
  fetchImpl?: typeof fetch;
}): ChatService {
  const baseUrl = options?.baseUrl ?? "/api/chat";
  const fetchImpl = options?.fetchImpl ?? fetch;

  async function generateStream(messages: ChatMessage[], model?: string) {
    if (!messages || messages.length === 0) {
      throw new Error("No messages to send");
    }

    let res: Response;
    try {
      res = await fetchImpl(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, model }),
      });
    } catch (err) {
      throw new Error(
        "Network error. Please check your connection and try again."
      );
    }

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    return res;
  }

  return { generateStream };
}
