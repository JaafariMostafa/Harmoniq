import { createPublicClient } from "@/utils/supabase/server-public";
import { unstable_cache } from "next/cache";


const PAGE_SIZE = 20;
export const getProductsPaginated = (page: number) => unstable_cache(
    async () => {
        const supabase = createPublicClient();

        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        const { data, error, count } = await supabase
            .from('songs')
            .select("*", { count: 'exact' })
            .range(from, to)
            .order('created_at', { ascending: false });

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
    [`products-page-${page}`],
    {
        revalidate: 3600,
    }
)();