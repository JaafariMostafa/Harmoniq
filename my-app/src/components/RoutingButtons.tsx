"use client";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function RoutingButtons() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div
            className='w-full flex items-center gap-3 justify-start'
        >
            <button 
                disabled={pathname === "/"} 
                onClick={() => router.back()} 
                className='border border-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-800/80 p-1.5 rounded-full bg-neutral-800/40 text-white'>
                    <ChevronLeft 
                        size={20}
                    />
            </button>
            <button 
                onClick={() => router.forward()} 
                className='border border-neutral-800 cursor-pointer hover:bg-neutral-800/80 p-1.5 rounded-full bg-neutral-800/40 text-white'><ChevronRight size={20}/></button>
        </div>
    )
}
