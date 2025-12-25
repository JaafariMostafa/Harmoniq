import { Heart, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function TopTenSong() {
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
                        <th className='px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>Song Name</th>
                        <th className='px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>Artist</th>
                        <th className='px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>Time</th>
                        <th className='px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>Like</th>
                        <th className='px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>-</th>
                    </tr>
                </thead>
                <tbody>
                    {Array(20).fill(0).map((_, idx) => {
                        return (
                            <tr
                                key={idx}
                                className='hover:bg-neutral-800/40'
                            >
                                <td
                                    className='text-center py-1.5 text-xs'
                                >
                                    {idx + 1}
                                </td>
                                <td className='text-center py-1.5'>
                                    <div
                                        className='flex justify-center items-center gap-3'
                                    >
                                        <div
                                            className='w-10 h-10 rounded-lg border border-neutral-800 overflow-hidden'
                                        ></div>
                                        <h1
                                            className='font-semibold text-sm truncate text-white text-md'
                                        >
                                            Song Title
                                        </h1>
                                    </div>
                                </td>
                                <td
                                    className='text-center py-1.5'
                                >
                                    <span
                                        className='text-xs bg-gradient-to-r from-white via-white to-transparent truncate bg-clip-text text-transparent'
                                    >
                                        Artist Name
                                    </span>
                                </td>
                                <td
                                    className='text-center py-1.5 text-xs'
                                >
                                    2:55
                                </td>
                                <td
                                    className='text-center py-1.5'
                                >
                                    <h2
                                        className='flex items-center justify-center gap-1.5 text-xs'
                                    >
                                        <Heart className='fill-current' size={16}/> 1.2k
                                    </h2>
                                </td>
                                <td
                                    className='text-center py-1.5'
                                >
                                    <span
                                        className='flex justify-center'
                                    >
                                        <button className='cursor-pointer rounded-full p-1 hover:bg-neutral-800/40 flex items-center justify-center'>
                                            <MoreVertical className='flex-shrink-0 w-3.5 h-3.5' size={18}/>
                                        </button>
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}
