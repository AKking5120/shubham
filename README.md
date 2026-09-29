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

## SEO & custom domain

1. **Vercel** → Project → **Settings → Domains** — add your domain (e.g. `shubhamprints.in` and `www`). Point DNS at Vercel as shown in the dashboard.
2. **Environment variable** (Production + Preview): set `NEXT_PUBLIC_SITE_URL` to your live URL, e.g. `https://www.yourdomain.com` (no trailing slash). Redeploy.
3. After deploy, check:
   - `https://yourdomain.com/robots.txt`
   - `https://yourdomain.com/sitemap.xml`
4. **Google Search Console** — [search.google.com/search-console](https://search.google.com/search-console): add property → verify with HTML tag → copy the `content` value into `GOOGLE_SITE_VERIFICATION` in Vercel → redeploy.
5. In Search Console, submit sitemap: `https://yourdomain.com/sitemap.xml`.
6. **Google Business Profile** — keep name, address, phone identical to the website; link your domain in the profile.
7. **Admin → Site content** — edit SEO title & description for local keywords (Jaitpur, Badarpur, wedding cards, bill books, etc.).

## Razorpay (online pay)

1. Razorpay Dashboard → **API Keys** (use **Test** mode first).
2. Vercel env (never commit secrets):
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` = Key ID (`rzp_test_...` or live)
   - `RAZORPAY_KEY_ID` = same Key ID
   - `RAZORPAY_KEY_SECRET` = Secret from dashboard
3. Redeploy. Checkout → **Pay online (Razorpay)** opens the test gateway.
4. Test card: `4111 1111 1111 1111`, any future expiry, any CVV (Razorpay docs).
