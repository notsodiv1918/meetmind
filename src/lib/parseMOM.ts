import type { MOMResult, SentimentResult, UnansweredQuestion } from "@/types";

function extractSection(text: string, header: string): string {
  const re = new RegExp(
    `\\*\\*${header}\\*\\*:?\\s*([\\s\\S]*?)(?=\\*\\*[A-Z]|$)`,
    "i",
  );
  const match = text.match(re);
  return match ? match[1].trim() : "";
}

function parseBullets(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 2 && /^[•\-\*\d\.]/.test(l))
    .map((l) => l.replace(/^[•\-\*\d\.]+\s*/, "").trim())
    .filter(Boolean);
}

function parseTimestamps(raw: string): { time: string; text: string }[] {
  return raw
    .split("\n")
    .filter((l) => l.trim().length > 3)
    .map((line) => {
      const m = line.match(/\[?(\d{2}:\d{2}(?::\d{2})?)\]?\s*(.*)/);
      if (m) return { time: m[1], text: m[2].trim() };
      return { time: "—", text: line.replace(/^[•\-]+\s*/, "").trim() };
    })
    .filter((t) => t.text.length > 0);
}

// Speaker detection — parses "• [Name]: contribution"
function parseSpeakers(raw: string): { name: string; lines: string[] }[] {
  const lines = raw.split("\n").filter((l) => l.trim().startsWith("•"));
  const speakers: { name: string; lines: string[] }[] = [];

  lines.forEach((line) => {
    const m = line.match(/•\s*\[?([^\]:]+)\]?:\s*(.+)/);
    if (m) {
      const name = m[1].trim();
      const contribution = m[2].trim();
      const existing = speakers.find((s) => s.name === name);
      if (existing) existing.lines.push(contribution);
      else speakers.push({ name, lines: [contribution] });
    }
  });

  return speakers;
}

// Sentiment parsing — "Score: 72/100 | Label: Productive | Tags: tag1, tag2"
function parseSentiment(raw: string): SentimentResult | null {
  if (!raw || raw.toLowerCase().includes("none")) return null;

  const scoreMatch = raw.match(/Score:\s*(\d+)/i);
  const labelMatch = raw.match(/Label:\s*([^\|]+)/i);
  const tagsMatch = raw.match(/Tags:\s*(.+)/i);

  if (!scoreMatch) return null;

  const tags = tagsMatch
    ? tagsMatch[1]
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return {
    score: parseInt(scoreMatch[1]),
    label: labelMatch ? labelMatch[1].trim() : "Neutral",
    tags,
  };
}

// Unanswered questions parser
function parseQuestions(raw: string): UnansweredQuestion[] {
  if (!raw || raw.toLowerCase().includes("none identified")) return [];

  return raw
    .split("\n")
    .filter((l) => l.trim().startsWith("•") && l.includes("?"))
    .map((line) => {
      const clean = line.replace(/^•\s*/, "").trim();
      const askedMatch = clean.match(/\(asked by ([^)]+)\)/i);
      const question = clean.replace(/\(asked by [^)]+\)/i, "").trim();
      return {
        question,
        askedBy: askedMatch ? askedMatch[1].trim() : undefined,
      };
    })
    .filter((q) => q.question.length > 3);
}

// Detect languages mentioned in transcript
function detectLanguages(transcript: string): string[] {
  const langs: string[] = [];
  const patterns = [
    { lang: "Hindi", re: /[\u0900-\u097F]/ },
    { lang: "Tamil", re: /[\u0B80-\u0BFF]/ },
    { lang: "Telugu", re: /[\u0C00-\u0C7F]/ },
    { lang: "Kannada", re: /[\u0C80-\u0CFF]/ },
    { lang: "Bengali", re: /[\u0980-\u09FF]/ },
  ];
  patterns.forEach(({ lang, re }) => {
    if (re.test(transcript)) langs.push(lang);
  });
  if (langs.length > 0 || /[a-zA-Z]/.test(transcript)) langs.unshift("English");
  return langs.filter((l, i) => langs.indexOf(l) === i);
}

export function parseMOMResponse(
  rawText: string,
  transcript?: string,
): MOMResult {
  const attendeesRaw = extractSection(rawText, "ATTENDEES");
  const attendees = attendeesRaw
    .split(/[,\n]/)
    .map((n) => n.replace(/^[•\-]+\s*/, "").trim())
    .filter((n) => n.length > 1);

  return {
    summary: extractSection(rawText, "SUMMARY"),
    actions: parseBullets(extractSection(rawText, "ACTION ITEMS")),
    decisions: extractSection(rawText, "KEY DECISIONS")
      .split("\n")
      .filter((l) => l.trim().length > 2)
      .map((l) => l.replace(/^[\d\.\-•]+\s*/, "").trim()),
    attendees,
    timestamps: parseTimestamps(extractSection(rawText, "TIMESTAMPS")),
    speakers: parseSpeakers(extractSection(rawText, "SPEAKERS")),
    sentiment: parseSentiment(extractSection(rawText, "SENTIMENT")),
    unansweredQuestions: parseQuestions(
      extractSection(rawText, "UNANSWERED QUESTIONS"),
    ),
    detectedLanguages: transcript ? detectLanguages(transcript) : ["English"],
    rawText,
  };
}
