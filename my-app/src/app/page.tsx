import HeroSection from "@/components/HeroSection";
import { RoutingButtons } from "@/components/RoutingButtons";
import TopTenSong from "@/components/TopTenSong";
import { getSongsPaginated } from "@/lib/getSongsPaginated";
import { TopTenSongsProps } from "@/lib/GlobalTypes";
import Image from "next/image";




export default async function Home(){
  const Songs_Data = await getSongsPaginated(1);

  return (
    <main 
      className="grow w-full p-6 bg-neutral-900 text-white w-full max-h-screen overflow-auto"
    >
      <RoutingButtons />
      <HeroSection />
      {/* {JSON.stringify(Songs_Data)} */}
      <TopTenSong TopTenSongs={Songs_Data.data} />
    </main>
  )
}