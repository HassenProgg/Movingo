# MOVINGO

Website for MOVINGO, a moving and transport company in Tunisia. The site is built with Next.js and includes a quote request form that sends submissions to Telegram.

## Run locally

1. Install Node.js and npm.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env.local` and set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
4. Start the development server with `npm run dev`.

## Deploy to Vercel

Import this repository as a new Vercel project and keep the detected Next.js build settings. In the Vercel project settings, add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as Production environment variables, then deploy. Add the purchased domain under **Settings → Domains** and follow the DNS records Vercel shows for the domain's registrar.

The quote form cannot deliver submissions until both Telegram environment variables are configured. Keep the bot token private and never commit `.env.local`.
