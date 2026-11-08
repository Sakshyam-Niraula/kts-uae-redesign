import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Arrow, Art, Reveal, SEO, SplitHeading } from '../components/ui'
import { ContactCTA, Parallax, ProjectCard } from '../components/sections'
import { BLUE_GROUPS, PROJECTS, RED_GROUPS, SITE, TESTIMONIALS } from '../data/site'

const ld = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'KTS – Kantipur Technical Services',
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phones[0].tel,
  foundingDate: String(SITE.founded),
  areaServed: 'AE',
  address: { '@type': 'PostalAddress', streetAddress: 'Office 203, Al Daghaya Building, Deira', addressLocality: 'Dubai', addressCountry: 'AE' },
}

export default function Home() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 700], [0, 120])
  const heroO = useTransform(scrollY, [0, 500], [1, 0.2])

  const divisions = [
    { to: '/division-blue', v: 'blue' as const, tag: 'Division Blue', title: 'Technology & Infrastructure', text: 'We harness technology to construct intelligent and interconnected solutions, tailored to meet the dynamic needs of the UAE.', count: BLUE_GROUPS.flatMap((g) => g.services).length },
    { to: '/division-red', v: 'red' as const, tag: 'Division Red', title: 'Construction & Interior Design', text: 'Construction and interior design delivered with craftsmanship, precision and a close eye for architectural detail.', count: RED_GROUPS.flatMap((g) => g.services).length },
  ]

  return (
    <>
      <SEO path="/" title="KTS – Kantipur Technical Services | Technology, Construction & Interiors in the UAE" description="KTS delivers integrated technology, infrastructure, construction and interior solutions across the UAE through Division Blue and Division Red." jsonLd={ld} />

      {/* HERO */}
      <section className="hero-bg" style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden', color: '#fff' }}>
        <motion.div style={{ position: 'absolute', inset: 0, y: heroY, opacity: 0.7 }} aria-hidden><Art variant="hero" /></motion.div>
        <div className="grid-lines" style={{ position: 'absolute', inset: 0 }} aria-hidden />
        <div className="orb orb-anim" style={{ width: 420, height: 420, left: '-8%', top: '12%', background: 'rgba(0,168,150,.28)' }} aria-hidden />
        <div className="orb orb-anim" style={{ width: 320, height: 320, right: '6%', bottom: '8%', background: 'rgba(0,168,150,.2)', animationDelay: '-6s' }} aria-hidden />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(23,43,54,.92) 25%, rgba(23,43,54,.35))' }} aria-hidden />

        <motion.div className="container-x" style={{ position: 'relative', paddingBlock: '8rem 5rem', opacity: heroO }}>
          <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>Dubai · United Arab Emirates</motion.span>
          <h1 className="h-display" style={{ marginTop: '1.4rem' }} aria-label="Engineering Innovation. Designing Possibilities.">
            {['Engineering Innovation.', 'Designing Possibilities.'].map((line, li) => (
              <span key={li} style={{ display: 'block', overflow: 'hidden', paddingBottom: '.1em' }} aria-hidden>
                <motion.span style={{ display: 'block', color: li === 1 ? 'var(--accent)' : undefined, whiteSpace: 'nowrap' }} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 1.1 + li * 0.15, ease: [0.2, 0.8, 0.2, 1] }}>{line}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.9 }} style={{ marginTop: '1.8rem', maxWidth: '56ch', fontSize: 'clamp(1.05rem,1.5vw,1.25rem)', lineHeight: 1.7, color: 'rgba(255,255,255,.78)' }}>
            Where intelligent technology meets exceptional design. KTS delivers integrated technology, infrastructure, construction and interior solutions across the UAE.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.9 }} style={{ display: 'flex', gap: '.9rem', flexWrap: 'wrap', marginTop: '2.4rem' }}>
            <a href="#divisions" className="btn btn-primary">Explore Our Solutions <Arrow /></a>
            <Link to="/contact" className="btn btn-ghost">Let's Discuss Your Project</Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2, duration: 1 }} className="glass-dark hero-float" style={{ position: 'absolute', right: 0, bottom: '2.5rem', padding: '1.2rem 1.5rem', display: 'grid', gap: '.25rem', minWidth: 210 }}>
            <span style={{ font: '600 .7rem var(--font-body)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>Established</span>
            <span style={{ font: '800 2.2rem var(--font-display)' }}>{SITE.founded}</span>
            <span style={{ fontSize: '.85rem', opacity: .7 }}>Two specialised divisions</span>
          </motion.div>
        </motion.div>
        <style>{`@media (max-width: 900px){.hero-float{display:none!important}} @media (max-width:520px){.h-display span span{white-space:normal!important}}`}</style>
      </section>

      {/* DIVISIONS */}
      <section id="divisions" className="section">
        <div className="container-x">
          <Reveal><span className="eyebrow">Our Divisions</span></Reveal>
          <SplitHeading className="h-section" text={'Two divisions.\nOne standard of excellence.'} />
          <div style={{ display: 'grid', gap: '1.5rem', marginTop: '3.5rem', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))' }}>
            {divisions.map((d, i) => (
              <Reveal key={d.to} delay={i * 0.12}>
                <Link to={d.to} className="div-card" style={{ position: 'relative', display: 'block', minHeight: 520, borderRadius: '1.75rem', overflow: 'hidden', textDecoration: 'none', color: '#fff', background: 'var(--primary)' }}>
                  <div className="div-img" style={{ position: 'absolute', inset: 0, transition: 'transform 1s cubic-bezier(.2,.8,.2,1)' }}><Art variant={d.v} /></div>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(23,43,54,.1) 20%, rgba(15,30,39,.92))' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.6rem' }}>
                    <span className="glass-dark" style={{ alignSelf: 'flex-start', padding: '.5rem .95rem', borderRadius: 999, font: '600 .72rem var(--font-body)', letterSpacing: '.14em', textTransform: 'uppercase' }}>{d.tag}</span>
                    <div className="glass-dark" style={{ padding: '1.6rem' }}>
                      <h3 style={{ font: '800 1.7rem var(--font-display)' }}>{d.title}</h3>
                      <p style={{ marginTop: '.8rem', lineHeight: 1.65, color: 'rgba(255,255,255,.78)', fontSize: '.97rem' }}>{d.text}</p>
                      <div style={{ marginTop: '1.3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="btn btn-primary" style={{ padding: '.8rem 1.3rem', fontSize: '.88rem' }}>Explore Division <Arrow /></span>
                        <span style={{ fontSize: '.82rem', opacity: .7 }}>{d.count} services</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <style>{`.div-card:hover .div-img{transform:scale(1.07)} .div-card{box-shadow:0 30px 60px -30px rgba(23,43,54,.6);transition:box-shadow .5s}.div-card:hover{box-shadow:0 36px 70px -26px rgba(0,168,150,.45)}`}</style>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container-x">
          <Reveal><span className="eyebrow">Services</span></Reveal>
          <SplitHeading className="h-section" text={'Solutions across\nthe full building lifecycle.'} />
          <div style={{ display: 'grid', gap: '1.1rem', marginTop: '3rem', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))' }}>
            {[...BLUE_GROUPS.map((g) => ({ ...g, to: '/division-blue', d: 'Blue' })), ...RED_GROUPS.map((g) => ({ ...g, to: '/division-red', d: 'Red' }))].map((g, i) => (
              <Reveal key={g.title} delay={(i % 4) * 0.07}>
                <Link to={g.to} className="glass glass-hover noise-card" style={{ display: 'block', padding: '1.6rem', height: '100%', boxSizing: 'border-box', textDecoration: 'none', color: 'inherit', background: 'var(--background)' }}>
                  <span style={{ font: '600 .7rem var(--font-body)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>Division {g.d}</span>
                  <h3 style={{ font: '700 1.2rem var(--font-display)', marginTop: '.7rem' }}>{g.title}</h3>
                  <p style={{ marginTop: '.6rem', fontSize: '.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{g.blurb}</p>
                  <p style={{ marginTop: '1rem', fontSize: '.8rem', fontWeight: 600 }}>{g.services.length} service{g.services.length > 1 ? 's' : ''}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section">
        <div className="container-x">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div><Reveal><span className="eyebrow">Selected Projects</span></Reveal><SplitHeading className="h-section" text={'Work delivered\nacross the UAE.'} /></div>
            <Reveal><Link to="/projects" className="btn btn-outline">All projects <Arrow /></Link></Reveal>
          </div>
          <div style={{ display: 'grid', gap: '1.2rem', marginTop: '3rem', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,340px),1fr))' }}>
            {[...PROJECTS.filter((x) => x.division === 'blue').slice(0, 3), ...PROJECTS.filter((x) => x.division === 'red').slice(0, 3)].map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ABOUT + WHY */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container-x" style={{ display: 'grid', gap: '4rem', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', alignItems: 'center' }}>
          <Parallax style={{ borderRadius: '1.75rem', aspectRatio: '4/5', background: 'var(--primary)' }}><Art variant="neutral" /></Parallax>
          <div>
            <Reveal><span className="eyebrow">About KTS</span></Reveal>
            <SplitHeading className="h-section" text={'Technical and design\nprowess since ' + SITE.founded + '.'} />
            <Reveal delay={0.1}><p className="lead" style={{ marginTop: '1.5rem' }}>KTS is a dynamic and innovative company at the forefront of technology-driven solutions and transformative designs, based in Dubai. Its integration into the UAE's progressive ecosystem reflects a dedication to reshaping environments and advancing development.</p></Reveal>
            <Reveal delay={0.2}>
              <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0 0', display: 'grid', gap: '1rem' }}>
                {[['Client-centric', 'Each project is aligned with the client’s unique vision in the Emirates.'], ['Technology-driven', 'Intelligent, interconnected solutions through Division Blue.'], ['Design-led', 'Construction and interior excellence through Division Red.']].map(([t, d]) => (
                  <li key={t} style={{ display: 'flex', gap: '1rem' }}>
                    <span aria-hidden style={{ flex: 'none', width: 10, height: 10, marginTop: '.5rem', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 0 5px rgba(0,168,150,.18)' }} />
                    <span><b style={{ fontFamily: 'var(--font-display)' }}>{t}.</b> <span style={{ color: 'var(--text-secondary)' }}>{d}</span></span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.3}><Link to="/about" className="btn btn-outline" style={{ marginTop: '2.2rem' }}>More about KTS <Arrow /></Link></Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container-x">
          <Reveal><span className="eyebrow">Client Testimonials</span></Reveal>
          <SplitHeading className="h-section" text={'What clients say.'} />
          <div style={{ display: 'grid', gap: '1.2rem', marginTop: '2.5rem', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))' }}>
            {TESTIMONIALS.filter((t) => t.quote).map((t, i) => (
              <Reveal key={t.author} delay={i * 0.08}>
                <figure className="glass noise-card" style={{ margin: 0, padding: '2rem', height: '100%', boxSizing: 'border-box' }}>
                  <span aria-hidden style={{ font: '800 3rem/1 var(--font-display)', color: 'var(--accent)' }}>“</span>
                  <blockquote style={{ margin: 0, font: '700 1.3rem/1.4 var(--font-display)' }}>{t.quote}</blockquote>
                  <figcaption style={{ marginTop: '1.2rem', color: 'var(--text-secondary)', fontSize: '.9rem' }}>{t.author} – {t.company}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '.85rem', color: 'var(--text-secondary)' }}>Also from: {TESTIMONIALS.filter((t) => !t.quote).map((t) => t.company).join(', ')}.</p>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
