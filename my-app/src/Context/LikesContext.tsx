// "use client";

// import { syncLikes } from "@/app/actions/syncLikes";
// import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
// import { useUserInfos } from "./UserInfosContext";

// type LikesContext = {
//     HandleToggleLikes: (songId: string, isLiked:boolean, currentLikes: number, artistId: string) => void;
// }

// type PendingType = {
//     songId: string;
//     like: boolean;
//     currentLikes: number;
//     artistId: string;
// }
// const LikesContext = createContext<LikesContext | null>(null);

// export function LikesProvider({ children }: { children: ReactNode }){
//     const PendingLikes = useRef<PendingType[]>([]);
    
//     const { email } = useUserInfos();
    
//     useEffect(() => {
//         const storage = localStorage.getItem("pendingLikes");
//         if(storage){
//             PendingLikes.current = JSON.parse(storage);
//         }
//     },[])

//     const HandleToggleLikes = (songId: string, isLiked:boolean, currentLikes: number, artistId: string) => {

//         if(!email) {
//             alert("please loggin first");
//             return;
//         }

//         PendingLikes.current.push({ songId, like: isLiked, currentLikes, artistId })

//         localStorage.setItem("pendingLikes", JSON.stringify(PendingLikes.current))
//     }

//     useEffect(() => {
//         const interval = setInterval(async () => {
//             if(PendingLikes.current.length === 0) return;
            
//             const batch = [...PendingLikes.current];

//             PendingLikes.current = [];
//             localStorage.removeItem("pendingLikes");

//             if(!email) {
//                 alert("please loggin first");
//                 return;
//             }
//             await syncLikes(batch);
//         }, 5000)
//         return () => clearInterval(interval);
//     },[])
//     return (
//         <LikesContext value={{ HandleToggleLikes }}>
//             {children}
//         </LikesContext>
//     )
// }


// export const useLikes = () => {
//     const context = useContext(LikesContext);
//     if(!context){
//         throw new Error("useLikes must be used within a LikesProvider")
//     }
//     return context;
// }