import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const response = await fetch(`${BACKEND_URL}/transcribe`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: (err as any)?.detail ?? `Backend error ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json({ transcript: data.transcript ?? "" });
  } catch {
    return NextResponse.json(
      {
        error:
          "Backend not reachable. Make sure the Python server is running on port 8000.",
      },
      { status: 503 },
    );
  }
}
