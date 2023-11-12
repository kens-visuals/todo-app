'use client';
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TodosContext } from '@/app/context/TodosContext';

import createTodo from '@/app/api/createTodo';

export default function TodoItemInput() {
  const queryClient = useQueryClient();

  const { currentTodoCollectionID } = useContext(TodosContext);

  const [todo, setTodo] = useState('');

  const handleTodo = (e) => {
    setTodo(e.target.value);
  };

  const { mutate: addTodoToCollectionMutation } = useMutation({
    queryKey: ['todo-collections'],
    mutationFn: ({ id, text }) => createTodo(id, text),
    onSuccess: () => {
      queryClient.invalidateQueries(['todo-collections']);
    },
  });

  return (
    <form
      action="POST"
      onSubmit={(e) => {
        e.preventDefault();

        addTodoToCollectionMutation({
          id: currentTodoCollectionID,
          text: todo,
        });
        setTodo('');
      }}
    >
      <input
        type="text"
        value={todo}
        onChange={(e) => handleTodo(e)}
        placeholder="Create a new todo..."
        className="mb-4 w-full rounded-md border-0 bg-light-bg-primary p-3 px-6 pl-12 text-sm text-light-text-tertiary caret-blue shadow-2xl shadow-black/20 placeholder:text-sm placeholder:text-light-text-secondary focus-visible:outline focus-visible:outline-blue dark:bg-dark-bg-primary dark:text-dark-text-primary placeholder:dark:text-dark-text-quaternary md:p-2 md:px-6 md:text-lg md:placeholder:text-lg"
      />
    </form>
  );
}
