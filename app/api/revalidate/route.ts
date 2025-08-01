// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Get the webhook secret from environment variables
const secret = process.env.SANITY_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{ _type: string, slug?: { current: string }}>(
      req,
      secret,
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 })
    }

    // Revalidate the page based on the document type
    const path = body.slug ? `/posts/${body.slug.current}` : '/'
    revalidatePath(path)

    // Also revalidate the homepage on any post change
    revalidatePath('/')

    return NextResponse.json({ revalidated: true, now: Date.now(), path })
  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 })
  }
}