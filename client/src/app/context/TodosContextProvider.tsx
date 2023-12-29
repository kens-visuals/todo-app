'use client';

import { ReactNode, createContext, useState } from 'react';

type TodosContextType = {
  currentTodoCollectionID: string | null;
  setCurrentTodoCollectionID: (id: string | null) => void;
};

type TodosProviderProps = {
  children: ReactNode;
};

export const TodosContext = createContext<TodosContextType>({
  currentTodoCollectionID: null,
  setCurrentTodoCollectionID: () => {},
});

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [currentTodoCollectionID, setCurrentTodoCollectionID] = useState<
    string | null
  >(null);

  const contextValue: TodosContextType = {
    currentTodoCollectionID: currentTodoCollectionID,
    setCurrentTodoCollectionID: setCurrentTodoCollectionID,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
