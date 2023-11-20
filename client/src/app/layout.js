import { Inter } from 'next/font/google';
import './globals.css';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Providers from '@/app/components/Providers';
import Navigation from '@/app/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Todo App',
  description: 'A todo app built with Next.js and MongoDB.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="w-full bg-light-bg-secondary outline-1 dark:bg-dark-bg-secondary min-h-screen grid grid-rows-[auto_1fr_auto] items-center justify-center bg-hero-mobile--light bg-contain bg-no-repeat dark:bg-hero-mobile--dark md:grid md:bg-hero-desktop--light md:dark:bg-hero-desktop--dark">
            <Navigation />
            <main className="mx-auto w-[34rem] max-w-[34rem]">
              <Header />
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
