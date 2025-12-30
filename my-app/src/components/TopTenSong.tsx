"use client";
import { useAudioPlayer } from '@/Context/AudioPlayerProvider';
import { useSongDurations } from '@/lib/getSongDuration';
import { SongTypes } from '@/lib/GlobalTypes'
import { Heart, Pause, Play } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ImageWithLoader from './ImageWithLoader';

export default function TopTenSong({ TopTenSongs }: { TopTenSongs: SongTypes[]; }) {
//   const [durations, setDurations] = useState<{ [key: string]: number }>({});
//   useEffect(() => {
//     TopTenSongs.forEach(async (song) => {
//         try {
//             const duration = await getSongDuration(song.song_audio_url);
//             setDurations((prev) => ({ ...prev, [song.song_audio_url as string]: duration as number }));
//         }catch (err){
//             console.log((err as { message: string }).message)
//         }
//     })
//   },[])
const { formatDuration } = useSongDurations(TopTenSongs);

    const { ToggleAudioPlayer, isPlaying, currentSong, setCurrentPlaylist, currentPlaylist } = useAudioPlayer();
    
    const HandleShowToast = () => {
        toast.success("hello this is me 'react-hot-toast'");
    }

    return (
    <div>
        {/* --- TopTen Header --- */}
        <div
            className='w-full flex my-6 items-end'
        >
            <div className='w-full flex flex-col items-start gap-1'>
                <span
                    className='font-semibold text-md text-neutral-500'
                >
                    Global
                </span>
                <h1
                    className='text-3xl font-semibold'
                >
                    Top 10
                </h1>
            </div>
            <Link
                href="/topten"
                className='text-sm text-neutral-400 hover:text-neutral-200 cursor-pointer text-nowrap'
            >
                See all
            </Link>
        </div>
        {/* --- TopTen Song List --- */}
        <div>
            <table
                className='w-full border-collapse'
            >
                <thead>
                    <tr>
                        <th className='px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>#</th>
                        <th className='px-6 py-3 text-start text-xs font-semibold text-gray-400 uppercase tracking-wider'>Song Name</th>
                        <th className='px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>Artist</th>
                        <th className='px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>Time</th>
                        <th className='px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>Like</th>
                        <th className='px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>-</th>
                    </tr>
                </thead>
                <tbody>
                    {TopTenSongs.length > 0 ? TopTenSongs.map((song, idx) => {
                        const isSongPlaying = (songUrl: string) =>
                            currentSong?.song_audio_url?.trim().toLowerCase() === songUrl.trim().toLowerCase() && isPlaying;
                        const isActivePlaylist = currentPlaylist.find((s) => s.id === song.id);
                        return (
                            <tr
                                key={idx}
                                className={`hover:bg-neutral-800/40
                                    ${currentSong?.song_audio_url?.toLowerCase() === song.song_audio_url.toLowerCase() ? "bg-neutral-800/40" : ""}`}
                            >
                                <td
                                    className='text-center py-1.5 text-xs'
                                >
                                    {idx + 1}
                                </td>
                                <td className='text-center py-1.5'>
                                    <div
                                        className='flex justify-start items-center gap-3'
                                    >
                                        <div
                                            className='relative w-10 h-10 rounded-lg border border-neutral-800 overflow-hidden'
                                        >
                                            <ImageWithLoader
                                                src={song.song_cover}
                                                alt={song.song_name}
                                                fill
                                                className='object-cover'
                                            />
                                        </div>
                                        <h1
                                            title={song.song_name}
                                            className='font-semibold text-sm truncate max-w-[120px] text-white text-md'
                                        >
                                            {song.song_name}
                                        </h1>
                                    </div>
                                </td>
                                <td
                                    className='text-center py-1.5'
                                >
                                    <h1
                                        title={song.song_owner}
                                        className='text-xs bg-gradient-to-r from-white via-white hover:to-white to-transparent truncate bg-clip-text text-transparent'
                                    >
                                        {song.song_owner.length > 20 ? `${song.song_owner.slice(0, 20)}...` : song.song_owner}
                                    </h1>
                                </td>
                                <td
                                    className='text-center py-1.5 text-xs'
                                >
                                    <div
                                        className='w-full flex justify-center'
                                    >
                                        {formatDuration(song.song_audio_url)}
                                        {/* <span className='flex w-full max-w-[70px] bg-neutral-800 border border-neutral-700/40 py-3 rounded-lg animate-pulse'/> */}
                                    </div>
                                </td>
                                <td
                                    className='text-center py-1.5'
                                >
                                    <h2
                                        className='flex items-center justify-center gap-1.5 text-xs'
                                    >
                                        <Heart className='fill-current' size={16}/> {song.song_likes || 0}
                                    </h2>
                                </td>
                                <td
                                    className='text-center py-1.5'
                                >
                                    <div
                                        className='w-full flex justify-center'
                                    >
                                        <button 
                                            onClick={() => {
                                                ToggleAudioPlayer(song)
                                                !isActivePlaylist && setCurrentPlaylist(TopTenSongs);
                                            }}
                                            className='cursor-pointer rounded-full p-1 hover:bg-neutral-700/60 flex items-center justify-center'
                                        >
                                            {isSongPlaying(song.song_audio_url) ? <Pause size={18} /> : <Play size={18}/>}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }) : "No songs found"}
                </tbody>
            </table>
        </div>
    </div>
  )
}
