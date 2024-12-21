import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import {createUser,  deletedUser, updateUser} from '@/lib/actions/user.actions'
import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
  const eventType = evt.type
  
  if(eventType === 'user.created') {
    const {id, email_addresses, image_url, first_name, last_name, username} = evt.data

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      firstName: first_name!,
      lastName: last_name!,
      photo: image_url
    }

    const newUser = await createUser(user)
    const client = await clerkClient();
    if(newUser){
      await client.users.updateUserMetadata(newUser.id, {
        publicMetadata: {
          userId: newUser.id
        }
      })
    }
    return NextResponse.json({ message: 'User created',  user: newUser}, {status: 200})
    }
    if (eventType === 'user.updated') {
      const {id, image_url, first_name, last_name, username } = evt.data
  
      const user = {
        firstName: first_name!,
        lastName: last_name!,
        username: username!,
        photo: image_url,
      }
  
      const updatedUser = await updateUser(id, user)
  
      return NextResponse.json({ message: 'OK', user: updatedUser })
    }
  
    if (eventType === 'user.deleted') {
      const { id } = evt.data
  
      const deleteUser = await deletedUser(id!)
  
      return NextResponse.json({ message: 'OK', user: deleteUser })
    }
  return new Response('Webhook received', { status: 200 })
}
