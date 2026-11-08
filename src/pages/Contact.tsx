import { useEffect, useRef, useState, type FormEvent } from 'react'
import { PageHero, Reveal, SEO } from '../components/ui'
import { CONCEPT_NOTICE, SITE, messengerLink, waLink } from '../data/site'

type Fields = 'firstName' | 'lastName' | 'email' | 'phone' | 'subject' | 'message'
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/
const PHONE = /^\+?[0-9 ()\-]{6,20}$/

function check(v: Record<Fields, string>) {
  const e: Partial<Record<Fields, string>> = {}
  if (v.firstName.trim().length < 2) e.firstName = 'Please enter your first name.'
  if (v.lastName.trim().length < 2) e.lastName = 'Please enter your last name.'
  if (!EMAIL.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (!PHONE.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.'
  if (v.subject.trim().length < 3) e.subject = 'Please enter a subject.'
  if (v.message.trim().length < 10) e.message = 'Please tell us a little more (at least 10 characters).'
  return e
}

declare global { interface Window { turnstile?: { render: (el: HTMLElement, o: object) => void } } }

export default function Contact() {
  const empty = { firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' }
  const [v, setV] = useState<Record<Fields, string>>(empty)
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const [hp, setHp] = useState('')
  const started = useRef(Date.now())
  const token = useRef('')
  const tsEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!SITE.turnstileSiteKey || !tsEl.current) return
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    s.async = true
    s.onload = () => window.turnstile?.render(tsEl.current!, { sitekey: SITE.turnstileSiteKey, callback: (t: string) => (token.current = t) })
    document.head.appendChild(s)
    return () => { s.remove() }
  }, [])

  const set = (k: Fields) => (e: { target: { value: string } }) => {
    setV((p) => ({ ...p, [k]: e.target.value }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    const errs = check(v)
    setErrors(errs)
    if (Object.keys(errs).length) {
      setStatus('idle')
      document.getElementById(Object.keys(errs)[0])?.focus()
      return
    }
    setStatus('sending'); setMsg('')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...v, website: hp, startedAt: started.current, turnstileToken: token.current }),
      })
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Partial<Record<Fields, string>> }
      if (r.ok && d.ok) { setStatus('ok'); setV(empty); started.current = Date.now(); return }
      if (d.fields) setErrors(d.fields)
      setStatus('error'); setMsg(d.error ?? 'Something went wrong. Please try again.')
    } catch {
      setStatus('error'); setMsg('Network error. Please check your connection and try again.')
    }
  }

  const F = ({ k, label, type = 'text', auto }: { k: Fields; label: string; type?: string; auto?: string }) => (
    <div className="field">
      <label htmlFor={k}>{label}</label>
      <input id={k} name={k} type={type} autoComplete={auto} value={v[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} required />
      {errors[k] && <p className="err" id={`${k}-err`} role="alert">{errors[k]}</p>}
    </div>
  )

  return (
    <>
      <SEO path="/contact" title="Contact Us" description="Contact KTS in Dubai for a consultation on technology, infrastructure, construction and interior solutions. Call, WhatsApp, email or send an enquiry." />
      <PageHero eyebrow="Contact Us" title="Get a consultation." text="Tell us about your project and the KTS team will get back to you." />
      <section className="section">
        <div className="container-x" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', alignItems: 'start' }}>
          <Reveal>
            <form className="glass" onSubmit={submit} noValidate style={{ padding: 'clamp(1.5rem,4vw,2.5rem)', display: 'grid', gap: '1.1rem' }} aria-label="Contact form">
              <div style={{ display: 'grid', gap: '1.1rem', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))' }}>
                <F k="firstName" label="First name" auto="given-name" /><F k="lastName" label="Last name" auto="family-name" />
                <F k="email" label="Email" type="email" auto="email" /><F k="phone" label="Phone" type="tel" auto="tel" />
              </div>
              <F k="subject" label="Subject" />
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} value={v.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined} required />
                {errors.message && <p className="err" id="message-err" role="alert">{errors.message}</p>}
              </div>
              <div className="hp" aria-hidden><label>Website<input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></label></div>
              {SITE.turnstileSiteKey && <div ref={tsEl} />}
              <button className="btn btn-primary" disabled={status === 'sending'} type="submit" style={{ justifySelf: 'start' }}>{status === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
              <div aria-live="polite">
                {status === 'ok' && <p role="status" style={{ padding: '1rem 1.2rem', borderRadius: '.85rem', background: 'rgba(0,168,150,.12)', border: '1px solid var(--accent)', fontWeight: 600 }}>Thank you — your message has been sent. We’ll be in touch shortly.</p>}
                {status === 'error' && <p role="alert" style={{ padding: '1rem 1.2rem', borderRadius: '.85rem', background: 'rgba(23,43,54,.08)', border: '1px solid var(--primary)', fontWeight: 600 }}>{msg}</p>}
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <div style={{ display: 'grid', gap: '1.1rem' }}>
              <div className="glass" style={{ padding: '2rem' }}>
                <h2 style={{ font: '800 1.4rem var(--font-display)' }}>Reach us directly</h2>
                <dl style={{ margin: '1.3rem 0 0', display: 'grid', gap: '1.1rem' }}>
                  <div><dt style={dt}>Email</dt><dd style={dd}><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd></div>
                  <div><dt style={dt}>Phone</dt>{SITE.phones.map((p) => <dd key={p.tel} style={dd}><a href={`tel:${p.tel}`}>{p.display}</a></dd>)}</div>
                  <div><dt style={dt}>Location</dt><dd style={dd}>{SITE.address}</dd></div>
                </dl>
              </div>
              <div className="glass-dark hero-bg" style={{ padding: '2rem' }}>
                <h2 style={{ font: '800 1.2rem var(--font-display)' }}>Prefer to chat?</h2>
                <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap', marginTop: '1.2rem' }}>
                  {SITE.phones.map((p) => <a key={p.wa} className="btn btn-primary" style={{ padding: '.8rem 1.2rem', fontSize: '.88rem' }} href={waLink(p.wa)} target="_blank" rel="noopener noreferrer">WhatsApp {p.display}</a>)}
                  {messengerLink() && <a className="btn btn-ghost" style={{ padding: '.8rem 1.2rem', fontSize: '.88rem' }} href={messengerLink()} target="_blank" rel="noopener noreferrer">Messenger</a>}
                  {SITE.social.instagram && <a className="btn btn-ghost" style={{ padding: '.8rem 1.2rem', fontSize: '.88rem' }} href={SITE.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <p className="container-x" style={{ paddingBottom: '4rem', fontSize: '.85rem', color: 'var(--text-secondary)' }}>{CONCEPT_NOTICE} Enquiries submitted here are not delivered until email delivery is authorised and configured.</p>
      <style>{`dd a{color:var(--primary);font-weight:600;text-decoration:none;border-bottom:1px solid var(--accent)} dd a:hover{color:var(--accent)}`}</style>
    </>
  )
}
const dt: React.CSSProperties = { font: '600 .72rem var(--font-body)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-secondary)' }
const dd: React.CSSProperties = { margin: '.35rem 0 0', font: '600 1.05rem var(--font-display)' }
