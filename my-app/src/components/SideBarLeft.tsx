import { Music } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function SideBarLeft() {
  return (
    <div
      className='w-1/5 p-6 flex-shrink-0'
    >
      <Link
        href="/"
        className='text-2xl font-[600] flex gap-1.5 items-center justify-center'
      >
        <Music size={34}/>
        Harmoniq
      </Link>
    </div>
  )
}
