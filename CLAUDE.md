# CLAUDE.md — Dave Bot Development Guide

## Project Overview

Dave Bot is an AI-powered CEO knowledge base that connects to Slack for strategic decision support and automated business intelligence. It integrates with HubSpot, Google Workspace, Twilio, ActiveCampaign, and other tools to provide instant answers, generate reports, send alerts, and automate business workflows.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL via Supabase
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude + OpenAI ChatGPT
- **Integrations**: Slack, HubSpot, Google APIs, Twilio, ActiveCampaign, Zapier
- **Deployment**: Vercel

## Folder Structure


app/
├── (auth)/              # Public auth pages: login, signup
├── (dashboard)/         # Protected pages: dashboard, slack, integrations, reports, alerts, meetings, analytics, settings
├── api/                 # API routes: /api/slack/events, /api/webhooks/hubspot, /api/alerts/trigger
├── globals.css          # Global Tailwind styles
└── layout.tsx           # Root layout with providers

components/
├── ui/                  # shadcn/ui components (button, card, input, etc.)
├── dashboard/           # Dashboard-specific components
├── integrations/        # Integration setup and management components
└── auth/                # Authentication forms and components

lib/
├── auth/                # Supabase auth utilities and session management
├── integrations/        # Service classes for each integration (Slack, HubSpot, etc.)
├── ai/                  # AI service utilities (Claude, ChatGPT wrappers)
├── database.ts          # Supabase client and query utilities
├── utils.ts             # Shared utility functions
└── validations.ts       # Zod schemas for data validation

actions/
├── auth-actions.ts      # Server actions for authentication
├── integration-actions.ts # Server actions for managing integrations
├── slack-actions.ts     # Server actions for Slack bot functionality
└── report-actions.ts    # Server actions for generating reports

db/
├── schema.sql           # Complete database schema with RLS policies
├── migrations/          # Supabase migration files
└── seed.sql             # Initial seed data

types/
├── database.ts          # Generated Supabase types
├── integrations.ts      # Integration-specific types
└── index.ts             # Shared application types


## Coding Conventions

- **TypeScript**: Strict mode enabled, explicit types for all functions
- **Components**: Server components by default, use 'use client' only when necessary
- **Data Access**: Database queries only in `/db` folder and server actions
- **Business Logic**: Keep in `/lib` and `/actions`, not in components
- **Client Components**: Never include API keys or sensitive data
- **Error Handling**: Use Result pattern with proper error types
- **Validation**: Use Zod schemas for all external data

## Current State: Scaffold Complete

✅ **Infrastructure**
- Next.js 15 app with TypeScript and Tailwind CSS
- Supabase integration with auth and database
- Complete data model with 11 tables
- RLS policies for secure data access
- shadcn/ui component library setup

✅ **Authentication**
- Supabase Auth with email/password
- Protected routes with middleware
- Role-based access (Owner, Admin, Tester)
- Session management utilities

✅ **Route Structure**
- 14 routes mapped from site map
- API endpoints for webhooks and integrations
- Protected dashboard pages
- Public auth pages

✅ **Integration Stubs**
- Service classes for all 8 integrations
- API client configurations
- Webhook endpoint structures
- Environment variable setup

## What to Build Next: v1 Features

### 1. Slack Bot with CEO Knowledge Base (~8 hours)
Implement Slack bot that queries Anthropic API with CEO knowledge base context for strategic decision support and instant answers.

### 2. Automated HubSpot + Google Sheets Analysis Reports (~6 hours)
Create scheduled data analysis reports combining HubSpot CRM data with Google Sheets metrics, delivered to Slack channels.

### 3. Twilio SMS Alert System (~4 hours)
Build critical business metric monitoring with customizable thresholds that trigger SMS notifications via Twilio.

### 4. Google Drive Meeting Summaries (~5 hours)
Develop ChatGPT integration for auto-generating meeting summaries and storing them as Google Drive documents.

## Never Touch Without Permission

- `.env*` files — environment variables are sensitive
- Migration files in `/db/migrations/` — database changes must be tracked
- RLS policies without security review — data access must be secure
- Supabase configuration files — breaking auth/db connection
- Production deployment configs — could break live system

## How to Work on This Project

1. **Always read this file first** — understand current state and conventions
2. **Run `npm run build`** before committing to catch TypeScript errors
3. **Test integrations thoroughly** — external APIs can fail in unexpected ways
4. **Commit small and often** — use conventional commit messages
5. **Document technical debt** — update TECHNICAL_DEBT.md when taking shortcuts
6. **Validate all external data** — never trust API responses without Zod schemas
7. **Keep secrets secure** — no API keys in client components, use server actions
8. **Follow the data flow**: UI → Server Actions → Business Logic → Database

## Development Priorities

1. **Security First**: All data access through RLS policies, no client-side secrets
2. **Integration Resilience**: Proper error handling and retry logic for external APIs
3. **User Experience**: Fast page loads, optimistic updates, clear error states
4. **Maintainability**: Clear separation of concerns, reusable components, documented code

## Testing Strategy

- **Unit Tests**: Business logic in `/lib` and `/actions`
- **Integration Tests**: API endpoints and external service calls
- **Manual Testing**: Slack bot interactions and webhook flows
- **End-to-End**: Critical user journeys through the dashboard

Remember: This is a personal tool for CEO decision-making. Prioritize reliability and intelligence over fancy features.