import type { Metadata } from "next";
import { Geom, Noto_Sans } from "next/font/google";
import "./globals.css";
import SideBarLeft from "@/components/SideBarLeft";
import SideBarRight from "@/components/SideBarRight";
import { AudioPlayerProvider } from "@/Context/AudioPlayerProvider";
import { UserInfosProvider } from "@/Context/UserInfosContext";
import { getArtistsPaginated } from "@/lib/getArtistsPaginated";
import { RoutingButtons } from "@/components/RoutingButtons";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "react-hot-toast";
import { CheckCircle } from "lucide-react";
// import { LikesProvider } from "@/Context/LikesContext";

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

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const Current_Page = searchParams?.artistspage ? parseInt(searchParams.artistspage) : 1;
  const Limit_Count = searchParams?.artistspage ? 10 : 4;
  const Artists_Data = await getArtistsPaginated(Limit_Count, Current_Page);
  return (
    <html lang="en">
      <body
        className={`${geom.variable} antialiased
          w-full h-screen overflow-y-auto flex bg-black text-white`}
      >
        <Toaster 
          containerClassName="custom-toast-container"
          toastOptions={{
            duration: 4000,
            style: {
              background: "black",  // لون الخلفية
              color: "white",       // لون النص
              border: "1px solid #292929ff",
              borderRadius: "12px",
              padding: "8px 12px",
              fontWeight: "semibold",
              fontSize: "16px",
            },
            success: {
              style: { background: "black", color: "white" },
              icon: <CheckCircle className="text-green-100" size={18}/>,
            },
            error: {
              style: { background: "red", color: "#fff" },
              icon: "❌",
            },
          }}
          position="top-center" reverseOrder={true} />
        <UserInfosProvider serverUser={ user }>
          {/* <LikesProvider> */}
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
          {/* </LikesProvider> */}
        </UserInfosProvider>
      </body>
    </html>
  );
}
