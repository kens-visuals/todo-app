'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import TodoCollectionInput from '@/app/components/TodoCollectionInput';
import TodoList from '@/app/components/TodoList';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoCollectionInput />

      <TodoList />
    </QueryClientProvider>
  );
}
