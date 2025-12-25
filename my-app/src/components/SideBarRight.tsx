"use client"
import { ChevronDown, Play, SkipBack, SkipForward } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SideBarRight() {
  const pathname = usePathname();
  if(pathname?.startsWith('/auth/')) {
    return null;
  }
  return (
    <div className='w-1/4 h-screen overflow-auto p-6 flex-shrink-0'>
      {/* --- User Profile Section --- */}
      <div
        className='w-full flex items-center gap-3 justify-between py-1.5 px-3 
          cursor-pointer border border-neutral-900 hover:border-neutral-800 
          rounded-2xl bg-neutral-900/40 hover:bg-neutral-900'
      >
        <div
        className='flex items-center gap-3'
      >
        <div
          className='relative overflow-hidden border-2 border-transparent 
            ring ring-neutral-100 bg-neutral-900 w-12 h-12 rounded-full'
        >
          <Image
            src="/Hero-Background.jpg"
            alt=''
            fill
            className='object-cover'
            priority
          />
        </div>
          <span className='flex flex-col -space-y-0.5'>
            <h1 
              className='text-lg font-semibold text-white'
            >
              John Doe
            </h1>
            <p
              className='text-neutral-500 text-sm'
            >
              Free Account
            </p>
          </span>
        </div>

        <ChevronDown size={20}/>
      </div>

      <div className='w-full h-px bg-neutral-900 my-3'/>
      {/* --- Top Artists Section --- */}
      <div>
        {/* --- Top Artists Header */}
        <div
            className='w-full flex my-6 items-end'
        >
            <div className='w-full flex flex-col items-start'>
                <span
                    className='font-semibold text-md text-neutral-500'
                >
                    Top
                </span>
                <h1
                    className='text-2xl font-semibold'
                >
                    Trending
                </h1>
            </div>
            <Link
                href="/top-artists"
                className='text-sm text-neutral-400 hover:text-neutral-200 cursor-pointer text-nowrap'
            >
                See all
            </Link>
        </div>

        {/* --- Top Artists List --- */}
        <div
          className='flex flex-col gap-4'
        >
          {Array(4).fill(0).map((_, idx) => {
            return (
              <div
                key={idx}
                className='w-full flex items-center gap-3 justify-between'
              >
                <div
                  className='w-full flex items-center gap-3'
                >
                  <div
                    className='relative overflow-hidden border border-neutral-100 
                      bg-neutral-900 w-10 h-10 rounded-lg'
                  >
                    <Image
                      src="/Hero-Background.jpg"
                      alt=''
                      fill
                      className='object-cover'
                      priority
                    />
                  </div>
                  <span className='flex flex-col -space-y-0.5'>
                    <h1 
                      className='text-md font-semibold text-white'
                    >
                      Artist Name
                    </h1>
                    <p
                      className='text-neutral-500 text-sm'
                    >
                      1.2M Followers
                    </p>
                  </span>
                </div>
                <span
                  className='text-neutral-500'
                >
                  #{idx + 1}
                </span>
              </div>
            )
          })}
        </div>

        <div className="w-full h-px bg-neutral-900 my-3" />
        {/* --- Music Player --- */}
        <div
          className='relative overflow-hidden w-full h-54 bg-neutral-900/40 border border-neutral-900 rounded-xl mt-4'
        >
          <div
            className='relative inset-0 z-10 h-full flex flex-col justify-end p-6'
          >
            <Image
              src="/Hero-Background.jpg"
              alt=''
              fill
              className='object-cover opacity-30'
              priority
            />
          </div>

          <div
            className='absolute inset-0 z-20 flex items-end justify-center p-3'
          >
            <div className='w-full h-5/7 flex flex-col items-center justify-center rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/60 border border-neutral-900 hover:border-neutral-800/60'>
              <h1 className='text-white font-semibold'>Song Title</h1>
              <p className='text-neutral-600 text-sm'>Song Owner</p>
              <div
                className='w-full flex items-center justify-center mt-3 gap-3'
              >
                <button
                  className='cursor-pointer text-neutral-300 hover:text-white'
                >
                  <SkipBack size={20} className='fill-white' />
                </button>
                <button
                  className='border border-neutral-500 hover:border-white p-1.5 cursor-pointer rounded-full'
                >
                  <Play size={20} className='fill-white'/>
                </button>
                <button
                  className='cursor-pointer text-neutral-300 hover:text-white'
                >
                  <SkipForward size={20} className='fill-white' />
                </button>
              </div>
              <audio controls className="w-full">
                <source src="https://iyzmssnbulmbaqvkprxl.supabase.co/storage/v1/object/public/Audio/Lady%20Gaga,%20Bruno%20Mars%20-%20Die%20With%20A%20Smile%20(Official%20Music%20Video).mp3" type="audio/mpeg" />
              </audio>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
