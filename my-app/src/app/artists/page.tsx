import ArtistCard from '@/components/ArtistCard'
import { getArtistsPaginated } from '@/lib/getArtistsPaginated';
import Image from 'next/image';
import React from 'react'

export default async function page({ searchParams }: { searchParams?: { page?: string }; }) {
    const CurrentPage = searchParams?.page ? parseInt(searchParams?.page) : 1;
    const Artists_Data = await getArtistsPaginated(10, CurrentPage);

    return (
        <div
            className='w-full'
        >
            <h1
                className='text-3xl font-semibold my-6'
            >
                Top Artists
            </h1>
            <div
                className='w-full grid grid-cols-4 gap-3 mt-12 place-items-center'
            >
                {Artists_Data.length > 0 ? Artists_Data.map((artist, idx) => {
                    return (
                        <ArtistCard
                            key={idx}
                            Artist_Id={artist.id}
                            Artist_Name={artist.artist_name}
                            Artist_Profil={artist.artist_profil}
                        />
                    )
                }) : "No artists found"}
            </div>
        </div>
    )
}
