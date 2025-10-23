import { OpenAI } from "openai";
import type { ChatMessage } from "@/app/types/chat";
import { validateApiKey } from "@/app/utils/validation";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStream(
  messages: ChatMessage[],
  model = "gpt-3.5-turbo"
) {
  try {
    const apiKeyValidation = validateApiKey(process.env.OPENAI_API_KEY);
    if (!apiKeyValidation.isValid) {
      throw new Error(apiKeyValidation.error || "API key validation failed");
    }

    const response = await openai.chat.completions.create({
      model,
      messages,
      stream: true,
    });

    return response;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}
