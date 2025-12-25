import type { Metadata } from "next";
import { Geom } from "next/font/google";
import "./globals.css";
import SideBarLeft from "@/components/SideBarLeft";
import SideBarRight from "@/components/SideBarRight";
import { AudioPlayerProvider } from "@/Context/AudioPlayerProvider";
import { UserInfosProvider } from "@/Context/UserInfosContext";

const geom = Geom({
  variable: "--font-geom",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "HARMONIQ",
  description: "A collaborative music creation platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geom.variable} antialiased
          w-full h-screen overflow-y-auto flex bg-black text-white`}
      >
        <UserInfosProvider>
          <AudioPlayerProvider>
            <SideBarLeft />
            {children}
            <SideBarRight />
          </AudioPlayerProvider>
        </UserInfosProvider>
      </body>
    </html>
  );
}
