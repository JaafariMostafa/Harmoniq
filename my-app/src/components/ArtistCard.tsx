import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


type ArtistCardProps = {
    Artist_Profil: string;
    Artist_Name: string;
    Artist_Id: string;
}
export default function ArtistCard({ Artist_Name, Artist_Profil, Artist_Id }: ArtistCardProps) {
    return (
        <Link
            href={`/artists/${Artist_Id}`}
            className='group w-max text-center cursor-pointer hover:bg-neutral-800/60 p-1.5 rounded-2xl border border-transparent hover:border-neutral-800'
        >
            <div
                className='relative border-2 w-34 h-34 rounded-full overflow-hidden'
            >
                <Image
                    src={Artist_Profil || "Hero-Background.jpg"}
                    alt={Artist_Name}
                    fill
                    className='object-cover group-hover:scale-105 cursor-pointer transition-transform duration-300'
                    priority
                    quality={100}
                />
            </div>
            <span
                className='flex flex-col -space-y-0.5 text-center mt-1.5'
            >
                <h1
                className='font-semibold text-center text-lg cursor-pointer'
            >
                {Artist_Name}
            </h1>
            <p
                className='text-neutral-500 font-semibold text-sm'
            >
                Artist
            </p>
            </span>
        </Link>
    )
}
