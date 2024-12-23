import "./globals.css";
import Navbar from "@/components/AuthPage/nav/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <video
          className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
          src="/Resource/a93fb0bc-a1ca89f7.mp4"
          autoPlay
          loop
          muted
        />
        <Navbar />
        <div className="relative z-10">
          <div className="min-h-screen">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
