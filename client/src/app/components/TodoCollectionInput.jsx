'use client';
import { useState, useContext } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import createTodoCollection from '@/app/api/createTodoCollection';

import { TodosContext } from '@/app/context/TodosContext';

export default function TodoCollectionInput() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');

  const { setCurrentTodoCollectionID } = useContext(TodosContext);

  const { mutate: createTodoCollectionMutation } = useMutation({
    mutationFn: (title) => createTodoCollection(title),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todo-collections'] });
      setCurrentTodoCollectionID(data[0]?._id);
    },
  });

  const handleSubmit = (e) => {
    if (!title) return;

    e.preventDefault();
    createTodoCollectionMutation(title);
    setTitle('');
  };

  return (
    <div className="pt-8">
      <form action="#" className="w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          id="todo-input"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Creacte a new todo collection..."
          className="w-full rounded-md border-0 bg-light-bg-primary p-3 px-6 pl-12 text-sm text-light-text-tertiary caret-blue shadow-2xl shadow-black/20 placeholder:text-sm placeholder:text-light-text-secondary focus-visible:outline focus-visible:outline-blue dark:bg-dark-bg-primary dark:text-dark-text-primary placeholder:dark:text-dark-text-quaternary md:p-4 md:text-lg md:placeholder:text-xl"
        />
      </form>
    </div>
  );
}
