import { Link } from 'react-router-dom'
import { CONCEPT_NOTICE, DIVISION_LINKS, NAV, SITE, messengerLink, waLink } from '../data/site'
import { Logo } from './ui'

export default function Footer() {
  const socials = [
    { label: 'WhatsApp', href: waLink() },
    SITE.social.facebook && { label: 'Facebook', href: SITE.social.facebook },
    messengerLink() && { label: 'Messenger', href: messengerLink() },
    SITE.social.instagram && { label: 'Instagram', href: SITE.social.instagram },
  ].filter(Boolean) as { label: string; href: string }[]

  const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '.7rem' }
  return (
    <footer className="hero-bg" style={{ color: 'rgba(255,255,255,.75)', paddingTop: '5rem' }}>
      <div className="container-x" style={{ display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))' }}>
        <div style={{ ...col, gap: '1.2rem', maxWidth: 320 }}>
          <Logo light />
          <p style={{ fontSize: '.92rem', lineHeight: 1.7 }}>Integrated technology, infrastructure, construction and interior solutions across the UAE. Established {SITE.founded}.</p>
        </div>
        <nav aria-label="Footer" style={col}>
          <h3 style={footH}>Navigate</h3>
          {NAV.map((n) => <Link key={n.to} to={n.to} className="foot-link">{n.label}</Link>)}
        </nav>
        <div style={col}>
          <h3 style={footH}>Divisions</h3>
          {DIVISION_LINKS.map((d) => <Link key={d.to} to={d.to} className="foot-link">{d.label}<small style={{ display: 'block', opacity: .6 }}>{d.sub}</small></Link>)}
        </div>
        <div style={col}>
          <h3 style={footH}>Contact</h3>
          <p style={{ fontSize: '.92rem', lineHeight: 1.6 }}>{SITE.address}</p>
          <a className="foot-link" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          {SITE.phones.map((p) => <a key={p.tel} className="foot-link" href={`tel:${p.tel}`}>{p.display}</a>)}
          <p style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '.4rem' }}>
            {socials.map((s) => <a key={s.label} className="foot-link" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
          </p>
        </div>
      </div>
      <div className="container-x" style={{ marginTop: '3.5rem', padding: '1.6rem 0', borderTop: '1px solid rgba(255,255,255,.12)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.75rem', fontSize: '.82rem' }}>
        <span>© {new Date().getFullYear()} KTS – Kantipur Technical Services. All rights reserved.</span>
        <span style={{ opacity: .75 }}>{CONCEPT_NOTICE}</span>
      </div>
      <style>{`.foot-link{color:rgba(255,255,255,.75);text-decoration:none;font-size:.92rem;transition:color .25s,transform .25s;width:fit-content}.foot-link:hover{color:var(--accent);transform:translateX(3px)}`}</style>
    </footer>
  )
}
const footH: React.CSSProperties = { font: '700 .8rem var(--font-body)', letterSpacing: '.16em', textTransform: 'uppercase', color: '#fff', marginBottom: '.4rem' }
