import nodemailer, { type Transporter } from "nodemailer";

/**
 * SMTP email service for Skill-Bridge OTP delivery.
 * All configuration is read from environment variables only.
 *
 * Required env vars:
 *   SMTP_HOST     - e.g. smtp.gmail.com
 *   SMTP_PORT     - e.g. 587
 *   SMTP_USER     - e.g. myemail@gmail.com
 *   SMTP_PASSWORD  - App Password (NOT regular Gmail password)
 *   SMTP_FROM     - Sender address, defaults to SMTP_USER
 */

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass) {
    return null;
  }

  return { host, port, user, pass, from };
}

let _transporter: Transporter | null = null;

function getTransporter(): Transporter {
  const config = getSmtpConfig();
  if (!config) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASSWORD in .env.local"
    );
  }

  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
  }

  return _transporter;
}

/**
 * Send OTP verification email via SMTP.
 * Throws on failure — callers must handle errors.
 */
export async function sendOtpEmail(
  recipientEmail: string,
  otpCode: string,
  expiryMinutes: number = 10
): Promise<void> {
  const config = getSmtpConfig();
  if (!config) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASSWORD in .env.local"
    );
  }

  const transporter = getTransporter();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
    <tr>
      <td style="padding:32px 32px 24px;text-align:center;border-bottom:1px solid #e4e4e7;">
        <h1 style="margin:0;font-size:22px;font-weight:700;color:#09090b;letter-spacing:-0.3px;">Skill-Bridge</h1>
        <p style="margin:8px 0 0;font-size:14px;color:#71717a;">Email Verification</p>
      </td>
    </tr>
    <tr>
      <td style="padding:32px;">
        <p style="margin:0 0 16px;font-size:14px;color:#3f3f46;line-height:1.6;">
          Use the verification code below to complete your Skill-Bridge registration.
        </p>
        <div style="text-align:center;margin:24px 0;">
          <span style="display:inline-block;font-size:32px;font-weight:700;letter-spacing:8px;font-family:'Courier New',monospace;color:#09090b;background:#f4f4f5;padding:16px 28px;border-radius:8px;border:1px solid #e4e4e7;">
            ${otpCode}
          </span>
        </div>
        <p style="margin:16px 0 0;font-size:13px;color:#71717a;text-align:center;line-height:1.5;">
          This code expires in <strong>${expiryMinutes} minutes</strong>.<br/>
          If you did not request this, please ignore this email.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px;text-align:center;border-top:1px solid #e4e4e7;background:#fafafa;">
        <p style="margin:0;font-size:11px;color:#a1a1aa;">
          &copy; ${new Date().getFullYear()} Skill-Bridge Platform
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const textBody = `Skill-Bridge Email Verification\n\nYour verification code: ${otpCode}\n\nThis code expires in ${expiryMinutes} minutes.\n\nIf you did not request this, please ignore this email.`;

  await transporter.sendMail({
    from: `"Skill-Bridge" <${config.from}>`,
    to: recipientEmail,
    subject: "Skill-Bridge Email Verification",
    text: textBody,
    html: htmlBody,
  });
}

/**
 * Returns true if SMTP env vars are configured, false otherwise.
 */
export function isSmtpConfigured(): boolean {
  return getSmtpConfig() !== null;
}
