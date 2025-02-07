import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    console.error('SIGNING_SECRET is missing in environment variables.')
    return new Response('Error: Missing SIGNING_SECRET', { status: 500 })
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = headers() 
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, return error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing Svix headers')
    return new Response('Error: Missing Svix headers', { status: 400 })
  }

  // Get body
  let payload
  try {
    payload = await req.json()
  } catch (err) {
    console.error('Error parsing JSON:', err)
    return new Response('Error: Invalid JSON', { status: 400 })
  }

  const body = JSON.stringify(payload)

  let evt
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error: Verification failed', { status: 400 })
  }

  const { id } = evt.data
  const eventType = evt.type

  console.log(`✅ Received webhook - ID: ${id}, Type: ${eventType}`)
  console.log('Payload:', payload)

  // Handle specific event types
  if (eventType === 'user.created') {
    console.log('🆕 New User Created:', evt.data.id)
  }

  return new Response('Webhook received', { status: 200 })
}
