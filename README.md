MeetMind — AI Meeting Summarizer
Turn any meeting into structured minutes in seconds. Paste a transcript, upload audio, or capture live from Google Meet, Zoom, or Teams using the Chrome extension.
Live demo: meetmind-lzxn.vercel.app

Features

 Live Chrome Extension — listens directly from Google Meet, Zoom, and Teams in real time
 Instant MOM Generation — summary, action items, key decisions, attendees, and timeline
 Multi-language Support — speak in Hindi, Tamil, English, or mix them — output is always clean English
 Speaker Detection — identifies who said what
 Sentiment Score — rates meeting productivity from 0-100
 Unanswered Question Detector — flags questions that were never answered
 Image Analysis — upload whiteboard photos or screenshots
 PDF Report Export — beautifully formatted, ready to share
 Email Export — opens mail client with MOM pre-filled
 Meeting History — all past MOMs saved locally and searchable


Tech Stack

Framework — Next.js 14, TypeScript
Styling — Tailwind CSS, Framer Motion
AI — Groq API (LLaMA 3.3 70B)
Background — @paper-design/shaders-react
Extension — Chrome MV3, Web Speech API
Deployment — Vercel

Project Structure
meetmind/
├── web-app/          ← Next.js app
│   ├── src/
│   │   ├── app/      ← Pages and API routes
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types/
└── extension/        ← Chrome extension
    ├── popup/
    ├── content/
    └── background/

Built with ❤ by Divyansh Rangari
