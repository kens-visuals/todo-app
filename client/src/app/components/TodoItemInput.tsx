'use client';
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TodosContext } from '@/app/context/TodosContextProvider';

import createTodo from '@/app/api/createTodo';

type CreateTodoMutationParams = {
  id: string;
  text: string;
};

export default function TodoItemInput() {
  const queryClient = useQueryClient();

  const { currentTodoCollectionID } = useContext(TodosContext);

  const [todo, setTodo] = useState('');

  const { mutate: addTodoToCollectionMutation } = useMutation({
    mutationFn: ({ id, text }: CreateTodoMutationParams) =>
      createTodo(id, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo-collections'] });
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
        placeholder="create a todo..."
        onChange={(e) => setTodo(e.target.value)}
        className="w-full rounded-xl border-0 bg-primary px-4 py-2 text-sm text-tertiary caret-yellow shadow-2xl shadow-black/20 placeholder:text-tertiary focus-visible:outline focus-visible:outline-dark-green dark:focus-visible:outline-yellow dark:bg-dark-green placeholder:dark:text-secondary md:p-4 md:text-lg placeholder:text-xs placeholder:tracking-widest"
      />
    </form>
  );
}
