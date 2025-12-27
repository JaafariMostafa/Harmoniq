import { createPublicClient } from "@/utils/supabase/server-public";
import { unstable_cache } from "next/cache";
import { ArtistProps } from "./GlobalTypes";

const ARTISTS_SIZE: number = 10;
export const getArtistsPaginated = async (limitCount: number, page: number) => {
    const cachedFc = unstable_cache(
    async () => {
        const supabase = createPublicClient();
        const from = (page - 1) * ARTISTS_SIZE;
        const to = (from + ARTISTS_SIZE) - 1;
        const { data, error } = await supabase
            .from('artists')
            .select('*')
            .range(from, to)
            .order('artist_followers', { ascending: false })
            .limit(limitCount);
        
        if(error) {
            throw new Error(`Error: ${error.message}`);
        }

        return data as ArtistProps[];
        },[`artists-data-${limitCount}`],
        {
            revalidate: 3600,
        }
    )()
    return cachedFc;
}