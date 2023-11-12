import { Inter } from 'next/font/google';
import './globals.css';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Todo App',
  description: 'A todo app built with Next.js and MongoDB.',
};

import { ThemeProvider } from '@/app/context/ThemeContext';
import { TodosProvider } from '@/app/context/TodosContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <TodosProvider>
            <div className="w-full bg-light-bg-secondary outline-1 dark:bg-dark-bg-secondary min-h-screen grid grid-rows-[1fr_auto] items-center justify-center bg-hero-mobile--light bg-contain bg-no-repeat dark:bg-hero-mobile--dark md:grid md:bg-hero-desktop--light md:dark:bg-hero-desktop--dark">
              <main className="mx-auto max-w-[34rem] py-10 md:py-20">
                <Header />
                {children}
              </main>
              <Footer />
            </div>
          </TodosProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
