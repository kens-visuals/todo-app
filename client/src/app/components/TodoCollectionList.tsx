'use client';
import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TodosContext } from '@/app/context/TodosContextProvider';

import deleteTodoCollection from '@/app/api/delecteTodoCollection';
import { TodoCollection } from '../types';

type TodoCollectionListProps = {
  todoCollections: TodoCollection[];
};

export default function TodoCollectionList({
  todoCollections,
}: TodoCollectionListProps) {
  const queryClient = useQueryClient();

  const { currentTodoCollectionID, setCurrentTodoCollectionID } =
    useContext(TodosContext);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    mutate: removeTodoCollectionMutation,
    isPending: isRemoveTodoCollectionMutationLoading,
  } = useMutation({
    mutationFn: (id: string) => deleteTodoCollection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo-collections'] });

      const collectionIndex = todoCollections?.findIndex(
        (collection: TodoCollection) =>
          collection?._id === currentTodoCollectionID
      );

      if (collectionIndex === 0) {
        setCurrentTodoCollectionID(
          todoCollections?.at(collectionIndex + 1)?._id
        );
      } else {
        setCurrentTodoCollectionID(
          todoCollections?.at(collectionIndex - 1)?._id
        );
      }
    },
  });

  return (
    <ul className="no-scrollbar flex snap-x snap-proximity overflow-x-auto my-4 pr-1 max-w-full gap-2">
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
                  <div className="h-max w-max relative">
                    <button
                      type="button"
                      aria-label="remove todo collection"
                      className="flex place-content-center"
                      disabled={isRemoveTodoCollectionMutationLoading}
                      onClick={() => setIsDeleteModalOpen(true)}
                    >
                      <svg
                        fill="none"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 hover:text-red"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    {isDeleteModalOpen &&
                      createPortal(
                        <div className="inset-0 fixed bg-primary/50 dark:bg-tertiary/50 flex items-center justify-center text-tertiary px-4">
                          <div className="bg-primary rounded-lg p-4 grid gap-4">
                            If you click yes, you will delete all todos in this
                            collection. Are you sure you want to delete this
                            todo collection permanently?
                            <div className="flex w-full gap-4">
                              <button
                                type="button"
                                aria-label="remove todo collection"
                                className="bg-tertiary w-full text-primary px-4 py-2 rounded-lg hover:bg-tertiary hover:text-primary/50"
                                disabled={isRemoveTodoCollectionMutationLoading}
                                onClick={() => setIsDeleteModalOpen(false)}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                aria-label="remove todo collection"
                                className="bg-red text-white w-full px-4 py-2 rounded-lg hover:bg-red/50 hover:text-red"
                                disabled={isRemoveTodoCollectionMutationLoading}
                                onClick={() => {
                                  removeTodoCollectionMutation(collection?._id);
                                  setIsDeleteModalOpen(false);
                                }}
                              >
                                Yes, please!
                              </button>
                            </div>
                          </div>
                        </div>,
                        document.body
                      )}
                  </div>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
