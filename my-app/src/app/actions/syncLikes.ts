// "use server";
// import { revalidateTag } from "next/cache";
// import { createAdminClient } from "@/utils/supabase/server-admin";


// type PendingType = {
//     songId: string;
//     like: boolean;
//     currentLikes: number;
//     artistId: string;
// }
// export async function syncLikes(batch: PendingType[]){
//     const supabase = createAdminClient();

//     const session = await getServerSession()    
//     if(error) {
//         return error.message;
//     }
    
//     if(!user) {
//         return "User not authenticated yet !"
//     }
//     for(const item of batch){
//         await supabase.from('songs')
//         .update({
//             song_likes: item.like ?
//             item.currentLikes + 1 : Math.max(item.currentLikes - 1, 0)
//         })
//         .eq("id", item.songId);

//         revalidateTag(`artist-songs-${item.artistId}`, "default");
//     }
// }