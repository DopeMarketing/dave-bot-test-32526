# Dave Bot - Test 3/25/26

AI-powered CEO knowledge base bot that connects to Slack for strategic decision support and automated business intelligence across integrated platforms.

## What This Does

Dave Bot is an intelligent assistant that embodies the CEO's strategic thinking and decision-making patterns. It connects to Slack to provide instant answers to business questions, generates automated analysis reports from HubSpot and Google Sheets data, sends critical business alerts via Twilio SMS, and creates AI-generated meeting summaries in Google Drive. Built for personal use to scale CEO expertise across the organization.

## Who This Is For

- CEOs and founders who want to scale their decision-making expertise
- Leadership teams needing instant access to strategic insights
- Organizations wanting to automate business intelligence workflows
- Companies looking to integrate AI across their existing tool stack

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Supabase
- **Database**: PostgreSQL (Supabase)
- **AI**: Anthropic Claude, OpenAI ChatGPT
- **Integrations**: Slack, HubSpot, Google Sheets, Google Drive, Twilio, ActiveCampaign, Zapier
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm
- Supabase CLI
- Vercel CLI (for deployment)
- API keys for: Slack, HubSpot, OpenAI, Anthropic, Google Cloud, Twilio, ActiveCampaign

## Local Setup

1. **Clone and install dependencies**
   bash
   git clone <repository-url>
   cd dave-bot-test
   npm install
   

2. **Set up environment variables**
   bash
   cp .env.example .env.local
   # Edit .env.local with your API keys and database URLs
   

3. **Start Supabase locally**
   bash
   supabase start
   

4. **Run database migrations**
   bash
   supabase db reset
   

5. **Start development server**
   bash
   npm run dev
   

6. **Open your browser**
   
   http://localhost:3000
   

## Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `ANTHROPIC_API_KEY` | Anthropic Claude API key | Yes |
| `OPENAI_API_KEY` | OpenAI ChatGPT API key | Yes |
| `SLACK_BOT_TOKEN` | Slack bot token | Yes |
| `SLACK_SIGNING_SECRET` | Slack app signing secret | Yes |
| `HUBSPOT_API_KEY` | HubSpot private app token | Yes |
| `GOOGLE_CLIENT_ID` | Google Cloud OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google Cloud OAuth client secret | Yes |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | Yes |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | Yes |
| `ACTIVECAMPAIGN_API_URL` | ActiveCampaign API URL | Yes |
| `ACTIVECAMPAIGN_API_KEY` | ActiveCampaign API key | Yes |
| `ZAPIER_WEBHOOK_URL` | Zapier webhook endpoint | No |
| `NEXTAUTH_SECRET` | NextAuth.js secret | Yes |
| `NEXTAUTH_URL` | Application base URL | Yes |

## Database Setup

The database schema includes 11 tables for managing users, integrations, knowledge base entries, Slack queries, reports, metrics, alerts, summaries, insights, feedback analysis, and workflow executions.

Run migrations:
bash
supabase db reset


Seed initial data:
bash
npm run db:seed


## Deploy to Vercel

1. **Install Vercel CLI and login**
   bash
   npm i -g vercel
   vercel login
   

2. **Deploy**
   bash
   vercel
   

3. **Set environment variables in Vercel dashboard**
   - Copy all variables from `.env.local` to Vercel project settings
   - Update `NEXTAUTH_URL` to your production domain

4. **Link Supabase production database**
   - Create production Supabase project
   - Update database URLs in Vercel environment variables
   - Run migrations on production database

## Project Structure


├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Protected dashboard pages
│   ├── api/             # API routes
│   ├── globals.css      # Global styles
│   └── layout.tsx       # Root layout
├── components/
│   ├── ui/              # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   └── integrations/    # Integration components
├── lib/
│   ├── auth/            # Authentication utilities
│   ├── integrations/    # Integration services
│   ├── ai/              # AI service utilities
│   └── utils.ts         # Shared utilities
├── db/
│   ├── schema.sql       # Database schema
│   ├── migrations/      # Migration files
│   └── seed.sql         # Seed data
├── actions/             # Server actions
├── types/               # TypeScript type definitions
└── supabase/            # Supabase configuration
