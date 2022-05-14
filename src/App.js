import { useState, useReducer } from 'react';

// components
import Header from './components/Header';
import Container from './components/Container';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

export const ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove',
  COMPLETE: 'complete',
  EDIT: 'edit',
  CLEAR: 'clear_completed',
};

function todosReducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD: {
      return [
        ...todos,
        { id: payload.id, todo: payload.task, completed: payload.completed },
      ];
    }
    case ACTIONS.REMOVE: {
      return todos.filter((todo) => todo.id !== payload.id);
    }
    case ACTIONS.COMPLETE: {
      return todos.map((todo) =>
        todo.id === payload.id ? { ...todo, completed: !todo.completed } : todo
      );
    }
    case ACTIONS.EDIT: {
      return todos.map((todo) =>
        todo.id === payload.id ? { ...todo, todo: payload.updatedTodo } : todo
      );
    }
    case ACTIONS.CLEAR: {
      return todos.filter((todo) => !todo.completed);
    }

    default:
      throw new Error(`Unknown action type: ${type}`);
  }
}

function App() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  console.log(todos);

  return (
    <div className="min-h-screen w-full bg-light-bg-secondary outline-1 dark:bg-dark-bg-secondary">
      <div className="h-screen bg-hero-mobile--light bg-contain bg-no-repeat dark:bg-hero-mobile--dark md:bg-hero-desktop--light md:dark:bg-hero-desktop--dark">
        <Container>
          <Header />

          <TodoInput dispatch={dispatch} />

          <TodoList todos={todos} dispatch={dispatch} />
        </Container>
      </div>
    </div>
  );
}

export default App;
