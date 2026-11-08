import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { PageHero, SEO } from '../components/ui'
import { ContactCTA, ProjectCard } from '../components/sections'
import { PROJECTS } from '../data/site'

const FILTERS = [{ id: 'all', label: 'All Projects' }, { id: 'blue', label: 'Division Blue' }, { id: 'red', label: 'Division Red' }] as const

export default function Projects() {
  const [f, setF] = useState<(typeof FILTERS)[number]['id']>('all')
  const list = PROJECTS.filter((p) => f === 'all' || p.division === f)
  return (
    <>
      <SEO path="/projects" title="Projects" description="Selected KTS projects across Division Blue (technology & infrastructure) and Division Red (construction & interior design) in the UAE." />
      <PageHero eyebrow="Projects" title="Selected work." text="A look at projects delivered by KTS across both divisions." />
      <section className="section">
        <div className="container-x">
          <LayoutGroup>
            <div role="tablist" aria-label="Filter projects" className="glass" style={{ display: 'inline-flex', gap: '.25rem', padding: '.35rem', borderRadius: 999, flexWrap: 'wrap' }}>
              {FILTERS.map((x) => (
                <button key={x.id} role="tab" aria-selected={f === x.id} onClick={() => setF(x.id)} style={{ position: 'relative', border: 0, background: 'none', padding: '.7rem 1.3rem', borderRadius: 999, cursor: 'pointer', font: '600 .88rem var(--font-body)', color: f === x.id ? '#fff' : 'var(--text-secondary)', transition: 'color .3s' }}>
                  {f === x.id && <motion.span layoutId="pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--primary)' }} />}
                  <span style={{ position: 'relative' }}>{x.label}</span>
                </button>
              ))}
            </div>
            <motion.div layout style={{ display: 'grid', gap: '1.2rem', marginTop: '2.5rem', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,340px),1fr))' }}>
              <AnimatePresence mode="popLayout">{list.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}</AnimatePresence>
            </motion.div>
          </LayoutGroup>
          <p style={{ marginTop: '2.5rem', fontSize: '.88rem', color: 'var(--text-secondary)' }}>Showing {list.length} project{list.length !== 1 ? 's' : ''}.</p>
        </div>
      </section>
      <ContactCTA />
    </>
  )
}
