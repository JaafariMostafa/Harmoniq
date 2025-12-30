import { createPublicClient } from "@/utils/supabase/server-public";
import { unstable_cache } from "next/cache";
import { SongTypes } from "./GlobalTypes";





export const getArtistSongs = async (artistID: string) => unstable_cache(
    async () => {
        const supabase = createPublicClient();

        const { data, error } = await supabase
            .from('songs')
            .select("*")
            .contains("song_owner_ids", [artistID]);
        if(error){
            throw new Error(error.details);
        }

        return data as SongTypes[];
            
    },[`artist-songs-${artistID}`],{
        tags: [`artist-songs-${artistID}`],
        revalidate: 3600
    }
)()