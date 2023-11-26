'use client';
import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TodosContext } from '@/app/context/TodosContext';

import deleteTodoCollection from '@/app/api/delecteTodoCollection';

export default function TodoCollectionList({ todoCollections }) {
  const queryClient = useQueryClient();

  const { currentTodoCollectionID, setCurrentTodoCollectionID } =
    useContext(TodosContext);

  const {
    mutate: removeTodoCollectionMutation,
    isLoading: isRemoveTodoCollectionMutationLoading,
  } = useMutation({
    queryKey: ['todo-collections'],
    mutationFn: (id) => deleteTodoCollection(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todo-collections']);
      setCurrentTodoCollectionID(todoCollections?.at(1)?._id);
    },
  });

  return (
    <ul className="no-scrollbar flex max-w-[34rem] snap-x snap-proximity overflow-x-auto gap-2 my-4">
      {todoCollections?.map((collection) => (
        <li
          key={collection?._id}
          onClick={() => setCurrentTodoCollectionID(collection?._id)}
          className={`w-1/3 flex-shrink-0 hover:cursor-pointer snap-start rounded-lg hover:bg-secondary/20 border dark:hover:text-yellow hover:text-green py-2 ${
            currentTodoCollectionID === collection?._id
              ? 'dark:border-yellow border-green text-green dark:text-yellow '
              : 'border-primary/50 text-primary/50 dark:border-tertiary/50 dark:text-tertiary/50'
          }`}
        >
          <div className="flex h-full w-full flex-col items-center justify-between px-2">
            {isRemoveTodoCollectionMutationLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="flex w-full items-center justify-between ">
                <span>{collection.title}</span>
                {currentTodoCollectionID === collection?._id && (
                  <button
                    type="button"
                    disabled={isRemoveTodoCollectionMutationLoading}
                    onClick={() =>
                      removeTodoCollectionMutation(collection?._id)
                    }
                  >
                    <svg
                      fill="none"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      stroke="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
