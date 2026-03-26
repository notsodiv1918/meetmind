import { NextRequest, NextResponse } from "next/server";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile"; // fast + smart, good for summarization
const MAX_TOKENS = 2500;

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not set in .env.local" },
        { status: 500 },
      );
    }

    // Groq uses OpenAI format — extract text from content array
    const userText = content
      .filter((c: any) => c.type === "text")
      .map((c: any) => c.text)
      .join("\n");

    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        messages: [{ role: "user", content: userText }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error:
            (err as any)?.error?.message ?? `Groq API error ${response.status}`,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ text });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Internal server error" },
      { status: 500 },
    );
  }
}
