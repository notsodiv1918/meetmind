"use client";

import { useState } from "react";
import { callClaude, buildMOMPrompt, transcribeAudio } from "@/lib/claude";
import { parseMOMResponse } from "@/lib/parseMOM";
import { saveMeeting } from "@/lib/history";
import type { MOMOption, MOMResult, ImageFile } from "@/types";

type Status = "idle" | "transcribing" | "generating" | "done" | "error";

interface GenerateParams {
  tab: "audio" | "images" | "text";
  transcript: string;
  audioFiles: File[];
  imageFiles: ImageFile[];
  options: MOMOption[];
}

export function useMOM() {
  const [status, setStatus] = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [result, setResult] = useState<MOMResult | null>(null);
  const [error, setError] = useState("");

  async function generate(params: GenerateParams) {
    const { tab, transcript, audioFiles, imageFiles, options } = params;

    setError("");
    setResult(null);
    setStatus("generating");
    setStatusMsg("Analyzing meeting content...");

    let rawTranscript = transcript;

    try {
      let content: object[] = [];

      if (tab === "text") {
        if (!transcript.trim())
          throw new Error("Please paste a transcript in the Text tab.");
        content = [{ type: "text", text: buildMOMPrompt(transcript, options) }];
      } else if (tab === "images") {
        const imgs = imageFiles.filter(
          (f) => f.b64 && f.type.startsWith("image/"),
        );
        if (!imgs.length)
          throw new Error(
            "No supported image files. Add PNG, JPG, or WEBP files.",
          );
        content = [
          ...imgs.map((img) => ({
            type: "image",
            source: { type: "base64", media_type: img.type, data: img.b64 },
          })),
          {
            type: "text",
            text: buildMOMPrompt("(see attached meeting screenshots)", options),
          },
        ];
        rawTranscript = "";
      } else if (tab === "audio") {
        if (!audioFiles.length) throw new Error("No audio files added.");
        setStatus("transcribing");
        setStatusMsg("Transcribing audio...");
        rawTranscript = await transcribeAudio(audioFiles[0]);
        content = [
          { type: "text", text: buildMOMPrompt(rawTranscript, options) },
        ];
      }

      setStatus("generating");
      setStatusMsg("Generating MOM with AI...");
      const rawText = await callClaude(content);
      const parsed = parseMOMResponse(rawText, rawTranscript);

      saveMeeting(parsed, options);

      setResult(parsed);
      setStatus("done");
      setStatusMsg("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
      setStatusMsg("");
    }
  }

  const isLoading = status === "transcribing" || status === "generating";
  return { generate, result, status, statusMsg, isLoading, error };
}
