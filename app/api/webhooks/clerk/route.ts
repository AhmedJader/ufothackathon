export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
  }

  const startTime = Date.now();

  // Step 1: Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Step 2: Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', { status: 400 });
  }

  // Step 3: Parse the request body
  const payloadStart = Date.now();
  const payload = await req.json();
  const body = JSON.stringify(payload);
  console.log(`Parsing request body took ${Date.now() - payloadStart}ms`);

  let evt: WebhookEvent;

  // Step 4: Verify payload with headers
  const verificationStart = Date.now();
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
    console.log(`Payload verification took ${Date.now() - verificationStart}ms`);
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', { status: 400 });
  }

  // Step 5: Process the payload
  const processingStart = Date.now();
  const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

  const user = {
    clerkId: id,
    email: email_addresses[0]?.email_address || '',
    username: username || null,
    photo: image_url || '',
    firstName: first_name || '',
    lastName: last_name || '',
  };

  console.log('User object created:', user);
  console.log(`Payload processing took ${Date.now() - processingStart}ms`);

  // Step 6: Save to MongoDB
  const dbStart = Date.now();
  const newUser = await createUser(user);
  console.log(`Database operation took ${Date.now() - dbStart}ms`);

  if (newUser) {
    const clerkUpdateStart = Date.now();
    const client = await clerkClient();
    await client.users.updateUser(id, {
      publicMetadata: {
        userId: newUser._id,
      },
    });
    console.log(`Clerk metadata update took ${Date.now() - clerkUpdateStart}ms`);
  }

  console.log(`Total operation time: ${Date.now() - startTime}ms`);

  return new Response('Webhook received', { status: 200 });
}
