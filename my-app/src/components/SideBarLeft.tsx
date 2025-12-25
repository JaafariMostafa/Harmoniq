"use client";
import { Globe, Home, Library, Music, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';

export default function SideBarLeft() {
  const router = useRouter();
  const pathname = usePathname();
  
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
      <ul
        className='flex flex-col items-start gap-1 mt-12'
      >
        <h3 className='font-semibold text-sm text-neutral-600 uppercase mb-1.5'>Menu</h3>
        {SidBarMenuNavigations.map((nav, idx) => {
          const isActive = pathname === nav.href;
          return (
            <button
              className={`w-full capitalize py-1 px-3 rounded-lg flex items-center gap-3 text-md cursor-pointer font-semibold
                ${isActive ? "text-black bg-white" : "hover:bg-neutral-900"}`}
              onClick={() => router.push(nav.href)}
              key={idx}
            >
              <nav.icon size={20}/> {nav.name}
            </button>
          )
        })}
      </ul>
      <ul
        className='flex flex-col items-start gap-1 mt-6'
      >
        <h3 className='font-semibold text-sm text-neutral-600 uppercase mb-1.5'>Playlists</h3>
          <span
            className='w-full text-xs text-neutral-700 text-center italic'
          >
            No playlists found
          </span>
      </ul>
    </div>
  )
}

const SidBarMenuNavigations = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'discover', href: '/discover', icon: Globe },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Your Library', href: '/library', icon: Library },
];