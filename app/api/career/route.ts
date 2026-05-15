import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

const FROM = "Chams Construction Careers <enquiry@chamsconstruction.com>";
const REPLY_TO_USER = "contact@chamsconstruction.com";
const COMPANY_INBOX = "chamsconstructionsg@gmail.com";

type CareerPayload = {
  name: string;
  phone: string;
  email: string;
  role: string;
  experience: string;
};

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function applicantTemplate(data: CareerPayload) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f7f9f7;font-family:Arial,Helvetica,sans-serif;color:#062f3a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden;box-shadow:0 4px 16px rgba(9,36,100,0.08);">
            <tr>
              <td style="background:#092464;padding:30px 32px;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:4px;color:#f4c124;font-weight:700;text-transform:uppercase;">Careers @ Chams Construction</p>
                <h1 style="margin:8px 0 0;font-size:26px;line-height:1.3;">Application received, ${escape(data.name)}.</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;font-size:15px;line-height:1.7;color:#334155;">
                <p style="margin:0 0 14px;">Thank you for applying to join the Chams Construction team. Our hiring coordinator will review your application and respond shortly.</p>
                <div style="margin:18px 0;padding:14px 18px;background:#f1f5f9;border-left:4px solid #f4c124;border-radius:4px;">
                  <p style="margin:0;font-weight:700;color:#062f3a;">Applied role: ${escape(data.role)}</p>
                </div>
                <p style="margin:0 0 6px;font-weight:700;color:#062f3a;">Your details</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:6px;">
                  <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;width:160px;color:#64748b;">Phone</td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">${escape(data.phone)}</td></tr>
                  <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#64748b;">Email</td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">${escape(data.email)}</td></tr>
                  <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;">Experience &amp; availability</td><td style="padding:8px 0;white-space:pre-wrap;">${escape(data.experience)}</td></tr>
                </table>
                <p style="margin:24px 0 0;">Please keep this email for your reference. If shortlisted, we will contact you on the phone number above.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#062f3a;padding:18px 32px;color:#ffffff;font-size:13px;font-weight:700;">
                Chams Construction Pte Ltd &middot; Hiring Team
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function hiringTemplate(data: CareerPayload) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0f172a;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden;">
            <tr>
              <td style="background:#092464;padding:22px 28px;color:#ffffff;">
                <p style="margin:0;font-size:11px;letter-spacing:4px;font-weight:800;text-transform:uppercase;color:#f4c124;">New Application &mdash; Join Our Team</p>
                <h1 style="margin:6px 0 0;font-size:22px;">${escape(data.name)} &mdash; ${escape(data.role)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px;font-size:14px;line-height:1.7;color:#0f172a;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;width:170px;color:#64748b;font-weight:700;">Applicant</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">${escape(data.name)}</td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:700;">Preferred role</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">${escape(data.role)}</td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:700;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;"><a href="tel:${escape(data.phone)}" style="color:#092464;">${escape(data.phone)}</a></td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:700;">Email</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;"><a href="mailto:${escape(data.email)}" style="color:#092464;">${escape(data.email)}</a></td></tr>
                  <tr><td style="padding:10px 0;color:#64748b;font-weight:700;vertical-align:top;">Experience &amp; availability</td><td style="padding:10px 0;white-space:pre-wrap;">${escape(data.experience)}</td></tr>
                </table>
                <div style="margin-top:22px;padding:12px 16px;background:#fff7d6;border:1px solid #f4c124;border-radius:4px;font-size:13px;color:#062f3a;">
                  Reply directly to this email to contact the applicant.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as CareerPayload;
    if (!data?.name || !data?.email || !data?.phone || !data?.role || !data?.experience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [applicantMail, hiringMail] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: data.email,
        replyTo: REPLY_TO_USER,
        subject: "Application received — Chams Construction",
        html: applicantTemplate(data),
      }),
      resend.emails.send({
        from: FROM,
        to: COMPANY_INBOX,
        replyTo: data.email,
        subject: `New application: ${data.name} — ${data.role}`,
        html: hiringTemplate(data),
      }),
    ]);

    if (applicantMail.error || hiringMail.error) {
      return NextResponse.json(
        { error: applicantMail.error?.message || hiringMail.error?.message },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
