# Shubham Prints & Stationers

Professional printing business website with quote enquiries and admin dashboard.

## Run locally

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your keys (optional for local JSON mode)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Admin panel:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)  
Default password: `Shubham@2026` (override with `ADMIN_PASSWORD` in `.env.local`).

## Supabase (database)

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the script in [`supabase/schema.sql`](supabase/schema.sql).
3. In **Project Settings → API**, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key (secret) → `SUPABASE_SERVICE_ROLE_KEY`
4. Add both to `.env.local` and restart the dev server.

When Supabase env vars are set, the app uses PostgreSQL for:

- Services
- Gallery products
- Customer enquiries

On first load, default services and products are seeded automatically if tables are empty.

Without Supabase, data is stored in `data/*.json` (demo / fallback).

## Cloudinary (photos)

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. From the dashboard, copy **Cloud name**, **API Key**, and **API Secret** into `.env.local`.
3. Restart `npm run dev`.

Uploads then go to Cloudinary:

- Admin → **Products / Gallery** and **Services** (Upload button)
- Customer quote form design files → folder `shubham-prints/enquiries`

Without Cloudinary, files are saved under `public/uploads/`.

Check **Admin → Settings** for live connection status.

## Email on new enquiry (Resend)

1. Sign up at [resend.com](https://resend.com) and create an API key → `RESEND_API_KEY`.
2. Set `ENQUIRY_NOTIFY_EMAIL` to the inbox that should get alerts (default: business email in `constants.ts`).
3. For production, verify your domain in Resend and set `EMAIL_FROM` (e.g. `Shubham Prints <noreply@yourdomain.com>`).  
   For testing only, you can use `onboarding@resend.dev` as the sender (Resend delivers to your own verified email).
4. Add vars to `.env.local` and Vercel, then redeploy.

Enquiry form still saves if email fails; errors are logged on the server.

## Features

- Responsive marketing site (Home, Services, About, Contact) with product showcase on Home
- Quote / enquiry forms with optional file upload
- WhatsApp and click-to-call integration
- Product gallery with lightbox
- Admin dashboard for enquiries, services, and gallery management

## Production

```bash
npm run build
npm start
```

Set all env variables on your host (Vercel, VPS, etc.).  
If using JSON fallback, ensure `data/` and `public/uploads/` are writable.
