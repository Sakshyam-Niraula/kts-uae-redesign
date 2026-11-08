import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { handleContact } from './server/handleContact.ts'

// Serves /api/contact in `vite dev` / `vite preview` using the same handler as production.
function contactApi(env: Record<string, string>): Plugin {
  const mount = (server: { middlewares: { use: (p: string, fn: (...a: any[]) => void) => void } }): void => {
    server.middlewares.use('/api/contact', async (req: any, res: any) => {
      const chunks: Buffer[] = []
      for await (const c of req) chunks.push(c)
      const body = chunks.length ? Buffer.concat(chunks) : undefined
      const request = new Request('http://localhost/api/contact', {
        method: req.method,
        headers: req.headers as Record<string, string>,
        body: req.method === 'GET' || req.method === 'HEAD' ? undefined : body,
      })
      const r = await handleContact(request, env)
      res.statusCode = r.status
      r.headers.forEach((v: string, k: string) => res.setHeader(k, v))
      res.end(Buffer.from(await r.arrayBuffer()))
    })
  }
  return { name: 'kts-contact-api', configureServer: mount, configurePreviewServer: mount }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), contactApi(env)],
    build: {
      rollupOptions: {
        output: { manualChunks: (id: string) => (id.includes('framer-motion') || id.includes('/motion') ? 'motion' : id.includes('node_modules/react') ? 'vendor' : undefined) },
      },
    },
  }
})
