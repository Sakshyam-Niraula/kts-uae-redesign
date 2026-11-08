// Single source of truth for company content.
// VERIFIED = taken from the official ktsuae.com snippet or supplied in the project brief.
// Do not add claims (stats, clients, certifications) that are not verified.

const env = import.meta.env

export const SITE = {
  name: 'KTS',
  legalName: 'Kantipur Technical Services',
  founded: 2016, // VERIFIED (ktsuae.com About Us)
  email: 'info@ktsuae.com', // VERIFIED
  address: 'Office 203, Al Daghaya Building, Deira, Dubai, UAE', // VERIFIED (supplied by client contact)
  phones: [
    { display: '+971 52 472 9353', tel: '+971524729353', wa: '971524729353' }, // VERIFIED
    { display: '+971 52 592 6927', tel: '+971525926927', wa: '971525926927' }, // VERIFIED
  ],
  url: ((env.VITE_SITE_URL as string) || 'https://kts-uae-demo.pages.dev').replace(/\/$/, ''),
  turnstileSiteKey: (env.VITE_TURNSTILE_SITE_KEY as string) || '',
  // UNVERIFIED accounts: configure via .env — blank entries are hidden from the UI.
  social: {
    facebook: (env.VITE_FACEBOOK_URL as string) || '',
    messenger: (env.VITE_MESSENGER_USERNAME as string) || '', // https://m.me/<username>
    instagram: (env.VITE_INSTAGRAM_URL as string) || '',
  },
}

export const MISSION = 'To deliver exceptional, technology-driven solutions and transformative designs that exceed expectations. KTS strives to continuously integrate cutting-edge technology and creative design.'
export const VISION = 'To be the leading innovator in technology and design within the UAE, transforming the landscape with pioneering solutions that blend modernity with the rich heritage of the Emirates.'
export const VALUES = ['Innovation', 'Excellence', 'Client-Centricity', 'Integrity', 'Sustainability', 'Collaboration']
export const CONCEPT_NOTICE = 'Independent redesign concept — not the official KTS website until approved by KTS.'

export const WA_MESSAGE =
  'Hello KTS team, I found your website and would like to discuss a project. Could you please get in touch with me?'
export const waLink = (n = SITE.phones[0].wa, text = WA_MESSAGE) => `https://wa.me/${n}?text=${encodeURIComponent(text)}`
export const messengerLink = () => (SITE.social.messenger ? `https://m.me/${SITE.social.messenger}` : '')

export interface Service { name: string; desc: string }
export interface ServiceGroup { title: string; blurb: string; services: Service[] }

export const BLUE_GROUPS: ServiceGroup[] = [
  {
    title: 'Surveillance & Security',
    blurb: 'Systems that watch, control and protect people, property and perimeters.',
    services: [
      { name: 'CCTV Surveillance', desc: 'Camera systems for continuous monitoring and recording of premises.' },
      { name: 'Mobile Surveillance', desc: 'Flexible camera solutions for vehicles, temporary sites and remote locations.' },
      { name: 'Central Command and Control', desc: 'Unified rooms that bring cameras, alarms and access data into one view.' },
      { name: 'Fire and Security Alarms', desc: 'Detection and alerting systems for fire, intrusion and emergencies.' },
      { name: 'Access Control', desc: 'Managed entry points that decide who can go where, and when.' },
      { name: 'Biometric Systems', desc: 'Fingerprint and identity-based authentication for entry and attendance.' },
      { name: 'Parking Barriers', desc: 'Automated barriers and flap gates for vehicle and pedestrian flow.' },
    ],
  },
  {
    title: 'Audio, Voice & Display',
    blurb: 'Clear communication and information across buildings and campuses.',
    services: [
      { name: 'Public Address Systems', desc: 'Zoned announcement and paging systems for large or multi-area sites.' },
      { name: 'Indoor Sound Systems', desc: 'Background and presentation audio designed around the space.' },
      { name: 'IP Telephony', desc: 'Network-based telephone systems for modern business communication.' },
      { name: 'Digital Signage', desc: 'Screens and content platforms for wayfinding, promotion and information.' },
    ],
  },
  {
    title: 'Network & IT Infrastructure',
    blurb: 'The connected backbone every other system depends on.',
    services: [
      { name: 'WiFi Solutions', desc: 'Wireless coverage planned and deployed for homes, offices and venues.' },
      { name: 'Structured Cabling', desc: 'Organised copper and fibre cabling that supports reliable networks.' },
      { name: 'Networking Infrastructure', desc: 'Switching, routing and network equipment installation and setup.' },
      { name: 'IT Infrastructure', desc: 'Core hardware and systems that keep a business running.' },
    ],
  },
  {
    title: 'Smart Environments',
    blurb: 'Intelligent control for comfort, convenience and efficiency.',
    services: [
      { name: 'Home Automation and IoT', desc: 'Connected devices and controls for lighting, climate and daily routines.' },
    ],
  },
]

export const RED_GROUPS: ServiceGroup[] = [
  {
    title: 'Finishes & Surfaces',
    blurb: 'The surfaces people see and touch every day, finished with precision.',
    services: [
      { name: 'Building Paint Contracting', desc: 'Interior and exterior painting for residential and commercial buildings.' },
      { name: 'Wallpaper Installation', desc: 'Careful application of wall coverings for a clean, seamless result.' },
      { name: 'Decorative Concrete Finishing', desc: 'Textured and polished concrete surfaces with a refined architectural look.' },
      { name: 'Plaster Works', desc: 'Smooth, durable plaster for walls and ceilings.' },
      { name: 'Floor and Wall Tiling', desc: 'Precise tile layout and installation for floors and walls.' },
      { name: 'Wood Flooring', desc: 'Timber flooring installed and finished for warmth and longevity.' },
    ],
  },
  {
    title: 'Architectural & Joinery',
    blurb: 'Structural character and bespoke detail for interiors and façades.',
    services: [
      { name: 'Exterior Cladding', desc: 'Protective and decorative façade finishes for building exteriors.' },
      { name: 'False Ceilings', desc: 'Suspended ceilings that conceal services and shape interior space.' },
      { name: 'Carpentry', desc: 'Custom woodwork, partitions and fitted joinery.' },
      { name: 'Aluminum and Glass Work', desc: 'Windows, doors, partitions and glazing in aluminium and glass.' },
      { name: 'Specialty Lighting', desc: 'Lighting designed to set mood, highlight features and suit the space.' },
    ],
  },
  {
    title: 'Building Envelope & Care',
    blurb: 'Protecting, maintaining and landscaping the buildings we work on.',
    services: [
      { name: 'Roofing', desc: 'Roof installation and repair for lasting protection.' },
      { name: 'Waterproofing', desc: 'Moisture barriers for roofs, wet areas and below-grade spaces.' },
      { name: 'Building Cleaning', desc: 'Professional cleaning for completed works and ongoing upkeep.' },
      { name: 'Landscape Design', desc: 'Outdoor spaces planned and planted to complement the architecture.' },
    ],
  },
  {
    title: 'Mechanical & Electrical',
    blurb: 'Essential building services installed to a professional standard.',
    services: [
      { name: 'HVAC', desc: 'Heating, ventilation and air-conditioning installation.' },
      { name: 'Plumbing', desc: 'Water supply and drainage installations.' },
      { name: 'Electrical Installations', desc: 'Power distribution, wiring and fittings for buildings.' },
    ],
  },
]

export type Division = 'blue' | 'red'

export interface Project {
  slug: string
  title: string
  division: Division // ASSUMPTION: confirm with KTS (see README)
  image?: string // add real photo path (e.g. /projects/dehui.jpg) when supplied
  alt?: string
}

// Names only — no descriptions or photographs are invented. Add `image` when real assets are supplied.
export const PROJECTS: Project[] = [
  { slug: 'dehui-group-flex-barriers', title: 'Dehui Group Flex Barriers', division: 'blue' },
  { slug: 'tamou-cctv', title: 'Tamou CCTV', division: 'blue' },
  { slug: 'prince-group-flap-barriers', title: 'Prince Group Flap Barriers', division: 'blue' },
  { slug: 'infinity-group-flap-barriers', title: 'Infinity Group Flap Barriers', division: 'blue' },
  { slug: 'wooden-pergola-dubai', title: 'Wooden Pergola, Dubai', division: 'red' },
  { slug: 'steel-hand-railing-dubai', title: 'Steel Hand Railing Project, Dubai', division: 'red' },
  { slug: 'glass-railing-dubai', title: 'Glass Railing Project, Dubai', division: 'red' },
  { slug: 'mercedes-benz-showroom', title: 'Mercedes-Benz Showroom', division: 'red' },
  { slug: 'moors-and-saint-booth-interior', title: 'Moors & Saint Booth Interior', division: 'red' },
  { slug: 'jumeirah', title: 'Jumeirah', division: 'red' }, // no further details verified — none shown
]

// Seven testimonials exist on the official page. Only the text actually retrieved is shown;
// add the other six `quote` strings verbatim from https://ktsuae.com/testimonials/ and they render automatically.
export const TESTIMONIALS: { author: string; company: string; quote?: string }[] = [
  { author: 'Mr. Junaid', company: 'Qualident Dental Labs', quote: "We're beyond impressed with KTS's work at Qualident Dental Labs." },
  { author: 'Mr. Ahmed', company: 'Dubai Medical Equipment' },
  { author: 'Mr. Wael', company: 'Egyptian Consulate' },
  { author: 'Mr. Abdul Aziz', company: 'Tamou Group' },
  { author: 'Mr. Mustafa', company: 'Infinity Group' },
  { author: 'Mr. Weng', company: 'Dehui Group' },
  { author: 'Mr. Andrew', company: 'Prince Group' },
]

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]
export const DIVISION_LINKS = [
  { label: 'Division Blue', sub: 'Technology & Infrastructure', to: '/division-blue' },
  { label: 'Division Red', sub: 'Construction & Interior Design', to: '/division-red' },
]
