import { Resend } from 'resend'
import { env } from '../config/env.js'

const resend = env.resendApiKey ? new Resend(env.resendApiKey) : null

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildHtmlTemplate({ title, preheader, body }) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#020617;font-family:Inter,Arial,sans-serif;color:#f8fafc;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <div style="background:linear-gradient(135deg,#0f172a,#1e293b);border:1px solid #1f2937;border-radius:24px;padding:24px;">
        <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#a78bfa;">DevForge AI</p>
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.2;color:#f8fafc;">${escapeHtml(title)}</h1>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#cbd5e1;">${escapeHtml(preheader)}</p>
        <div style="background:#111827;border:1px solid #1f2937;border-radius:16px;padding:16px;color:#e2e8f0;line-height:1.7;">${body}</div>
      </div>
    </div>
  </body>
</html>`
}

export async function sendWelcomeEmail({ to, name }) {
  if (!resend) return { success: false, message: 'Resend is not configured.' }

  const html = buildHtmlTemplate({
    title: 'Welcome to DevForge AI',
    preheader: 'Start building, debugging, and shipping with a focused developer workspace.',
    body: `<p>Hi ${escapeHtml(name || 'there')},</p><p>Your workspace is ready. Capture bugs, store project context, generate documentation, and keep every insight searchable.</p><p><a href="https://devforge-ai.example.com/dashboard" style="display:inline-block;margin-top:8px;padding:10px 16px;background:#7c3aed;color:white;border-radius:999px;text-decoration:none;">Open your workspace</a></p>`,
  })

  return resend.emails.send({
    from: 'DevForge AI <onboarding@devforge.app>',
    to,
    subject: 'Welcome to DevForge AI',
    html,
  })
}

export async function sendVerificationEmail({ to, name, verificationUrl }) {
  if (!resend) return { success: false, message: 'Resend is not configured.' }

  const html = buildHtmlTemplate({
    title: 'Verify your email',
    preheader: 'Confirm your account so you can access DevForge AI.',
    body: `<p>Hi ${escapeHtml(name || 'there')},</p><p>Complete your verification to activate your account.</p><p><a href="${escapeHtml(verificationUrl || '#')}" style="display:inline-block;margin-top:8px;padding:10px 16px;background:#7c3aed;color:white;border-radius:999px;text-decoration:none;">Verify email</a></p>`,
  })

  return resend.emails.send({
    from: 'DevForge AI <verify@devforge.app>',
    to,
    subject: 'Verify your DevForge AI account',
    html,
  })
}

export async function sendPasswordResetEmail({ to, name, resetUrl }) {
  if (!resend) return { success: false, message: 'Resend is not configured.' }

  const html = buildHtmlTemplate({
    title: 'Reset your password',
    preheader: 'Use the secure link below to update your password.',
    body: `<p>Hi ${escapeHtml(name || 'there')},</p><p>We received a request to reset your password. If this was you, continue below.</p><p><a href="${escapeHtml(resetUrl || '#')}" style="display:inline-block;margin-top:8px;padding:10px 16px;background:#7c3aed;color:white;border-radius:999px;text-decoration:none;">Reset password</a></p>`,
  })

  return resend.emails.send({
    from: 'DevForge AI <security@devforge.app>',
    to,
    subject: 'Reset your DevForge AI password',
    html,
  })
}
