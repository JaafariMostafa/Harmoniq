import HeroSection from "@/components/HeroSection";
import { RoutingButtons } from "@/components/RoutingButtons";
import TopTenSong from "@/components/TopTenSong";




export default function Home(){
  return (
    <main 
      className="grow w-full p-6 bg-neutral-900 text-white w-full max-h-screen overflow-auto"
    >
      <RoutingButtons />
      <HeroSection />
      <TopTenSong />
    </main>
  )
}