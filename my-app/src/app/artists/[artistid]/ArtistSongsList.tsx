"use client";
import { useAudioPlayer } from '@/Context/AudioPlayerProvider';
// import { useLikes } from '@/Context/LikesContext';
import { useUserInfos } from '@/Context/UserInfosContext';
import { ArtistProps, SongTypes } from '@/lib/GlobalTypes';
import { Heart, Pause, Play, User } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function ArtistSongsList({ Artist_Details, Artist_Songs }: { Artist_Details: ArtistProps; Artist_Songs: SongTypes[]; }) {
    const { ToggleAudioPlayer, setCurrentPlaylist, currentPlaylist, isPlaying, currentSong, PlayArtistPlaylist, playContextId } = useAudioPlayer();
    // const { HandleToggleLikes } = useLikes();
    // const { user } = useUserInfos();
    const contextID = `artist-${Artist_Details.id}`;
    const isActivePlaylist = playContextId === contextID && isPlaying;

    // const [songsLikes, setSongsLikes] = useState(
    //     Artist_Songs.map(song => ({
    //         id: song.id,
    //         likesCount: song.song_likes,
    //         isLiked: false
    //     }))
    // );

    // // بعد ما page render → نقرأ pendingLikes
    // useEffect(() => {
    //     const pendingLikes = JSON.parse(localStorage.getItem("pendingLikes") || "[]");
    //     setSongsLikes(prev =>
    //         prev.map(song => {
    //         const pending = pendingLikes.find((l: any) => l.songId === song.id);
    //         if(pending) {
    //             return {
    //             ...song,
    //             likesCount: Math.max(song.likesCount + (pending.like ? 1 : -1), 0),
    //             isLiked: pending.like
    //             }
    //         }
    //         return song;
    //         })
    //     );
    // }, []);

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
                    <button
                        onClick={() => {
                            PlayArtistPlaylist(contextID, Artist_Songs);
                        }}
                        className='cursor-pointer flex items-center gap-1.5 py-1 bg-white hover:bg-white/80 text-neutral-900 text-sm font-semibold px-6 rounded-full'
                    >
                        {isActivePlaylist ? (
                            <span className='flex items-center gap-1'>
                                <Pause 
                                    size={14} 
                                    className='fill-current'
                                /> Pause
                            </span>
                        ) : (
                            <span className='flex items-center gap-1'>
                                <Play 
                                    size={14} 
                                    className='fill-current'
                                /> Play
                            </span>
                        )}
                    </button>
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

                    const [likesCount, setLikesCount] = useState<number>(song.song_likes);
                    const [isLiked, setIsLiked] = useState(false);

                    const isActivePlaylist = currentPlaylist.find((s) => s.id === song.id);
                    const IsSongActive = currentSong?.id === song?.id;
                    
                    useEffect(() => {
                        // read pending likes from localStorage
                        const pendingLikes = JSON.parse(localStorage.getItem("pendingLikes") || "[]");
                        const songPending = pendingLikes.find((l: any) => l.songId === song.id);
                        if(songPending) {
                            setLikesCount(prev => Math.max(prev + (songPending.like ? 1 : -1), 0));
                        }
                        }, []);

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
                                    // onClick={() => {
                                    //     if(email === "") return;
                                    //     setIsLiked(!isLiked);
                                    //     setLikesCount(prev => Math.max(prev + (!isLiked ? 1 : -1), 0));
                                    //     HandleToggleLikes(song.id, !isLiked, likesCount, Artist_Details.id);
                                    // }}
                                    className='cursor-pointer flex items-center gap-1.5 text-xs'
                                >
                                    <Heart size={20} className={isLiked ? "fill-current" : "text-white"}/> {likesCount}
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
