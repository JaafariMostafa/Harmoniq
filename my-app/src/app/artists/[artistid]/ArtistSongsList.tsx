"use client";
import { useAudioPlayer } from '@/Context/AudioPlayerProvider';
import { ArtistProps, SongTypes } from '@/lib/GlobalTypes';
import { Heart, Pause, Play, User } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react'

export default function ArtistSongsList({ Artist_Details, Artist_Songs }: { Artist_Details: ArtistProps; Artist_Songs: SongTypes[]; }) {
    const { ToggleAudioPlayer, setCurrentPlaylist, currentPlaylist, isPlaying, currentSong, playNextSong } = useAudioPlayer();

    useEffect(() => {
        setCurrentPlaylist(Artist_Songs)
    },[Artist_Details.id])

    const isActivePlaylist = currentPlaylist.find((s) => s.id === currentSong?.id);
    return (
        <div>
            {/* --- Artist Profile Header --- */}
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
                        {isActivePlaylist && isPlaying ? (
                            <button
                                onClick={() => {
                                    ToggleAudioPlayer(Artist_Songs[0]);
                                }}
                                className='cursor-pointer flex items-center gap-1.5 py-1 bg-white hover:bg-white/80 text-neutral-900 text-sm font-semibold px-6 rounded-full'
                            >
                                <Pause size={14} className='fill-current'/> Pause
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    ToggleAudioPlayer(Artist_Songs[0]);
                                }}
                                className='cursor-pointer flex items-center gap-1.5 py-1 bg-white hover:bg-white/80 text-neutral-900 text-sm font-semibold px-6 rounded-full'
                            >
                                <Play size={14} className='fill-current'/> Play
                            </button>
                        )}
                        <button
                            className='hover:bg-neutral-800/80 cursor-pointer text-sm border py-1 px-6 rounded-full'
                        >
                            Follow
                        </button>
                    </div>
                </div>
            </div>
            {/* --- Divider --- */}
            
            <span className='flex h-px w-full bg-neutral-800'/>
            
            {/* --- Artist Profile Body --- */}

            <ul
                className='w-full flex flex-col justify-center gap-1 items-center mt-6'
            >
                {Artist_Songs.length > 0 ? Artist_Songs.map((song, idx) => {
                    const isActivePlaylist = currentPlaylist.find((s) => s.id === song.id);
                    const IsSongActive = currentPlaylist.find((s) => s.id === song?.id);
                    
                    const isActiveSong = (songUrl: string) => 
                        currentSong?.song_audio_url.trim().toLowerCase() === songUrl.trim().toLowerCase() && isPlaying;
                    return (
                        <li
                            key={idx}
                            className={`w-full flex items-center gap-3 justify-between p-1 border-y 
                                ${IsSongActive ? "border-neutral-800/80 bg-neutral-900" : "hover:bg-neutral-900 border-transparent hover:border-neutral-800/80"}`}
                        >
                            <div
                                className='flex items-center gap-3'
                            >
                                <div
                                    className='relative w-12 h-12 rounded-lg border overflow-hidden'
                                >
                                    <Image
                                        src={song.song_cover || "Hero-Background.jpg"}
                                        alt={song.song_name}
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                                <span>
                                    <h1
                                        className='font-semibold'
                                    >
                                        {song.song_name}
                                    </h1>
                                    <p
                                        className='flex items-center gap-1 text-xs text-neutral-500 italic'
                                    >
                                        <User size={14} className='fill-current'/> {song.song_owner}
                                    </p>
                                </span>
                            </div>
                            <div
                                className='flex items-center gap-3'
                            >
                                <button
                                    className='cursor-pointer'
                                >
                                    <Heart size={20} className='fill-current'/>
                                </button>
                                <button
                                    onClick={() => {
                                        ToggleAudioPlayer(song)
                                        !isActivePlaylist && setCurrentPlaylist(Artist_Songs);
                                    }}
                                    className='group border rounded-full p-1 cursor-pointer hover:text-white/50'
                                >
                                    {isActiveSong(song.song_audio_url) ? 
                                        <Pause 
                                            size={20} 
                                            className='fill-current group-hover:text-white/60 group-hover:fill-white/60'
                                        />
                                            :
                                            <Play 
                                            size={20} 
                                            className='fill-current group-hover:text-white/60 group-hover:fill-white/60'
                                        />}
                                </button>
                            </div>
                        </li>
                    )
                }) : (
                    <span
                        className='w-full text-sm text-neutral-600 text-center italic'
                    >
                        No songs found
                    </span>
                )}
            </ul>
        </div>
  )
}
