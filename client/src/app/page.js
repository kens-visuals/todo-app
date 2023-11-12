'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from '@/app/components/Header';
import Container from '@/app/components/Container';
import TodoCollectionInput from '@/app/components/TodoCollectionInput';
import TodoList from '@/app/components/TodoList';
import Footer from '@/app/components/Footer';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen w-full bg-light-bg-secondary outline-1 dark:bg-dark-bg-secondary">
        <div className="grid grid-rows-[1fr_auto] justify-center bg-hero-mobile--light bg-contain bg-no-repeat dark:bg-hero-mobile--dark md:grid md:bg-hero-desktop--light md:dark:bg-hero-desktop--dark">
          <Container>
            <Header />

            <TodoCollectionInput />

            <TodoList />
          </Container>

          <Footer />
        </div>
      </div>
    </QueryClientProvider>
  );
}
