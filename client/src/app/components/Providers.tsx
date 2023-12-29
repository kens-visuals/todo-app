'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TodosProvider } from '@/app/context/TodosContextProvider';
import ThemeToggleProvider from '@/app/context/ThemeContextProvider';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeToggleProvider>
          <TodosProvider>{children}</TodosProvider>
        </ThemeToggleProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
