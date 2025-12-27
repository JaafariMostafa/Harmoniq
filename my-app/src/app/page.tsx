import HeroSection from "@/components/HeroSection";
import { RoutingButtons } from "@/components/RoutingButtons";
import TopTenSong from "@/components/TopTenSong";
import { getSongsPaginated } from "@/lib/getSongsPaginated";


export default async function Home({ searchParams }: { searchParams?: { page?: string } }){
  const Current_Page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const Songs_Data = await getSongsPaginated(Current_Page);

  return (
    <main 
      className="grow w-full p-6 bg-neutral-900 text-white w-full max-h-screen overflow-auto"
    >
      <RoutingButtons />
      <HeroSection />
      <TopTenSong TopTenSongs={Songs_Data.data} />
    </main>
  )
}