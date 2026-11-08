// Generates sitemap.xml + robots.txt from VITE_SITE_URL before each build.
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
let url = process.env.VITE_SITE_URL
if (!url && existsSync('.env')) url = /^VITE_SITE_URL=(.+)$/m.exec(readFileSync('.env', 'utf8'))?.[1]?.trim()
url = (url || 'https://kts-uae-demo.pages.dev').replace(/\/$/, '')
const pages = ['/', '/about', '/division-blue', '/division-red', '/projects', '/contact']
const today = new Date().toISOString().slice(0, 10)
writeFileSync('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${url}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`)
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${url}/sitemap.xml\n`)
console.log('SEO files generated for', url)
