import { useContext } from 'react';

// components
import Header from './components/Header';
import Container from './components/Container';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

// contexts
import { TodosContext } from './context/TodosContext';

function App() {
  const { todos, dispatch } = useContext(TodosContext);

  return (
    <div className="min-h-screen w-full bg-light-bg-secondary outline-1 dark:bg-dark-bg-secondary">
      <div className="grid h-screen grid-rows-[1fr_auto] bg-hero-mobile--light bg-contain bg-no-repeat dark:bg-hero-mobile--dark md:bg-hero-desktop--light  md:dark:bg-hero-desktop--dark">
        <Container>
          <Header />

          <TodoInput dispatch={dispatch} />

          <TodoList todos={todos} dispatch={dispatch} />
        </Container>

        <Footer />
      </div>
    </div>
  );
}

export default App;
