import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const dotGothic = localFont({
  src: "./fonts/DotGothic16-Regular.ttf",
  display: "swap",
});

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
    <html lang="ja">
      <body className={`bg-[#f2ebdf] p-12 ${dotGothic.className}`}>
        {children}
      </body>
    </html>
  );
}
