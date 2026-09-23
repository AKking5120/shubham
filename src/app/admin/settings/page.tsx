import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { BUSINESS } from "@/lib/constants";
import { getDataBackend } from "@/lib/store";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default function AdminSettingsPage() {
  const backend = getDataBackend();
  const supabaseOn = isSupabaseConfigured();
  const cloudinaryOn = isCloudinaryConfigured();

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-[#0a1628]">Settings</h1>
      <p className="mt-1 text-sm text-slate-600">
        Site configuration, database and media storage.
      </p>

      <div className="mt-8 max-w-2xl space-y-6">
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
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-[#0a1628]">Business details</h2>
          <p className="mt-2 text-sm text-slate-600">
            Edit contact info in{" "}
            <code className="rounded bg-slate-100 px-1">src/lib/constants.ts</code>.
          </p>
          <ul className="mt-4 space-y-1 text-sm text-slate-700">
            <li>{BUSINESS.name}</li>
            <li>{BUSINESS.owner}</li>
            <li>{BUSINESS.email}</li>
            <li>{BUSINESS.address.full}</li>
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
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            Run <code className="rounded bg-slate-100 px-1">supabase/schema.sql</code> in
            the Supabase SQL Editor before first use.
          </p>
        </div>
      </div>
    </div>
  );
}
