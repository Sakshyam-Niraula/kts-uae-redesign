// Runtime-agnostic contact handler (Web Request -> Response).
// Used by the Cloudflare Pages Function in /functions and by the Vite dev server,
// so the exact same validation/sending code is exercised locally and in production.

export interface ContactEnv {
  RESEND_API_KEY?: string
  CONTACT_TO_EMAIL?: string
  CONTACT_FROM_EMAIL?: string
  TURNSTILE_SECRET_KEY?: string
  ALLOWED_ORIGIN?: string
}

interface Payload {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
  website?: string // honeypot
  startedAt?: number // ms epoch when form rendered
  turnstileToken?: string
}

const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...extra },
  })

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/
const PHONE = /^\+?[0-9 ()\-]{6,20}$/
const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : ''
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export function validate(raw: Record<string, unknown>) {
  const p = {
    firstName: clean(raw.firstName, 60),
    lastName: clean(raw.lastName, 60),
    email: clean(raw.email, 254),
    phone: clean(raw.phone, 20),
    subject: clean(raw.subject, 120),
    message: clean(raw.message, 3000),
  }
  const errors: Record<string, string> = {}
  if (p.firstName.length < 2) errors.firstName = 'Please enter your first name.'
  if (p.lastName.length < 2) errors.lastName = 'Please enter your last name.'
  if (!EMAIL.test(p.email)) errors.email = 'Please enter a valid email address.'
  if (!PHONE.test(p.phone)) errors.phone = 'Please enter a valid phone number.'
  if (p.subject.length < 3) errors.subject = 'Please enter a subject.'
  if (p.message.length < 10) errors.message = 'Please tell us a little more (at least 10 characters).'
  return { p, errors }
}

// Best-effort per-instance rate limit (serverless instances are ephemeral; Turnstile is the real defence).
const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000)
  arr.push(now)
  hits.set(ip, arr)
  return arr.length > 5
}

export async function handleContact(req: Request, env: ContactEnv): Promise<Response> {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204 })
  if (req.method !== 'POST') return json({ ok: false, error: 'Method not allowed.' }, 405, { allow: 'POST' })

  const origin = req.headers.get('origin')
  if (env.ALLOWED_ORIGIN && origin && origin !== env.ALLOWED_ORIGIN)
    return json({ ok: false, error: 'Origin not allowed.' }, 403)

  if (!(req.headers.get('content-type') ?? '').includes('application/json'))
    return json({ ok: false, error: 'Unsupported content type.' }, 415)

  const ip = req.headers.get('cf-connecting-ip') ?? req.headers.get('x-forwarded-for') ?? 'local'
  if (limited(ip)) return json({ ok: false, error: 'Too many requests. Please try again later.' }, 429)

  let raw: Payload
  try {
    const text = await req.text()
    if (text.length > 20_000) return json({ ok: false, error: 'Payload too large.' }, 413)
    raw = JSON.parse(text)
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400)
  }

  // Spam: honeypot filled or form submitted implausibly fast -> pretend success, send nothing.
  const tooFast = typeof raw.startedAt === 'number' && Date.now() - raw.startedAt < 2500
  if (raw.website || tooFast) return json({ ok: true })

  const { p, errors } = validate(raw as unknown as Record<string, unknown>)
  if (Object.keys(errors).length) return json({ ok: false, error: 'Please correct the highlighted fields.', fields: errors }, 422)

  if (env.TURNSTILE_SECRET_KEY) {
    const form = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: String(raw.turnstileToken ?? ''), remoteip: ip })
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })
    const d = (await r.json().catch(() => ({}))) as { success?: boolean }
    if (!d.success) return json({ ok: false, error: 'Spam check failed. Please refresh and try again.' }, 400)
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL)
    return json({ ok: false, error: 'Email delivery is not configured yet. Please contact us by phone or WhatsApp.', code: 'NOT_CONFIGURED' }, 503)

  const html = `<h2>New website enquiry</h2>
<p><b>Name:</b> ${esc(p.firstName)} ${esc(p.lastName)}<br><b>Email:</b> ${esc(p.email)}<br><b>Phone:</b> ${esc(p.phone)}<br><b>Subject:</b> ${esc(p.subject)}</p>
<p style="white-space:pre-wrap">${esc(p.message)}</p>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: p.email,
      subject: `[KTS website] ${p.subject}`.replace(/[\r\n]+/g, ' '),
      html,
    }),
  })
  if (!res.ok) return json({ ok: false, error: 'We could not send your message right now. Please try again or call us.' }, 502)
  return json({ ok: true })
}
