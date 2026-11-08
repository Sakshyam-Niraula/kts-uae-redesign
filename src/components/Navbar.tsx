import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { DIVISION_LINKS, NAV } from '../data/site'
import { Logo } from './ui'

export default function Navbar({ heroDark }: { heroDark: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dd, setDd] = useState(false)
  const [mDd, setMDd] = useState(false)
  const loc = useLocation()
  const ddRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { setOpen(false); setDd(false); setMDd(false) }, [loc.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setDd(false) } }
    const click = (e: MouseEvent) => { if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDd(false) }
    window.addEventListener('keydown', esc); window.addEventListener('mousedown', click)
    return () => { window.removeEventListener('keydown', esc); window.removeEventListener('mousedown', click) }
  }, [open])

  const light = heroDark && !scrolled && !open
  const linkStyle = (active: boolean): React.CSSProperties => ({
    position: 'relative', padding: '.5rem .15rem', font: '500 .95rem var(--font-body)', textDecoration: 'none',
    color: light ? (active ? '#fff' : 'rgba(255,255,255,.8)') : active ? 'var(--primary)' : 'var(--text-secondary)',
  })
  const Underline = ({ active }: { active: boolean }) => (
    <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: 'var(--accent)', borderRadius: 2, transform: `scaleX(${active ? 1 : 0})`, transformOrigin: 'left', transition: 'transform .35s' }} />
  )
  const servicesActive = loc.pathname.startsWith('/division')

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: scrolled ? '.6rem 0' : '1.1rem 0', transition: 'padding .4s' }}>
      <div className="container-x">
        <div
          className={scrolled || open ? 'glass' : ''}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: scrolled ? '.65rem 1.2rem' : '.2rem 0', borderRadius: 999, transition: 'padding .4s, background .4s', ...(scrolled ? { background: 'rgba(255,255,255,.72)' } : {}) }}
        >
          <Logo light={light} />

          <nav aria-label="Primary" className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <NavLink to="/" end style={({ isActive }) => linkStyle(isActive)}>{({ isActive }) => <>Home<Underline active={isActive} /></>}</NavLink>
            <NavLink to="/about" style={({ isActive }) => linkStyle(isActive)}>{({ isActive }) => <>About<Underline active={isActive} /></>}</NavLink>

            <div ref={ddRef} style={{ position: 'relative' }} onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
              <button
                aria-haspopup="menu" aria-expanded={dd} onClick={() => setDd((v) => !v)}
                style={{ ...linkStyle(servicesActive), background: 'none', border: 0, cursor: 'pointer', display: 'inline-flex', gap: '.35rem', alignItems: 'center' }}
              >
                Services
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: dd ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }} aria-hidden><path d="M6 9l6 6 6-6" /></svg>
                <Underline active={servicesActive || dd} />
              </button>
              <AnimatePresence>
                {dd && (
                  <motion.div
                    role="menu" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.22 }}
                    style={{ position: 'absolute', top: '100%', left: '50%', translate: '-50% 0', paddingTop: '.9rem', width: 300 }}
                  >
                    <div className="glass" style={{ padding: '.5rem', background: 'rgba(255,255,255,.88)' }}>
                      {DIVISION_LINKS.map((d) => (
                        <Link key={d.to} to={d.to} role="menuitem" style={{ display: 'block', padding: '.9rem 1rem', borderRadius: '.8rem', textDecoration: 'none', color: 'var(--primary)' }} className="dd-item">
                          <span style={{ display: 'block', font: '700 .95rem var(--font-display)' }}>{d.label}</span>
                          <span style={{ fontSize: '.8rem', color: 'var(--text-secondary)' }}>{d.sub}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV.slice(2).map((n) => (
              <NavLink key={n.to} to={n.to} style={({ isActive }) => linkStyle(isActive)}>{({ isActive }) => <>{n.label}<Underline active={isActive} /></>}</NavLink>
            ))}
            <Link to="/contact" className="btn btn-primary" style={{ padding: '.75rem 1.25rem', fontSize: '.88rem' }}>Get a Consultation</Link>
          </nav>

          <button
            className="nav-burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}
            style={{ display: 'none', width: 44, height: 44, borderRadius: 14, border: `1px solid ${light ? 'rgba(255,255,255,.35)' : 'var(--border)'}`, background: 'transparent', color: light ? '#fff' : 'var(--primary)', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'rgba(23,43,54,.96)', paddingTop: '6rem', overflowY: 'auto' }}
          >
            <nav aria-label="Mobile" className="container-x" style={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
              {[{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }].map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link to={n.to} style={mLink}>{n.label}</Link>
                </motion.div>
              ))}
              <div>
                <button onClick={() => setMDd((v) => !v)} aria-expanded={mDd} style={{ ...mLink, width: '100%', background: 'none', border: 0, borderBottom: '1px solid rgba(255,255,255,.12)', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}>
                  Services <span aria-hidden>{mDd ? '−' : '+'}</span>
                </button>
                {mDd && DIVISION_LINKS.map((d) => (
                  <Link key={d.to} to={d.to} style={{ ...mLink, fontSize: '1.05rem', paddingLeft: '1rem', color: 'rgba(255,255,255,.8)' }}>{d.label} <small style={{ opacity: .6 }}>· {d.sub}</small></Link>
                ))}
              </div>
              {NAV.slice(2).map((n) => <Link key={n.to} to={n.to} style={mLink}>{n.label}</Link>)}
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Get a Consultation</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .dd-item:hover{background:rgba(0,168,150,.1)}
        @media (max-width: 960px){ .nav-desktop{display:none!important} .nav-burger{display:inline-flex!important} }
      `}</style>
    </header>
  )
}

const mLink: React.CSSProperties = { display: 'block', padding: '1rem 0', font: '700 1.5rem var(--font-display)', color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,.12)' }
