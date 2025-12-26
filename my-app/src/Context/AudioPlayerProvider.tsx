"use client";

import { TopTenSongsProps } from "@/lib/GlobalTypes";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type PlayerContextType = {
  ToggleAudioPlayer: (currentSong: TopTenSongsProps) => Promise<void>;
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
  currentPlaylist: TopTenSongsProps[] | [];
  setCurrentPlaylist: (currentPlaylist: TopTenSongsProps[] | []) => void;
  currentSong: TopTenSongsProps | null;
  playNextSong: () => Promise<void>;
  playPreviousSong: () => Promise<void>;
};

const AudioPlayerContext = createContext<PlayerContextType | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioData, setAudioData] = useState({
        duration: 0,
        currentTime: 0,
    });
    const [currentPlaylist, setCurrentPlaylist] = useState<TopTenSongsProps[] | []>([]);
    const [currentSong, setCurrentSong] = useState<TopTenSongsProps | null>(null);

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

  
    const ToggleAudioPlayer = async (current_Song: TopTenSongsProps) => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.src !== current_Song.song_audio_url) {
        audio.src = current_Song.song_audio_url;
        audio.load();
        }
        if(audio.paused){
          await audio.play();
          setIsPlaying(true);
        }else{
          audio.pause();
          setIsPlaying(false);
        }
        setCurrentSong(current_Song);
    };

    const playNextSong = async () => {
      const audio = audioRef.current;
      if(!audio || !currentSong || currentPlaylist.length === 0) return;

      const currentIndex = currentPlaylist.findIndex((s) => s.id === currentSong.id);
      if(currentIndex === -1) return;

      const NextIndex = currentIndex === currentPlaylist.length - 1 ?
        0 : currentIndex + 1;
      
      audio.src = currentPlaylist[NextIndex].song_audio_url;
      audio.load();
      await audio.play();

      setCurrentSong(currentPlaylist[NextIndex]);
      setIsPlaying(true);
    }

    const playPreviousSong = async () => {
      const audio = audioRef.current;
      if(!audio || !currentSong || currentPlaylist.length === 0) return;

      const currentIndex = currentPlaylist.findIndex((s) => s.id === currentSong.id);
      if(currentIndex === -1) return;

      const NextIndex = currentIndex === 0 ?
        currentPlaylist.length - 1 : currentIndex - 1;

      audio.src = currentPlaylist[NextIndex].song_audio_url;
      audio.load();
      await audio.play();

      setCurrentSong(currentPlaylist[NextIndex]);
      setIsPlaying(true);
    }

    const seek = (time: number) => {
        if(!time) return;
        const audio = audioRef.current;
        if(!audio) return;
        audio.currentTime = time;
        setAudioData({...audioData, currentTime: time});
    }

  return (
    <AudioPlayerContext.Provider value={{ ToggleAudioPlayer, playNextSong, playPreviousSong, audioData, setAudioData, isPlaying, seek, currentPlaylist, currentSong, setCurrentPlaylist }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export const useAudioPlayer = () => {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error("useAudioPlayer must be used inside provider");
  return ctx;
};
