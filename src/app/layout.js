import { Rajdhani } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import PageWrapper from "@/components/layout/PageWrapper";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "TJM Auto Care Menu",
  description: "Digital menu untuk TJM Auto Care - Promo & Paket Service",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {

  return (
    <html
      lang="id"
      className={`${rajdhani.variable} dark antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505]">
        <div className="desktop-lock-frame flex flex-col">
          <PageWrapper>
            {children}
          </PageWrapper>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
