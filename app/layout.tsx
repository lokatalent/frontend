import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Nav";

const nunito = Nunito_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LokaTalent",
  description: "Quality home service on demand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = true; // Replace with actual authentication logic
  return (
    <html lang="en">
      <body className={nunito.className}>
        {/* {loggedIn && <Navbar />} */}
        {children}
      </body>
    </html>
  );
}
