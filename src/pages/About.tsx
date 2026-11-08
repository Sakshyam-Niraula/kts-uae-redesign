import { Reveal, SEO, PageHero, Art, SplitHeading } from '../components/ui'
import { ContactCTA, Parallax } from '../components/sections'
import { MISSION, SITE, VALUES, VISION } from '../data/site'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <SEO path="/about" title="About KTS" description={`KTS is a Dubai-based company delivering technology-driven solutions and transformative designs across the UAE since ${SITE.founded}.`} />
      <PageHero eyebrow="About KTS" title="Technical and design prowess." text={`A symbol of technical and design capability in Dubai since ${SITE.founded}, shaping environments across the UAE.`} />

      <section className="section">
        <div className="container-x" style={{ display: 'grid', gap: '4rem', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', alignItems: 'center' }}>
          <div>
            <Reveal><span className="eyebrow">Who we are</span></Reveal>
            <SplitHeading className="h-section" text={'Dynamic, innovative,\nclient-centric.'} />
            <Reveal delay={0.1}><p className="lead" style={{ marginTop: '1.5rem' }}>KTS is a dynamic and innovative company at the forefront of technology-driven solutions and transformative designs. Nestled in Dubai’s landscape of architectural wonders and digital innovation, KTS has been a symbol of technical and design prowess since its inception in {SITE.founded}.</p></Reveal>
            <Reveal delay={0.2}><p className="lead" style={{ marginTop: '1.2rem' }}>Its integration into the UAE’s progressive ecosystem reflects a dedication to reshaping environments and advancing development. At KTS, client-centricity comes first, ensuring each project aligns with a client’s unique vision in the Emirates.</p></Reveal>
          </div>
          <Parallax style={{ borderRadius: '1.75rem', aspectRatio: '4/3', background: 'var(--primary)' }}><Art variant="neutral" /></Parallax>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container-x">
          <div style={{ display: 'grid', gap: '1.4rem', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))' }}>
            {[['Our Mission', MISSION], ['Our Vision', VISION]].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div className="glass noise-card" style={{ padding: '2.2rem', height: '100%', boxSizing: 'border-box', background: 'var(--background)' }}>
                  <span className="eyebrow">{t}</span>
                  <p style={{ marginTop: '1.2rem', font: '600 1.2rem/1.6 var(--font-display)' }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><h2 className="h-section" style={{ marginTop: '4rem' }}>Core values</h2></Reveal>
          <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0 0', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))' }}>
            {VALUES.map((v, i) => (
              <Reveal key={v} delay={i * 0.06}>
                <li className="glass glass-hover" style={{ padding: '1.4rem', font: '700 1.05rem var(--font-display)', listStyle: 'none' }}>
                  <span aria-hidden style={{ display: 'block', color: 'var(--accent)', fontSize: '.8rem', marginBottom: '.5rem' }}>{String(i + 1).padStart(2, '0')}</span>{v}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal><span className="eyebrow">Two divisions</span></Reveal>
          <SplitHeading className="h-section" text={'One company,\ntwo areas of expertise.'} />
          <div style={{ display: 'grid', gap: '1.4rem', marginTop: '3rem', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))' }}>
            {[{ to: '/division-blue', t: 'Division Blue', s: 'Technology & Infrastructure', d: 'Harnessing technology to construct intelligent and interconnected solutions tailored to the dynamic needs of the UAE.' }, { to: '/division-red', t: 'Division Red', s: 'Construction & Interior Design', d: 'Pioneering construction and interior design with a focus on craftsmanship, precision and detail.' }].map((d, i) => (
              <Reveal key={d.to} delay={i * 0.1}>
                <Link to={d.to} className="glass glass-hover noise-card" style={{ display: 'block', padding: '2rem', textDecoration: 'none', color: 'inherit', background: 'var(--background)' }}>
                  <span style={{ font: '600 .72rem var(--font-body)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>{d.s}</span>
                  <h3 style={{ font: '800 1.7rem var(--font-display)', margin: '.6rem 0' }}>{d.t}</h3>
                  <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)' }}>{d.d}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x" style={{ display: 'grid', gap: '1.2rem', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))' }}>
          {[['Established', String(SITE.founded)], ['Headquartered', 'Dubai, UAE'], ['Email', SITE.email], ['Phone', SITE.phones[0].display], ['Office', SITE.address]].map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.07}>
              <div className="glass" style={{ padding: '1.6rem' }}>
                <p style={{ font: '600 .72rem var(--font-body)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{k}</p>
                <p style={{ font: '700 1.25rem var(--font-display)', marginTop: '.6rem', wordBreak: 'break-word' }}>{v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  )
}
