import { NextRequest, NextResponse } from "next/server";
import { generateStream } from "@/app/actions/openai";
import type { ChatMessage } from "@/app/types/chat";

export async function POST(req: NextRequest) {
  let messages: ChatMessage[];
  let model: string | undefined;
  try {
    ({ messages, model } = await req.json());
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "'messages' must be an array" },
        { status: 400 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  try {
    const stream = await generateStream(messages, model);
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(encoder.encode(`data: ${text}\n\n`));
          }
        }
        controller.close();
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from OpenAI" },
      { status: 500 }
    );
  }
}
