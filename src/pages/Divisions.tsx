import { PageHero, SEO } from '../components/ui'
import { ContactCTA, ServiceGroups } from '../components/sections'
import { BLUE_GROUPS, RED_GROUPS } from '../data/site'

export function DivisionBlue() {
  return (
    <>
      <SEO path="/division-blue" title="Division Blue – Technology & Infrastructure" description="Surveillance, access control, audio and communication, networking and IT infrastructure, and smart-building solutions from KTS Division Blue in the UAE." />
      <PageHero variant="blue" eyebrow="Division Blue" title="Technology & Infrastructure." text="We harness technology to construct intelligent and interconnected solutions, tailored to meet the dynamic needs of the UAE." />
      <section className="section"><div className="container-x"><ServiceGroups groups={BLUE_GROUPS} tone="blue" /></div></section>
      <ContactCTA />
    </>
  )
}

export function DivisionRed() {
  return (
    <>
      <SEO path="/division-red" title="Division Red – Construction & Interior Design" description="Finishes, joinery, building envelope, and mechanical and electrical services from KTS Division Red: construction and interior design in the UAE." />
      <PageHero variant="red" eyebrow="Division Red" title="Construction & Interior Design." text="Craftsmanship, precision and design excellence, from surface finishes to the services that keep a building running." />
      <section className="section"><div className="container-x"><ServiceGroups groups={RED_GROUPS} tone="red" /></div></section>
      <ContactCTA />
    </>
  )
}
