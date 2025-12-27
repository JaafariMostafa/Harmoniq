import { createPublicClient } from "@/utils/supabase/server-public";
import { unstable_cache } from "next/cache";

const PAGE_SIZE: number = 10;
export const getSongsPaginated = (page: number = 1) => unstable_cache(
    async () => {
        const supabase = createPublicClient();

        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        const { data, error, count } = await supabase
            .from('songs')
            .select("*", { count: 'exact' })
            .range(from, to)
            .order('song_likes', { ascending: false })
            .limit(10);

        if (error) {
            throw new Error(error.message);
        }

        return {
            data,
            total: count ?? 0,
            page,
            pageSize: PAGE_SIZE,
        }
    },
    [`songs-page-${page}-page-size${PAGE_SIZE}`],
    {
        revalidate: 3600,
    }
)();