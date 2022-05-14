import { useReducer, useEffect, createContext } from 'react';
import todosReducer from '../hooks/useTodos';

const setInitialTodos = () => {
  const localData = localStorage.getItem('todos');
  return localData ? JSON.parse(localData) : [];
};

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, [], setInitialTodos);

  useEffect(
    () => localStorage.setItem('todos', JSON.stringify(todos)),
    [todos]
  );
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
