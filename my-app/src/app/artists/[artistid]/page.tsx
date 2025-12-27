import { getArtistByID } from '@/lib/getArtistByID';
import { Play } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

export default async function page({ params }: { params: Promise<{ artistid: string; }> }) {
    const resolvedParams = await params;
    const Artist_ID = resolvedParams?.artistid;

    const Artist_Details = await getArtistByID(Artist_ID);

    return (
    <div
        className='relative w-full min-h-screen z-20'
    >
        <div
            className='sticky top-20 w-full h-140 opacity-5 inset-0 left-0 top-0 z-10'
        >
            <div className='absolute top-0 left-0 bg-gradient-to-b z-11 from-neutral-900 to-transparence w-full h-20'/>
            <div className='absolute top-0 right-0 bg-gradient-to-l z-11 from-neutral-900 to-transparence h-full w-20'/>
            <Image
                src={Artist_Details?.artist_profil || "Hero-Background.jpg"}
                alt={Artist_Details.artist_name}
                fill
                className='object-cover'
                priority
            />
            <div className='absolute bottom-0 left-0 bg-gradient-to-t from-neutral-900 to-transparence w-full h-20'/>
            <div className='absolute bottom-0 left-0 bg-gradient-to-r from-neutral-900 to-transparence h-full w-20'/>
        </div>

        <div
            className='absolute w-full z-30 top-0 left-0'
        >
            <div
                className='py-6 mt-6 flex items-end gap-3'
            >
                <div
                    className='relative w-34 h-34 rounded-full overflow-hidden border-2'
                >
                    <Image
                        src={Artist_Details.artist_profil}
                        fill
                        alt={Artist_Details.artist_name}
                        className='object-cover'
                    />
                </div>
                <div>
                    <p
                        className='text-neutral-500 font-semibold text-sm'
                    >
                        Artist
                    </p>
                    <h1
                        className='text-2xl font-light'
                    >
                        {Artist_Details.artist_name}
                    </h1>
                    <div
                        className='flex items-center gap-1.5 mt-3'
                    >
                        <button
                            className='cursor-pointer flex items-center gap-1.5 py-1 bg-white hover:bg-white/80 text-neutral-900 text-sm font-semibold px-6 rounded-full'
                        >
                            <Play size={14} className='fill-current'/> Play
                        </button>
                        <button
                            className='hover:bg-neutral-800/80 cursor-pointer text-sm border py-1 px-6 rounded-full'
                        >
                            Follow
                        </button>
                    </div>
                </div>
            </div>
            <span className='flex h-px w-full bg-neutral-800'/>
        </div>
    </div>
  )
}
