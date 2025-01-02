import { JetBrains_Mono, Open_Sans } from "next/font/google";
import { Metadata } from "next";

const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const fontSans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" });

import Header from "@/components/shared/Header";

import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Next Tiptap",
  description: "A modern WYSIWYG rich text editor based on tiptap and shadcn ui for ReactJs/NextJs",
  keywords: "Tiptap, WYSIWYG, Rich Text Editor, ReactJS, NextJS",
  metadataBase: new URL(`https://next-tiptap.vercel.app`),
  openGraph: {
    type: "website",
    url: `https://next-tiptap.vercel.app`,
    title: "Next Tiptap",
    description:
      "A modern WYSIWYG rich text editor based on tiptap and shadcn ui for ReactJs/NextJs",
    siteName: "Next Tiptap",
    locale: "en_US",
    images: "/opengraph-image.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontMono.variable} ${fontSans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
