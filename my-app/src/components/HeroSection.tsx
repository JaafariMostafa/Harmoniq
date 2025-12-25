import { Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HeroSection() {
  return (
    <div>
        {/* --- Hero Header --- */}
        <div
            className='w-full flex my-6 items-end'
        >
            <div className='w-full flex flex-col items-start gap-1'>
                <span
                    className='font-semibold text-md text-neutral-500'
                >
                    Top
                </span>
                <h1
                    className='text-3xl font-semibold'
                >
                    Trending
                </h1>
            </div>
            <Link 
                href="/trending"
                className='text-sm text-neutral-400 hover:text-neutral-200 cursor-pointer text-nowrap'
            >
                See all
            </Link>
        </div>

        {/* --- Hero Section --- */}

        <div className="shadow-xl shadow-pink-900/10 w-full p-6 rounded-3xl bg-gradient-to-tr from-blue-900/50 via-pink-900 to-blue-900 overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-neutral-400 uppercase text-sm mb-1.5 text-md">
                    Playlist
                </h2>
                <h1 className="text-4xl bg-gradient-to-r from-blue-200 via-white to-pink-900 bg-clip-text text-transparent font-bold max-w-[30%]">
                    Top Song Of The Week
                </h1>
                <div
                    className='flex items-center gap-3 mt-6'
                >
                    <button
                        className='px-6 text-sm py-2 font-semibold cursor-pointer bg-white hover:bg-white/80 text-neutral-900 rounded-full flex items-center gap-1.5'
                    >
                        <Play size={14} className='fill-current' /> Play
                    </button>
                    <button
                        className='px-6 font-semibold cursor-pointer text-sm py-2 rounded-full bg-neutral-900 hover:bg-neutral-900/80'
                    >
                        View Play
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
