'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createClient } from '@/utils/supabase/client' // Your client-side supabase helper
import { createSong } from '../actions/upload'
import toast from 'react-hot-toast'
import { Loader2, UploadCloud, Music, Image as ImageIcon } from 'lucide-react'

// Helper to get duration from audio file
const getAudioDuration = (file: File): Promise<number> => {
  return new Promise((resolve) => {
    const audio = new Audio(URL.createObjectURL(file))
    audio.onloadedmetadata = () => {
      resolve(Math.round(audio.duration))
    }
  })
}

interface UploadFormProps {
  artistId: string // Passed from parent (context or selection)
}

type FormValues = {
  title: string
  audioFile: FileList
  imageFile: FileList
}

export default function SongUploadForm({ artistId }: UploadFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0) // Simplified progress
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
  const supabase = createClient()

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)
      const audioFile = data.audioFile[0]
      const imageFile = data.imageFile[0]

      if (!audioFile) {
        toast.error('Audio file is required')
        return
      }

      // 1. Calculate Duration
      const duration = await getAudioDuration(audioFile)

      // 2. Upload Audio to Storage
      // Path format: artist_id/timestamp-filename
      const audioPath = `${artistId}/${Date.now()}-${audioFile.name}`
      const { error: audioError } = await supabase.storage
        .from('songs') // Ensure this bucket exists in Supabase
        .upload(audioPath, audioFile)

      if (audioError) throw new Error(`Audio upload failed: ${audioError.message}`)

      // 3. Upload Image to Storage (Optional)
      let imagePath = null
      if (imageFile) {
        imagePath = `${artistId}/${Date.now()}-${imageFile.name}`
        const { error: imageError } = await supabase.storage
          .from('images') // Ensure this bucket exists in Supabase
          .upload(imagePath, imageFile)
        
        if (imageError) throw new Error(`Image upload failed: ${imageError.message}`)
      }

      // 4. Submit Metadata to Server Action
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('artist_id', artistId)
      formData.append('audio_path', audioPath)
      if (imagePath) formData.append('image_path', imagePath)
      formData.append('duration', duration.toString())

      await createSong(formData)

      toast.success('Song uploaded successfully!')
      reset()
      
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto p-6 bg-neutral-900 rounded-lg border border-neutral-800">
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">Song Title</label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-3 text-white focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Enter song title"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Audio Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-200 flex items-center gap-2">
            <Music size={16} /> Audio File
          </label>
          <div className="relative group">
            <input
              type="file"
              accept=".mp3,.wav,.ogg"
              {...register('audioFile', { required: true })}
              className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neutral-700 file:text-white hover:file:bg-neutral-600"
            />
          </div>
          <p className="text-xs text-neutral-500">MP3, WAV up to 10MB</p>
        </div>

        {/* Image Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-200 flex items-center gap-2">
            <ImageIcon size={16} /> Cover Art
          </label>
          <input
            type="file"
            accept="image/*"
            {...register('imageFile')}
            className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neutral-700 file:text-white hover:file:bg-neutral-600"
          />
          <p className="text-xs text-neutral-500">Square JPG/PNG (Optional)</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" /> Uploading...
          </>
        ) : (
          <>
            <UploadCloud /> Upload Song
          </>
        )}
      </button>
    </form>
  )
}