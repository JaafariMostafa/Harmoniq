export type SongTypes = {
    id: string;
    created_at: string;
    song_name: string;
    song_cover: string;
    song_owner: string;
    song_owner_ids: string[];
    song_likes: number;
    song_audio_url: string;
}


export type ArtistProps = {
    id: string;
    artist_name: string;
    artist_profil: string;
    artist_banner: string;
    artist_followers: string;
}