import { Inter } from 'next/font/google';
import './globals.css';
import ThemeSwitcher from './(home)/_components/theme-switcher';

const inter = Inter({ subsets: ['latin'] });

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
