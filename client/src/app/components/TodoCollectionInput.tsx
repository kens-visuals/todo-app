'use client';
import { useState, useContext, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import createTodoCollection from '@/app/api/createTodoCollection';

import { TodosContext } from '@/app/context/TodosContextProvider';

type CreateTodoCollectionMutationParams = {
  title: string;
  userID: string;
};

export default function TodoCollectionInput() {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');

  const { setCurrentTodoCollectionID } = useContext(TodosContext);

  const { mutate: createTodoCollectionMutation } = useMutation({
    mutationFn: ({ title, userID }: CreateTodoCollectionMutationParams) =>
      createTodoCollection(title, userID),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todo-collections'] });
      setCurrentTodoCollectionID(data?._id);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!title) return;

    // @ts-ignore
    const userID = session?.user?.id;

    e.preventDefault();
    createTodoCollectionMutation({ title, userID });
    setTitle('');
  };

  return (
    <form action="POST" className="w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        id="todo-input"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="create a todo collection..."
        className="w-full rounded-xl text-xl border-0 bg-green px-4 py-6 text-tertiary caret-dark-green shadow-2xl shadow-black/20 placeholder:text-secondary focus-visible:outline focus-visible:outline-dark-green dark:bg-yellow dark:text-primary placeholder:dark:text-primary/50 md:p-4 md:text-lg md:placeholder:text-xl placeholder:tracking-wide"
      />
    </form>
  );
}
