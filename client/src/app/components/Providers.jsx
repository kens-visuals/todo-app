'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/app/context/ThemeContext';
import { TodosProvider } from '@/app/context/TodosContext';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TodosProvider>{children}</TodosProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
