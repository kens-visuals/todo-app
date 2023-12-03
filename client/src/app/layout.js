import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Providers from '@/app/components/Providers';
import Navigation from '@/app/components/Navigation';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Todo App',
  description: 'A todo app built with Next.js and MongoDB.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <Providers>
          <div className="max-w-full bg-secondary dark:bg-primary min-h-screen grid grid-rows-[auto_1fr_auto]">
            {/* <Footer /> */}
            <main className="w-full overflow-x-hidden">
              <Header />
              {children}
            </main>
            <Navigation />
          </div>
        </Providers>
      </body>
    </html>
  );
}
