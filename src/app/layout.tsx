import { Inter } from 'next/font/google';
import './globals.css';
import ThemeSwitcher from './(home)/_components/theme-switcher';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Tiptap',
  description:
    'A modern WYSIWYG rich text editor based on tiptap and shadcn ui for ReactJs/NextJs',
  keywords: 'Tiptap, WYSIWYG, Rich Text Editor, ReactJS, NextJS',
  metadataBase: new URL(`https://next-tiptap.vercel.app`),
  openGraph: {
    type: 'website',
    url: `https://next-tiptap.vercel.app`,
    title: 'Next Tiptap',
    description:
      'A modern WYSIWYG rich text editor based on tiptap and shadcn ui for ReactJs/NextJs',
    siteName: 'Next Tiptap',
    locale: 'en_US',
    images: '/opengraph-image.jpg'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <ThemeSwitcher />
        <div id='modal-root' />
      </body>
    </html>
  );
}
