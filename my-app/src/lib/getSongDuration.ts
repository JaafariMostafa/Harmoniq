"use client";

import { useEffect, useState } from "react";
import { SongTypes } from "./GlobalTypes";

// دالة للحصول على مدة الأغنية
export function getSongDuration(audioUrl: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioUrl);
    audio.onloadedmetadata = () => resolve(audio.duration);
    audio.onerror = () => reject(new Error("Failed to load Audio!"));
  });
}

// Custom hook لحساب مدة الأغاني
export function useSongDurations(songs: SongTypes[]) {
  // حالة تخزين الدورات لكل أغنية { audioUrl: durationInSeconds }
  const [durations, setDurations] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // استخدام for...of مع await لكل أغنية
    const fetchDurations = async () => {
      for (const song of songs) {
        try {
          const duration = await getSongDuration(song.song_audio_url);
          setDurations((prev) => ({
            ...prev,
            [song.song_audio_url]: duration
          }));
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchDurations();
  }, [songs]);

  // دالة للحصول على مدة أغنية بشكل منسق mm:ss
  const formatDuration = (audioUrl: string) => {
    const duration = durations[audioUrl];
    if (!duration) return "0:00";

    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return { durations, formatDuration };
}
