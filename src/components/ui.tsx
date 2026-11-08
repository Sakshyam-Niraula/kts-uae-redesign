import { motion, type HTMLMotionProps } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { SITE } from '../data/site'

/* ---------- Reveal ---------- */
export function Reveal({ children, delay = 0, y = 28, className, ...rest }: { children: ReactNode; delay?: number; y?: number; className?: string } & Omit<HTMLMotionProps<'div'>, 'children'>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Animated heading (word-by-word) ---------- */
export function SplitHeading({ text, className, as: Tag = 'h2', delay = 0 }: { text: string; className?: string; as?: 'h1' | 'h2'; delay?: number }) {
  const MotionTag = motion[Tag]
  return (
    <MotionTag className={className} aria-label={text.replace(/\n/g, ' ')} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ staggerChildren: 0.07, delayChildren: delay }}>
      {text.split('\n').map((line, li) => (
        <span key={li} style={{ display: 'block' }} aria-hidden>
          {line.split(' ').map((w, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '.08em' }}>
              <motion.span
                style={{ display: 'inline-block', marginRight: '.28em' }}
                variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
                transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  )
}

/* ---------- SEO ---------- */
export function SEO({ title, description, path, jsonLd }: { title: string; description: string; path: string; jsonLd?: object }) {
  const url = SITE.url + (path === '/' ? '' : path)
  const full = path === '/' ? title : `${title} | KTS UAE`
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url || SITE.url + '/'} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="KTS – Kantipur Technical Services" />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url || SITE.url + '/'} />
      <meta property="og:image" content={`${SITE.url}/og.svg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE.url}/og.svg`} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}

/* ---------- Logo ---------- */
// Wordmark placeholder: the official logo file could not be retrieved. Replace with the supplied asset.
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" aria-label="KTS – Kantipur Technical Services, home" style={{ display: 'inline-flex', alignItems: 'center', gap: '.7rem', textDecoration: 'none' }}>
      <svg width="38" height="38" viewBox="0 0 64 64" aria-hidden>
        <rect width="64" height="64" rx="15" fill={light ? 'rgba(255,255,255,.12)' : '#172B36'} stroke={light ? 'rgba(255,255,255,.3)' : 'none'} />
        <path d="M18 14v36M18 33l18-19M24 31l18 19" stroke="#00A896" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ font: '800 1.25rem var(--font-display)', letterSpacing: '.04em', color: light ? '#fff' : 'var(--primary)' }}>KTS</span>
        <span style={{ font: '500 .62rem var(--font-body)', letterSpacing: '.18em', textTransform: 'uppercase', color: light ? 'rgba(255,255,255,.7)' : 'var(--text-secondary)', marginTop: 4 }}>Kantipur Technical Services</span>
      </span>
    </Link>
  )
}

export const Arrow = () => (
  <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/* ---------- Architectural placeholder art ---------- */
// Original vector artwork used where no verified photography is available.
export function Art({ variant = 'blue', className, label }: { variant?: 'blue' | 'red' | 'hero' | 'neutral'; className?: string; label?: string }) {
  const id = `g-${variant}`
  return (
    <svg className={className} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f1e27" />
          <stop offset="1" stopColor={variant === 'red' ? '#24404d' : '#1b3643'} />
        </linearGradient>
        <linearGradient id={id + 'a'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#00A896" stopOpacity="0" />
          <stop offset="1" stopColor="#00A896" stopOpacity=".38" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#${id})`} />
      {variant === 'blue' && (
        <g fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="1.5">
          {[...Array(9)].map((_, i) => <circle key={i} cx="560" cy="280" r={40 + i * 42} strokeOpacity={0.34 - i * 0.03} />)}
          <path d="M0 400H800M0 300H420M120 0V600M360 0V600" strokeOpacity=".1" />
          <circle cx="560" cy="280" r="6" fill="#00A896" stroke="none" />
          <path d="M560 280L690 190" stroke="#00A896" strokeOpacity=".9" strokeWidth="2" />
          <circle cx="690" cy="190" r="5" fill="#00A896" stroke="none" />
        </g>
      )}
      {variant === 'red' && (
        <g>
          {[[80, 260, 120, 340], [220, 180, 140, 420], [380, 120, 150, 480], [550, 210, 120, 390], [690, 290, 90, 310]].map(([x, y, w, h], i) => (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} fill="#fff" fillOpacity={0.05 + i * 0.015} stroke="#fff" strokeOpacity=".25" />
              {[...Array(Math.floor(h / 48))].map((_, r) => <line key={r} x1={x} x2={x + w} y1={y + 30 + r * 48} y2={y + 30 + r * 48} stroke="#fff" strokeOpacity=".12" />)}
              <line x1={x + w / 2} x2={x + w / 2} y1={y} y2={y + h} stroke="#fff" strokeOpacity=".12" />
            </g>
          ))}
          <rect y="470" width="800" height="130" fill={`url(#${id}a)`} />
        </g>
      )}
      {variant === 'hero' && (
        <g>
          {[[470, 170, 110, 430], [590, 90, 130, 510], [730, 230, 90, 370], [350, 280, 100, 320]].map(([x, y, w, h], i) => (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} fill="#fff" fillOpacity={0.04 + i * 0.01} stroke="#fff" strokeOpacity=".2" />
              {[...Array(Math.floor(h / 40))].map((_, r) => <line key={r} x1={x} x2={x + w} y1={y + 24 + r * 40} y2={y + 24 + r * 40} stroke="#fff" strokeOpacity=".1" />)}
            </g>
          ))}
          <rect y="400" width="800" height="200" fill={`url(#${id}a)`} />
        </g>
      )}
      {variant === 'neutral' && (
        <g fill="none" stroke="#fff" strokeOpacity=".16">
          <path d="M0 450L800 150M0 520L800 220M0 380L800 80" />
          <rect x="260" y="150" width="280" height="300" strokeOpacity=".28" />
          <path d="M260 150L540 450M540 150L260 450" strokeOpacity=".1" />
        </g>
      )}
    </svg>
  )
}

export function PageHero({ eyebrow, title, text, variant = 'neutral' }: { eyebrow: string; title: string; text: string; variant?: 'blue' | 'red' | 'neutral' }) {
  return (
    <section className="hero-bg" style={{ position: 'relative', overflow: 'hidden', paddingBlock: 'clamp(8rem, 16vw, 12rem) clamp(3.5rem, 7vw, 6rem)', color: '#fff' }}>
      <div className="grid-lines" style={{ position: 'absolute', inset: 0 }} aria-hidden />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.55 }} aria-hidden><Art variant={variant} /></div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #172B36 20%, rgba(23,43,54,.55) 70%, rgba(23,43,54,.25))' }} aria-hidden />
      <div className="container-x" style={{ position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="h-display" style={{ marginTop: '1.25rem', maxWidth: '16ch' }}>{title}</h1>
          <p style={{ marginTop: '1.5rem', maxWidth: '58ch', fontSize: '1.15rem', lineHeight: 1.7, color: 'rgba(255,255,255,.78)' }}>{text}</p>
        </motion.div>
      </div>
    </section>
  )
}
