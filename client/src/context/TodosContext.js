import { createContext, useState } from 'react';

export const TodosContext = createContext({
  currentCollectionID: null,
  setCurrentTodoCollectionID: () => {},
});

export const TodosProvider = ({ children }) => {
  const [currentTodoCollectionID, setCurrentTodoCollectionID] = useState(null);

  return (
    <TodosContext.Provider
      value={{ currentTodoCollectionID, setCurrentTodoCollectionID }}
    >
      {children}
    </TodosContext.Provider>
  );
};
