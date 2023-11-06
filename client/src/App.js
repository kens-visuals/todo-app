import { QueryClient, QueryClientProvider } from 'react-query';

import Header from './components/Header';
import Container from './components/Container';
import TodoCollectionInput from './components/TodoCollectionInput';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function App() {
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

export default App;
