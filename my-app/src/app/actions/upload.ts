'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Schema for server-side validation
const UploadSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist_id: z.string().uuid(),
  audio_path: z.string().min(1),
  image_path: z.string().nullable(),
  duration: z.number().int().positive(),
})

export async function createSong(formData: FormData) {
  const supabase = await createClient()

  // 1. Auth Check
//   const { data: { user }, error: authError } = await supabase.auth.getUser()
//   if (authError || !user) {
//     throw new Error('Unauthorized')
//   }

  // 2. Parse Data
  const rawData = {
    title: formData.get('title'),
    artist_id: formData.get('artist_id'),
    audio_path: formData.get('audio_path'),
    image_path: formData.get('image_path') || null,
    duration: Number(formData.get('duration')),
  }

  const validatedData = UploadSchema.parse(rawData)

  // 3. Generate Slug (Simple implementation)
  const slug = validatedData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  // 4. Insert into DB
  const { error } = await supabase.from('songs').insert({
    title: validatedData.title,
    artist_id: validatedData.artist_id,
    slug: slug,
    audio_path: validatedData.audio_path,
    image_path: validatedData.image_path,
    duration: validatedData.duration,
    is_public: true 
  })

  if (error) {
    console.error('Database Error:', error)
    // Handle duplicate slug error specifically if needed
    if (error.code === '23505') { 
        throw new Error('A song with this title already exists for this artist.')
    }
    throw new Error('Failed to create song record')
  }

  revalidatePath(`/artist/${validatedData.artist_id}`)
  return { success: true }
}