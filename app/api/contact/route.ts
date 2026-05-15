import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

const FROM = "Chams Construction <enquiry@chamsconstruction.com>";
const REPLY_TO_USER = "contact@chamsconstruction.com";
const COMPANY_INBOX = "chamsconstructionsg@gmail.com";

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function userTemplate(data: ContactPayload) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f6f5;font-family:Arial,Helvetica,sans-serif;color:#062f3a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden;box-shadow:0 4px 16px rgba(6,47,58,0.08);">
            <tr>
              <td style="background:#062f3a;padding:28px 32px;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:4px;color:#f4c124;font-weight:700;text-transform:uppercase;">Chams Construction</p>
                <h1 style="margin:8px 0 0;font-size:26px;line-height:1.3;">Thank you for your enquiry, ${escape(data.name)}.</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;font-size:15px;line-height:1.7;color:#334155;">
                <p style="margin:0 0 16px;">We have received your project enquiry and our team will reach out within one business day.</p>
                <p style="margin:0 0 8px;font-weight:700;color:#062f3a;">Summary of your enquiry</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">
                  <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;width:140px;color:#64748b;">Service</td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">${escape(data.service)}</td></tr>
                  <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#64748b;">Phone</td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">${escape(data.phone)}</td></tr>
                  <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#64748b;">Email</td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">${escape(data.email)}</td></tr>
                  <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;">Message</td><td style="padding:8px 0;white-space:pre-wrap;">${escape(data.message)}</td></tr>
                </table>
                <p style="margin:24px 0 0;">For urgent matters, call us directly. We look forward to working with you.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#f4c124;padding:18px 32px;color:#062f3a;font-size:13px;font-weight:700;">
                Chams Construction &middot; Singapore
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-size:12px;color:#94a3b8;">This is an automated confirmation. Replies go to enquiry@chamsconstruction.com.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function companyTemplate(data: ContactPayload) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0b1220;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden;">
            <tr>
              <td style="background:#f4c124;padding:20px 28px;color:#062f3a;">
                <p style="margin:0;font-size:11px;letter-spacing:4px;font-weight:800;text-transform:uppercase;">New Enquiry &mdash; Contact Form</p>
                <h1 style="margin:6px 0 0;font-size:22px;">${escape(data.name)} &mdash; ${escape(data.service)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px;font-size:14px;line-height:1.7;color:#0f172a;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;width:150px;color:#64748b;font-weight:700;">Name</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">${escape(data.name)}</td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:700;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;"><a href="tel:${escape(data.phone)}" style="color:#062f3a;">${escape(data.phone)}</a></td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:700;">Email</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;"><a href="mailto:${escape(data.email)}" style="color:#062f3a;">${escape(data.email)}</a></td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:700;">Service</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">${escape(data.service)}</td></tr>
                  <tr><td style="padding:10px 0;color:#64748b;font-weight:700;vertical-align:top;">Message</td><td style="padding:10px 0;white-space:pre-wrap;">${escape(data.message)}</td></tr>
                </table>
                <p style="margin:24px 0 0;font-size:12px;color:#64748b;">Received via chamsconstruction.com contact form.</p>
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
    const data = (await request.json()) as ContactPayload;
    if (!data?.name || !data?.email || !data?.phone || !data?.service || !data?.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [userMail, companyMail] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: data.email,
        replyTo: REPLY_TO_USER,
        subject: "We received your enquiry — Chams Construction",
        html: userTemplate(data),
      }),
      resend.emails.send({
        from: FROM,
        to: COMPANY_INBOX,
        replyTo: data.email,
        subject: `New enquiry: ${data.name} — ${data.service}`,
        html: companyTemplate(data),
      }),
    ]);

    if (userMail.error || companyMail.error) {
      return NextResponse.json(
        { error: userMail.error?.message || companyMail.error?.message },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
