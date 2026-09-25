import { isEnquiryEmailConfigured } from "@/lib/enquiry-email";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { SiteContentManager } from "@/components/admin/SiteContentManager";
import { EmailLink, PhoneLink } from "@/components/ui/ContactLinks";
import { getDataBackend, getSiteContent } from "@/lib/store";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminSettingsPage() {
  const siteContent = await getSiteContent();
  const backend = getDataBackend();
  const supabaseOn = isSupabaseConfigured();
  const cloudinaryOn = isCloudinaryConfigured();
  const enquiryEmailOn = isEnquiryEmailConfigured();

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-[#0a1628]">Settings</h1>
      <p className="mt-1 text-sm text-slate-600">
        Site configuration, database and media storage.
      </p>

      <div className="mt-8 max-w-3xl space-y-6">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm">
          <h2 className="font-semibold text-[#0a1628]">Website content (public site)</h2>
          <p className="mt-1 text-sm text-slate-600">
            Business details, announcement bar, home hero, SEO and WhatsApp default message.
          </p>
          <div className="mt-6">
            <SiteContentManager initial={siteContent} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-[#0a1628]">Connection status</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <span className="font-medium">Data backend:</span>{" "}
              <span
                className={
                  backend === "supabase" ? "text-emerald-700" : "text-amber-700"
                }
              >
                {backend === "supabase" ? "Supabase (connected)" : "Local JSON files"}
              </span>
            </li>
            <li>
              <span className="font-medium">Supabase:</span>{" "}
              {supabaseOn ? (
                <span className="text-emerald-700">Configured</span>
              ) : (
                <span className="text-slate-500">Not configured — using data/*.json</span>
              )}
            </li>
            <li>
              <span className="font-medium">Cloudinary:</span>{" "}
              {cloudinaryOn ? (
                <span className="text-emerald-700">Configured</span>
              ) : (
                <span className="text-slate-500">
                  Not configured — uploads go to public/uploads
                </span>
              )}
            </li>
            <li>
              <span className="font-medium">Enquiry email alerts:</span>{" "}
              {enquiryEmailOn ? (
                <span className="text-emerald-700">Resend configured</span>
              ) : (
                <span className="text-slate-500">
                  Not configured — set RESEND_API_KEY in env
                </span>
              )}
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-[#0a1628]">Live business preview</h2>
          <ul className="mt-4 space-y-1 text-sm text-slate-700">
            <li>{siteContent.business.name}</li>
            <li>{siteContent.business.owner}</li>
            <li>
              <EmailLink email={siteContent.business.email} className="text-[#1e3a5f]" />
            </li>
            {siteContent.business.phones.map((phone) => (
              <li key={phone}>
                <PhoneLink phone={phone} className="text-[#1e3a5f]" />
              </li>
            ))}
            <li>{siteContent.business.address.full}</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-[#0a1628]">Environment variables</h2>
          <p className="mt-2 text-sm text-slate-600">
            Copy <code className="rounded bg-slate-100 px-1">.env.example</code> to{" "}
            <code className="rounded bg-slate-100 px-1">.env.local</code> and fill in
            your keys. Restart <code className="rounded bg-slate-100 px-1">npm run dev</code>{" "}
            after changes.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>ADMIN_PASSWORD</li>
            <li>NEXT_PUBLIC_SUPABASE_URL</li>
            <li>SUPABASE_SERVICE_ROLE_KEY (server only — never expose to browser)</li>
            <li>CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET</li>
            <li>RESEND_API_KEY, ENQUIRY_NOTIFY_EMAIL, EMAIL_FROM (optional)</li>
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            Run <code className="rounded bg-slate-100 px-1">supabase/schema.sql</code> in
            the Supabase SQL Editor before first use (includes{" "}
            <code className="rounded bg-slate-100 px-1">app_settings</code> for site content
            &amp; price calculator on Vercel).
          </p>
        </div>
      </div>
    </div>
  );
}
