"use client";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function RoutingButtons() {
    const router = useRouter();
    return (
        <div
            className='w-full flex items-center gap-3 justify-start'
        >
            <button disabled onClick={() => router.back()} className='cursor-pointer hover:bg-neutral-800/80 p-1.5 rounded-full bg-neutral-800/40 text-white'><ChevronLeft size={20}/></button>
            <button disabled onClick={() => router.forward()} className='cursor-pointer hover:bg-neutral-800/80 p-1.5 rounded-full bg-neutral-800/40 text-white'><ChevronRight size={20}/></button>
        </div>
    )
}
