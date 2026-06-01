# Resume Screening & Candidate Ranking App

A full-stack HR application built with Next.js 15, Tailwind CSS, ShadCN UI, Prisma, PostgreSQL, and AI-inspired resume analysis.

## Features

- Admin authentication with protected routes
- Resume upload, parsing, and local file storage
- Job description capture and analysis
- Candidate scoring and ranking
- Search, sort, and filters
- CSV and Excel export
- Analytics dashboard

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Hook Form
- Prisma ORM
- PostgreSQL

## Getting Started

1. Install Node.js 20+ and PostgreSQL.
2. Copy `.env.example` to `.env` and update values.
3. From the project root, install dependencies:
   ```bash
   npm install
   ```
4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
5. Create the database migration:
   ```bash
   npm run prisma:migrate
   ```
6. Start the app:
   ```bash
   npm run dev
   ```

## Deployment

Deploy to Vercel by connecting the repository and setting the following environment variables:

- `DATABASE_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `JWT_SECRET`

## Project Structure

- `app/` — Next.js routes, pages, and API endpoints
- `components/` — Shared UI components
- `lib/` — Utilities and auth helpers
- `services/` — Resume parsing and scoring logic
- `prisma/` — Schema and migrations

## Notes

This project includes placeholder resume parsing and scoring services. You can extend the parser and scoring algorithm with advanced NLP or AI services later.
