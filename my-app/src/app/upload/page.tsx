import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import SongUploadForm from './SongUploadForm'

export default async function UploadPage() {
  const supabase = await createClient()

  // 1. Check Authentication
  const { data: { user } } = await supabase.auth.getUser()
//   if (!user) {
//     redirect('/login')
//   }

  // 2. Fetch Artist ID associated with this user
  // In a real app, you likely have a 'user_id' column in 'artists' 
  // or an 'artist_managers' table.
  // For this example, we assume we can find the artist via a join or specific query.
  
  // Example query: Find artist where the profile matches, or if artist has a user_id
  /* 
     const { data: artist } = await supabase
       .from('artists')
       .select('id')
       .eq('user_id', user.id) // Assuming you add user_id to artists
       .single()
  */

  // MOCK for demonstration:
  // We will assume the user IS the artist and we can find them, 
  // or we pass a hardcoded ID for now if the link isn't established in SQL yet.
  // In production, Ensure your SQL schema links Artists to Auth.Users.
  
  const artistId = "SOME_UUID_FROM_DB_QUERY" 

  if (!artistId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-neutral-400">
        <h1 className="text-2xl font-bold text-white mb-2">Artist Account Required</h1>
        <p>You must create an artist profile before uploading songs.</p>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Music</h1>
          <p className="text-neutral-400">Add new tracks to your artist profile.</p>
        </div>
        
        <SongUploadForm artistId={artistId} />
      </div>
    </div>
  )
}