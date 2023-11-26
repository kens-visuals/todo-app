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
      className="mt-2"
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
        className="w-full rounded-xl border-0 bg-primary px-1 py-2 text-sm text-light-text-tertiary caret-dark-green shadow-2xl shadow-black/20 placeholder:text-light-text-secondary focus-visible:outline focus-visible:outline-dark-green dark:focus-visible:outline-yellow dark:bg-dark-green dark:text-dark-text-primary placeholder:dark:text-secondary md:p-4 md:text-lg md:placeholder:text-xl placeholder:uppercase placeholder:tracking-wide"
      />
    </form>
  );
}
