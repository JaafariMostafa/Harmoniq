import { getArtistByID } from '@/lib/getArtistByID';
import Image from 'next/image';
import React from 'react'

export default async function page({ params }: { params: Promise<{ artistid: string; }> }) {
    const resolvedParams = await params;
    const Artist_ID = parseInt(resolvedParams?.artistid);

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
            hello
        </div>
    </div>
  )
}
