import { createPublicClient } from "@/utils/supabase/server-public";
import { unstable_cache } from "next/cache";
import { ArtistProps } from "./GlobalTypes";




export const getArtistByID = async (artistID: string) => {
    const cachedFc = unstable_cache(
        async () => {
            const supabase = createPublicClient();
            const { data, error } = await supabase
                .from('artists')
                .select("*")
                .eq("id", artistID)
                .single();
            if(error){
                throw new Error(error.message);
            }

            return data as ArtistProps;
        },[`artist-id-${artistID}`],
        {revalidate: 300}
    )()
    return cachedFc;
}