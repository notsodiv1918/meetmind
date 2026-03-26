/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove this if you want server components to call the Anthropic API server-side
  // For now everything is client-side (API key entered by user in browser)
  reactStrictMode: true,
}

module.exports = nextConfig
