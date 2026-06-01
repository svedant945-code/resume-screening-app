Vercel deployment notes

1. CLI deploy (using Vercel Personal Token)

Set the token in your shell and deploy:

```powershell
$env:VERCEL_TOKEN = "<YOUR_TOKEN>"
cd "c:\Users\vedan\vs.code\resume-screening-app"
npx vercel --prod --token $env:VERCEL_TOKEN --confirm --name resume-screening-app
```

2. Environment variables (required for runtime features)

- `DATABASE_URL` (Postgres connection string)
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `JWT_SECRET`

Add these in the Vercel dashboard (Project → Settings → Environment Variables) or via the CLI/API before the first production deployment.

3. Migrations

Run migrations against your production DB once before the app expects data:

```powershell
# set production DB for this session, then run migrations
$env:DATABASE_URL = "postgresql://<user>:<pass>@<host>:5432/<db>?schema=public"
npx prisma migrate deploy
npx prisma generate
```
