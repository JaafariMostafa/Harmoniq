"use client"
import { useAudioPlayer } from '@/Context/AudioPlayerProvider'
import { useUserInfos } from '@/Context/UserInfosContext'
import { ChevronDown, LogOut, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { SidBarMenuNavigations } from './SideBarLeft'
import { createClient } from '@/utils/supabase/client'


const DropDownProfilMenu = () => {
  const pathname = usePathname();
  const supabase = createClient();

  const HandleLogOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Sign out error:" + error.message);
    }
  }
  return (
    <ul
      className='bg-black space-y-1 w-full min-h-30 p-3 rounded-lg border border-neutral-800/80'
    >
      {SidBarMenuNavigations.map((item, idx) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            href={item.href} 
            key={idx}
            className={`w-full capitalize py-1 px-3 rounded-lg flex items-center gap-3 text-sm border cursor-pointer font-[500]
              ${isActive ? "text-black bg-white border-transparent" : "hover:bg-neutral-900 border-transparent hover:border-neutral-800"}`} 
          >
            <item.icon size={20}/> {item.name}
          </Link>
        )
      })}
      <button
        onClick={HandleLogOut}
        className='w-full capitalize py-1 px-3 rounded-lg bg-red-900/20 
          hover:bg-red-900/40 flex items-center gap-3 text-sm border 
          border-red-900/20 hover:border-red-900/40 text-red-600 
          cursor-pointer font-[500]'
      >
        <LogOut size={20}/> Logout
      </button>
    </ul>
  )
}
export default function SideBarRight() {
  const pathname = usePathname();
  if(pathname?.startsWith('/auth/')) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const DropDown_Ref = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(DropDown_Ref.current && !DropDown_Ref.current.contains(event.target as Node)){
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  },[])

  const { ToggleAudioPlayer, isPlaying, audioData, setAudioData, seek } = useAudioPlayer();
  const { email, id, fullname, isLoading } = useUserInfos();
  
  const TestSrcAudio = "https://iyzmssnbulmbaqvkprxl.supabase.co/storage/v1/object/public/Audio/Lady%20Gaga,%20Bruno%20Mars%20-%20Die%20With%20A%20Smile%20(Official%20Music%20Video).mp3";
  
  
  return (
    <div className='w-1/4 h-screen overflow-auto p-6 flex-shrink-0'>
      {/* --- User Profile Section --- */}
      {isLoading ? (
        <span className='flex py-7.5 w-full rounded-lg bg-neutral-900 border border-neutral-800/80 animate-pulse' />
      ) : email !== "" ? (
      <div
        ref={DropDown_Ref}
        onClick={() => setIsOpen(!isOpen)}
        className='relative w-full flex items-center gap-3 justify-between py-1.5 px-3 
          cursor-pointer border border-neutral-900 hover:border-neutral-800 
          rounded-2xl bg-neutral-900/40 hover:bg-neutral-900'
      >
        <div
          className='flex items-center gap-3'
        >
          <div
            className='relative overflow-hidden border-2 border-transparent 
              ring ring-neutral-100 bg-neutral-900 w-12 h-12 rounded-full'
          >
            <Image
              src="/Hero-Background.jpg"
              alt=''
              fill
              className='object-cover'
              priority
            />
          </div>
          <span className='flex flex-col'>
            <h1 
              className='text-lg font-semibold text-white truncate max-w-[140px]'
            >
              {fullname || email?.split('@')[0]}
            </h1>
            <p
              className='text-neutral-500 text-xs truncate max-w-[160px] text-nowrap'
            >
              {/* Free Account */}
              ID: {id}
            </p>
          </span>
        </div>

        <ChevronDown 
          size={20} 
          className={`transition-transform duration-200 
          ${isOpen ? "rotate-180" : ""}`}
        />
        <div
          className='absolute z-30 top-full mt-2 left-0 w-full'
        >
          {isOpen && <DropDownProfilMenu />}
        </div>
      </div>
      ) : !isLoading && email === "" && (
        <Link
          href="/auth/login"
          className='w-full flex items-center justify-center py-2 px-3 rounded-lg bg-white text-neutral-900 font-semibold text-sm hover:bg-white/90 cursor-pointer'
        >
          Login / Register
        </Link>
      )}

      <div className='w-full h-px bg-neutral-900 my-3'/>
      {/* --- Top Artists Section --- */}
      <div>
        {/* --- Top Artists Header */}
        <div
            className='w-full flex my-6 items-end'
        >
            <div className='w-full flex flex-col items-start'>
                <span
                    className='font-semibold text-md text-neutral-500'
                >
                    Top
                </span>
                <h1
                    className='text-2xl font-semibold'
                >
                    Trending
                </h1>
            </div>
            <Link
                href="/top-artists"
                className='text-sm text-neutral-400 hover:text-neutral-200 cursor-pointer text-nowrap'
            >
                See all
            </Link>
        </div>

        {/* --- Top Artists List --- */}
        <div
          className='flex flex-col gap-4'
        >
          {Array(4).fill(0).map((_, idx) => {
            return (
              <div
                key={idx}
                className='w-full flex items-center gap-3 justify-between'
              >
                <div
                  className='w-full flex items-center gap-3'
                >
                  <div
                    className='relative overflow-hidden border border-neutral-100 
                      bg-neutral-900 w-10 h-10 rounded-lg'
                  >
                    <Image
                      src="/Hero-Background.jpg"
                      alt=''
                      fill
                      className='object-cover'
                      priority
                    />
                  </div>
                  <span className='flex flex-col -space-y-0.5'>
                    <h1 
                      className='text-md font-semibold text-white'
                    >
                      Artist Name
                    </h1>
                    <p
                      className='text-neutral-500 text-sm'
                    >
                      1.2M Followers
                    </p>
                  </span>
                </div>
                <span
                  className='text-neutral-500'
                >
                  #{idx + 1}
                </span>
              </div>
            )
          })}
        </div>

        <div className="w-full h-px bg-neutral-900 my-3" />
        {/* --- Music Player --- */}
        <div
          className='relative overflow-hidden w-full h-54 bg-neutral-900/40 border border-neutral-900 rounded-xl mt-4'
        >
          <div
            className='relative inset-0 z-10 h-full flex flex-col justify-end p-6'
          >
            <Image
              src="/Hero-Background.jpg"
              alt=''
              fill
              className='object-cover opacity-30'
              priority
            />
          </div>

          <div
            className='absolute inset-0 z-20 flex items-end justify-center p-3'
          >
            <div className='w-full h-5/7 flex flex-col items-center justify-center rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/60 border border-neutral-900 hover:border-neutral-800/60'>
              <h1 className='text-white font-semibold'>Song Title</h1>
              <p className='text-neutral-600 text-sm'>Song Owner</p>
              <div
                className='w-full flex items-center justify-center mt-3 gap-3'
              >
                <button
                  disabled
                  className='group disabled:text-neutral-500 cursor-pointer text-neutral-300 hover:text-white'
                >
                  <SkipBack size={20} className='group-disabled:fill-neutral-500 group-disabled:cursor-not-allowed fill-white' />
                </button>
                <button
                  onClick={() => ToggleAudioPlayer(TestSrcAudio)}
                  className='border border-neutral-500 hover:border-white p-1.5 cursor-pointer rounded-full'
                >
                  {isPlaying ? <Pause size={20} className='fill-white' /> : <Play size={20} className='fill-white' />}
                </button>
                <button
                  disabled
                  className='group disabled:text-neutral-500 cursor-pointer text-neutral-300 hover:text-white'
                >
                  <SkipForward size={20} className='group-disabled:fill-neutral-500 group-disabled:cursor-not-allowed fill-white' />
                </button>
              </div>
              {/* --- TimeLine --- */}
              <div
                className='w-full px-3 text-xs'
              >
                <span
                  className='w-full flex items-center justify-between'
                >
                  <p>
                    {Math.floor(audioData.currentTime / 60)}:{Math.floor(audioData.currentTime % 60).toString().padStart(2, '0')}
                  </p>
                  <p>
                    {Math.floor(audioData.duration / 60)}:{Math.floor(audioData.duration % 60).toString().padStart(2, '0')}
                  </p>
                </span>

                <div
                  onClick={(e) => {
                    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newTime = (clickX / rect.width) * audioData.duration;
                    setAudioData((prev) => ({...prev, currentTime: newTime}));
                    seek(newTime);
                  }}
                  className='relative group cursor-pointer w-full bg-white/10 h-1 mt-2 rounded-full'
                >
                  <span 
                    style={{ width: `${(audioData.currentTime / audioData.duration) * 100}%` }} 
                    className='absolute -z-10 h-1 rounded-full bg-white after:content-[""] after:w-3 after:h-2 after:bg-white after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-1.5 after:rounded-full'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
