import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SITE, messengerLink, waLink } from '../data/site'

const WaIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.1 8.1 0 1 1 6.92 3.84Zm4.45-6.05c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12s-.63.79-.77.95c-.14.16-.28.18-.52.06a6.6 6.6 0 0 1-1.94-1.2 7.3 7.3 0 0 1-1.35-1.68c-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.4-.55-.41h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.1 3.64.57.25 1.02.4 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" /></svg>
)
const MsgIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.9 1.45 5.48 3.72 7.17V22l3.4-1.87c.9.25 1.86.39 2.88.39 5.52 0 10-4.14 10-9.27S17.52 2 12 2Zm1.04 12.49-2.55-2.72-4.98 2.72 5.48-5.82 2.61 2.72 4.92-2.72-5.48 5.82Z" /></svg>
)

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const msg = messengerLink()
  const circle: React.CSSProperties = { width: 56, height: 56, borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#fff', border: 0, cursor: 'pointer', boxShadow: '0 14px 34px -10px rgba(0,0,0,.45)', textDecoration: 'none', transition: 'transform .3s' }

  return (
    <div style={{ position: 'fixed', right: 'max(1rem, env(safe-area-inset-right))', bottom: 'max(1rem, env(safe-area-inset-bottom))', zIndex: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '.7rem' }}>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} className="glass" style={{ padding: '1rem', width: 'min(290px, calc(100vw - 2rem))', background: 'rgba(255,255,255,.9)' }}>
            <p style={{ font: '700 .95rem var(--font-display)' }}>Talk to KTS</p>
            <p style={{ fontSize: '.82rem', color: 'var(--text-secondary)', margin: '.3rem 0 .9rem' }}>Message us directly on WhatsApp.</p>
            <div style={{ display: 'grid', gap: '.5rem' }}>
              {SITE.phones.map((p) => (
                <a key={p.wa} className="btn btn-primary" style={{ padding: '.75rem 1rem', fontSize: '.88rem', justifyContent: 'flex-start' }} href={waLink(p.wa)} target="_blank" rel="noopener noreferrer">
                  <WaIcon /> {p.display}
                </a>
              ))}
              {msg && (
                <a className="btn btn-outline" style={{ padding: '.75rem 1rem', fontSize: '.88rem', justifyContent: 'flex-start' }} href={msg} target="_blank" rel="noopener noreferrer"><MsgIcon /> Messenger</a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        aria-label={open ? 'Close contact options' : 'Contact us on WhatsApp'} aria-expanded={open} onClick={() => setOpen((v) => !v)}
        style={{ ...circle, background: '#00A896' }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')} onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
      >
        {open ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg> : <WaIcon />}
      </button>
    </div>
  )
}
