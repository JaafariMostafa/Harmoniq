"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type PlayerContextType = {
  ToggleAudioPlayer: (src: string) => Promise<void>;
  isPlaying: boolean;
  audioData: {
    duration: number;
    currentTime: number;
  };
  setAudioData: React.Dispatch<React.SetStateAction<{
    duration: number;
    currentTime: number;
  }>>;
  seek: (time: number) => void;
  currentUrl: string;
};

const AudioPlayerContext = createContext<PlayerContextType | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioData, setAudioData] = useState({
        duration: 0,
        currentTime: 0,
    });
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.preload = "metadata";
        function HandleDuration(){
            setAudioData((prev) => ({...prev, duration: audioRef.current?.duration || 0}))
        }

        function HandleTimeUpdate(){
            setAudioData((prev) => ({...prev, currentTime: audioRef.current?.currentTime || 0}))
        }

        audioRef.current.addEventListener("loadedmetadata", HandleDuration);
        audioRef.current.addEventListener("timeupdate", HandleTimeUpdate);
        audioRef.current.onended = () => setIsPlaying(false)
        return () => {
            audioRef.current?.removeEventListener("loadedmetadata", HandleDuration);
            audioRef.current?.removeEventListener("timeupdate", HandleTimeUpdate);
        };
    }, []);

  
    const ToggleAudioPlayer = async (src: string) => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.src !== src) {
        audio.src = src;
        audio.load();
        }
        if(audio.paused){
          await audio.play();
          setIsPlaying(true);
        }else{
          audio.pause();
          setIsPlaying(false);
        }
        setCurrentUrl(src);
    };

    const seek = (time: number) => {
        if(!time) return;
        const audio = audioRef.current;
        if(!audio) return;
        audio.currentTime = time;
        setAudioData({...audioData, currentTime: time});
    }

  return (
    <AudioPlayerContext.Provider value={{ ToggleAudioPlayer, audioData, setAudioData, isPlaying, seek, currentUrl }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export const useAudioPlayer = () => {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error("useAudioPlayer must be used inside provider");
  return ctx;
};
