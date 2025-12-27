import type { Metadata } from "next";
import { Geom, Noto_Sans } from "next/font/google";
import "./globals.css";
import SideBarLeft from "@/components/SideBarLeft";
import SideBarRight from "@/components/SideBarRight";
import { AudioPlayerProvider } from "@/Context/AudioPlayerProvider";
import { UserInfosProvider } from "@/Context/UserInfosContext";
import { getArtistsPaginated } from "@/lib/getArtistsPaginated";
import { RoutingButtons } from "@/components/RoutingButtons";

const geom = Noto_Sans({
  variable: "--font-geom",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "HARMONIQ",
  description: "A collaborative music creation platform.",
};

export default async function RootLayout({
  children,
  searchParams
}: Readonly<{
  children: React.ReactNode;
  searchParams?: { artistspage?: string; }
}>) {

  const Current_Page = searchParams?.artistspage ? parseInt(searchParams.artistspage) : 1;
  const Limit_Count = searchParams?.artistspage ? 10 : 4;
  const Artists_Data = await getArtistsPaginated(Limit_Count, Current_Page);
  return (
    <html lang="en">
      <body
        className={`${geom.variable} antialiased
          w-full h-screen overflow-y-auto flex bg-black text-white`}
      >
        <UserInfosProvider>
          <AudioPlayerProvider>
            <SideBarLeft />
            <div
              className="w-full h-screen overflow-auto p-6 bg-neutral-900"
            >
              <RoutingButtons />
              {children}
            </div>
            <SideBarRight ArtistsData={Artists_Data} />
          </AudioPlayerProvider>
        </UserInfosProvider>
      </body>
    </html>
  );
}
