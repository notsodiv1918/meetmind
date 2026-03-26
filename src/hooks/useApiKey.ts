'use client'

// Key lives in .env.local as ANTHROPIC_API_KEY (server-side only).
// This hook now just returns isValid = true so the UI doesn't block.
export function useApiKey() {
  return {
    apiKey: '',
    setApiKey: () => {},
    isValid: true,  // always allow — key is validated server-side in /api/generate
  }
}
