import HeroSection from "@/components/HeroSection";
import TopTenSong from "@/components/TopTenSong";
import { getSongsPaginated } from "@/lib/getSongsPaginated";


export default async function Home({ searchParams }: { searchParams?: { page?: string } }){
  const Current_Page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const Songs_Data = await getSongsPaginated(Current_Page);

  return (
    <main 
      className="w-full text-white"
    >
      <HeroSection />
      <TopTenSong TopTenSongs={Songs_Data.data} />
    </main>
  )
}