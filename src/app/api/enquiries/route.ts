import { NextResponse } from "next/server";
import { addEnquiry, getEnquiries } from "@/lib/store";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { sendNewEnquiryEmail } from "@/lib/enquiry-email";
import { saveUploadedFile } from "@/lib/uploads";

export async function GET() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const enquiries = await getEnquiries();
  return NextResponse.json(enquiries);
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let body: Record<string, string | null> = {};
    let uploadedFile: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      body = {
        customerName: String(form.get("customerName") ?? ""),
        phone: String(form.get("phone") ?? ""),
        email: String(form.get("email") ?? ""),
        service: String(form.get("service") ?? ""),
        quantity: String(form.get("quantity") ?? ""),
        size: String(form.get("size") ?? ""),
        material: String(form.get("material") ?? ""),
        colorRequirement: String(form.get("colorRequirement") ?? ""),
        message: String(form.get("message") ?? ""),
      };
      const file = form.get("uploadedFile");
      if (file && file instanceof File && file.size > 0) {
        uploadedFile = await saveUploadedFile(file, "enquiries");
      }
    } else {
      const json = await request.json();
      body = json;
      uploadedFile = json.uploadedFile ?? null;
    }

    if (!body.customerName?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 },
      );
    }

    const enquiry = await addEnquiry({
      customerName: body.customerName.trim(),
      phone: body.phone.trim(),
      email: (body.email ?? "").trim(),
      service: (body.service ?? "Other").trim(),
      quantity: (body.quantity ?? "").trim(),
      size: (body.size ?? "").trim(),
      material: (body.material ?? "").trim(),
      colorRequirement: (body.colorRequirement ?? "").trim(),
      message: (body.message ?? "").trim(),
      uploadedFile,
    });

    try {
      await sendNewEnquiryEmail(enquiry);
    } catch (err) {
      console.error("[enquiries] notification email failed:", err);
    }

    return NextResponse.json({ success: true, enquiry });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit enquiry." },
      { status: 500 },
    );
  }
}
