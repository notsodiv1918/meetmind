import { NextRequest, NextResponse } from "next/server";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";
const MAX_TOKENS = 2500;

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not set in environment variables" },
        { status: 500 },
      );
    }

    const userText = (content as { type: string; text?: string }[])
      .filter((c) => c.type === "text")
      .map((c) => c.text ?? "")
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
            (err as { error?: { message?: string } })?.error?.message ??
            `Groq API error ${response.status}`,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ text });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
