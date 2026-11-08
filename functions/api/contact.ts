import { handleContact, type ContactEnv } from '../../server/handleContact.ts'

// Cloudflare Pages Function -> POST /api/contact
export const onRequest = (ctx: { request: Request; env: ContactEnv }) => handleContact(ctx.request, ctx.env)
