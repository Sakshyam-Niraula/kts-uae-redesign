import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Arrow, Art, Reveal, SplitHeading } from './ui'
import type { Project, ServiceGroup } from '../data/site'

export function ServiceGroups({ groups, tone }: { groups: ServiceGroup[]; tone: 'blue' | 'red' }) {
  return (
    <div style={{ display: 'grid', gap: 'clamp(3.5rem,7vw,6rem)' }}>
      {groups.map((g, gi) => (
        <section key={g.title} aria-labelledby={`g-${tone}-${gi}`} style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'minmax(0,1fr)' }} className="svc-group">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.2rem', flexWrap: 'wrap' }}>
              <span style={{ font: '800 .9rem var(--font-display)', color: 'var(--accent)' }}>{String(gi + 1).padStart(2, '0')}</span>
              <h2 id={`g-${tone}-${gi}`} style={{ font: '800 clamp(1.5rem,2.6vw,2.1rem) var(--font-display)' }}>{g.title}</h2>
            </div>
            <p className="lead" style={{ marginTop: '.7rem' }}>{g.blurb}</p>
          </Reveal>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '1.1rem', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,260px),1fr))' }}>
            {g.services.map((s, i) => (
              <Reveal key={s.name} delay={Math.min(i, 5) * 0.06} y={20}>
                <li className="glass glass-hover noise-card" style={{ padding: '1.6rem', height: '100%', boxSizing: 'border-box', listStyle: 'none' }}>
                  <span aria-hidden style={{ display: 'block', width: 36, height: 3, borderRadius: 3, background: 'var(--accent)', marginBottom: '1.1rem' }} />
                  <h3 style={{ font: '700 1.1rem var(--font-display)', letterSpacing: '-.01em' }}>{s.name}</h3>
                  <p style={{ marginTop: '.6rem', fontSize: '.93rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{s.desc}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export function ProjectCard({ p, i = 0 }: { p: Project; i?: number }) {
  const variant = p.division === 'blue' ? 'blue' : 'red'
  return (
    <motion.article
      layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
      className="proj-card" style={{ position: 'relative', borderRadius: '1.25rem', overflow: 'hidden', aspectRatio: '4/3', background: 'var(--primary)', boxShadow: '0 24px 50px -28px rgba(23,43,54,.6)' }}
    >
      <div className="proj-img" style={{ position: 'absolute', inset: 0, transition: 'transform .9s cubic-bezier(.2,.8,.2,1)' }}>
        {p.image ? <img src={p.image} alt={p.alt ?? p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Art variant={variant} />}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(15,30,39,.92))' }} aria-hidden />
      <span className="glass-dark" style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '.4rem .8rem', borderRadius: 999, font: '600 .7rem var(--font-body)', letterSpacing: '.12em', textTransform: 'uppercase' }}>
        Division {variant === 'blue' ? 'Blue' : 'Red'}
      </span>
      <div className="proj-body" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '1.4rem', color: '#fff' }}>
        <h3 style={{ font: '700 1.25rem var(--font-display)' }}>{p.title}</h3>
        <Link to={`/division-${variant}`} className="proj-link" style={{ display: 'inline-flex', gap: '.4rem', alignItems: 'center', marginTop: '.6rem', color: 'var(--accent)', font: '600 .85rem var(--font-body)', textDecoration: 'none' }}>
          View division <Arrow />
        </Link>
      </div>
      <style>{`
        .proj-card:hover .proj-img{transform:scale(1.08)}
        .proj-link{opacity:0;transform:translateY(8px);transition:opacity .4s,transform .4s}
        .proj-card:hover .proj-link,.proj-card:focus-within .proj-link{opacity:1;transform:none}
        @media (hover:none){.proj-link{opacity:1;transform:none}}
      `}</style>
    </motion.article>
  )
}

export function ContactCTA() {
  return (
    <section className="section" style={{ paddingBottom: 'clamp(4rem,8vw,7rem)' }}>
      <div className="container-x">
        <Reveal>
          <div className="hero-bg" style={{ position: 'relative', overflow: 'hidden', borderRadius: '2rem', padding: 'clamp(2.5rem,6vw,5rem)', color: '#fff' }}>
            <div className="grid-lines" style={{ position: 'absolute', inset: 0 }} aria-hidden />
            <div className="orb orb-anim" style={{ width: 380, height: 380, right: -80, top: -120, background: 'rgba(0,168,150,.45)' }} aria-hidden />
            <div style={{ position: 'relative', maxWidth: 640 }}>
              <span className="eyebrow">Start a conversation</span>
              <h2 className="h-section" style={{ marginTop: '1rem' }}>Let's shape your next project together.</h2>
              <p style={{ marginTop: '1.2rem', fontSize: '1.08rem', lineHeight: 1.7, color: 'rgba(255,255,255,.75)' }}>Tell us about your building, site or idea. The KTS team will get back to you to discuss the right approach.</p>
              <div style={{ display: 'flex', gap: '.9rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                <Link to="/contact" className="btn btn-primary">Get a Consultation <Arrow /></Link>
                <Link to="/projects" className="btn btn-ghost">View projects</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Parallax({ children, amount = 60, className, style }: { children: React.ReactNode; amount?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount])
  return <div ref={ref} className={className} style={{ overflow: 'hidden', ...style }}><motion.div style={{ y, height: '120%', marginTop: '-10%' }}>{children}</motion.div></div>
}

export { SplitHeading }
