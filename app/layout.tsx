import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import { ChartProvider } from "@/components/chart-context";
import { ChatProvider } from "@/components/chat-provider";
import ChatModal from "@/components/chat-modal";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { fetchCharts } from "@/lib/charts";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Oddessi",
  description: "A study of symbols and timelines.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Charts are read once, on the server, from the arc database and handed to
  // the provider — so no page below ever renders a loading state for them.
  const charts = await fetchCharts();

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${plexMono.variable}`}
    >
      {/* App shell: navbar and sidebar stay put, only the pane scrolls. */}
      <body className="flex h-dvh flex-col overflow-hidden bg-void text-bone">
        <ChartProvider charts={charts}>
          <ChatProvider>
            <Navbar />
            <div className="flex min-h-0 flex-1">
              <Sidebar />
              <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
            </div>
            <ChatModal />
          </ChatProvider>
        </ChartProvider>
      </body>
    </html>
  );
}
