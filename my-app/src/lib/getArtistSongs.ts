import { createPublicClient } from "@/utils/supabase/server-public";
import { unstable_cache } from "next/cache";





export const getArtistSongs = async () => unstable_cache(
    async () => {
        const supabase = createPublicClient();

        const { data, error } = await supabase
            .from('songs')
            .select("*")
            
    },[],{
        revalidate: 3600
    }
)()