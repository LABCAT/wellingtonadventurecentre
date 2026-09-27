import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/**
 * Enables Next.js Draft Mode for live / shareable previews, then
 * redirects to the requested frontend path.
 */
export async function GET(request: NextRequest): Promise<Response> {
  const secret = process.env.PREVIEW_SECRET
  const { searchParams } = new URL(request.url)

  if (!secret || searchParams.get('secret') !== secret) {
    return new Response('Missing or invalid preview secret', { status: 401 })
  }

  const path = searchParams.get('path') || '/';
  (await draftMode()).enable()
  redirect(path)
}
