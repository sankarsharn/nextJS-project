import { Webhook } from 'svix';
import { headers } from 'next/headers';

export async function POST(req) {
  console.log('🔍 Webhook request received!'); // Log to verify request reaches here

  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  if (!SIGNING_SECRET) {
    console.error('SIGNING_SECRET is missing');
    return new Response('Error: Missing SIGNING_SECRET', { status: 500 });
  }

  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing Svix headers');
    return new Response('Error: Missing Svix headers', { status: 400 });
  }

  let payload;
  try {
    payload = await req.json();
    console.log('📦 Webhook payload:', payload);
  } catch (err) {
    console.error('Error parsing JSON:', err);
    return new Response('Error: Invalid JSON', { status: 400 });
  }

  let evt;
  try {
    evt = wh.verify(JSON.stringify(payload), {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Verification failed:', err);
    return new Response('Error: Verification failed', { status: 400 });
  }

  console.log(`✅ Webhook processed: ${evt.type}`);

  return new Response('Webhook received', { status: 200 });
}
