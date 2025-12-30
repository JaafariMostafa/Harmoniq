"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function useSongLikes(
  songId: number,
  initialLikes: number
) {
  // عدد اللايكات
  const [likes, setLikes] = useState(initialLikes);

  // واش المستخدم دار لايك (local فقط)
  const [liked, setLiked] = useState(false);

  const toggleLike = async () => {
    const nextLiked = !liked;

    /* ===============================
       1️⃣ Optimistic UI
       =============================== */
    setLiked(nextLiked);
    setLikes(prev =>
      Math.max(prev + (nextLiked ? 1 : -1), 0)
    );

    /* ===============================
       2️⃣ Update واحد فقط
       =============================== */
    const supabase = createClient();
    await supabase
      .from("songs")
      .update({
        song_likes: likes + (nextLiked ? 1 : -1)
      })
      .eq("id", songId);
  };

  return {
    likes,
    liked,
    toggleLike
  };
}
