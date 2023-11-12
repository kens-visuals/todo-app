'use client';
import { useState, useContext } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import updateTodo from '@/app/api/updateTodo';
import removeTodo from '@/app/api/removeTodo';

import { TodosContext } from '@/app/context/TodosContext';

import EditTodoItem from '@/app/components/EditTodoItem';

export default function TodoItem({ todo, index }) {
  const queryClient = useQueryClient();

  const { currentTodoCollectionID } = useContext(TodosContext);

  const [isEditing, setIsEditing] = useState(false);

  const { mutate: updateMutationTodo, isLoading: isUpdateMutationLoading } =
    useMutation({
      mutationFn: ({ id, todoID, todo }) => updateTodo(id, todoID, todo),
      onSuccess: (data) => {
        queryClient.invalidateQueries(['todo-collections']);

        console.log('Mutation Data:', data);
      },
    });

  const { mutate: removeMutation, isLoading: isRemoveMutationLoading } =
    useMutation({
      mutationFn: ({ id, todoID }) => removeTodo(id, todoID),
      onSuccess: () => {
        queryClient.invalidateQueries(['todo-collections']);
      },
    });

  return (
    <li
      className={`flex w-full items-center bg-light-bg-primary py-3 px-4 dark:bg-dark-bg-primary md:p-5 md:px-6 
      ${index === 0 && 'rounded-t-md'} ${
        index >= 0 &&
        'border-b border-b-light-text-secondary dark:border-b-dark-text-quaternary'
      }`}
    >
      <button
        type="button"
        aria-label="complete"
        disabled={isUpdateMutationLoading}
        onClick={() =>
          updateMutationTodo({
            id: currentTodoCollectionID,
            todoID: todo._id,
            todo: { ...todo, completed: !todo?.completed },
          })
        }
        className={`flex aspect-square h-5 items-center justify-center rounded-full border border-light-text-secondary hover:border-blue dark:border-dark-text-tertiary dark:hover:border-blue md:h-6
        ${todo?.completed && 'bg-button-gradient'}`}
      >
        {todo?.completed && (
          <svg
            className="h-2"
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="9"
          >
            <path
              fill="none"
              stroke="#FFF"
              stroke-width="2"
              d="M1 4.304L3.696 7l6-6"
            />
          </svg>
        )}
      </button>

      {isEditing ? (
        <EditTodoItem
          todo={todo}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <span
          className={`w-[75%] overflow-scroll px-3 text-sm text-light-text-tertiary transition-all duration-300 focus-visible:outline focus-visible:outline-blue dark:text-dark-text-primary md:w-[85%] md:px-5 md:text-lg
          ${
            todo?.completed &&
            'text-light-text-secondary line-through dark:text-dark-text-secondary'
          } `}
        >
          {isUpdateMutationLoading || isRemoveMutationLoading ? (
            <div className="animate h-4 w-1/2 animate-pulse rounded-lg bg-light-bg-secondary" />
          ) : (
            todo?.text
          )}
        </span>
      )}

      {isEditing || (
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <button
            type="button"
            aria-label="edit"
            onClick={() => setIsEditing(true)}
          >
            <svg
              className="w-4 md:w-5"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#494C6B"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path d="M8.071 21.586l-7.071 1.414 1.414-7.071 14.929-14.929 5.657 5.657-14.929 14.929zm-.493-.921l-4.243-4.243-1.06 5.303 5.303-1.06zm9.765-18.251l-13.3 13.301 4.242 4.242 13.301-13.3-4.243-4.243z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="delete"
            disabled={isRemoveMutationLoading}
            onClick={() =>
              removeMutation({ id: currentTodoCollectionID, todoID: todo._id })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              className="w-3.5 md:w-5"
            >
              <path
                fill="#494C6B"
                fill-rule="evenodd"
                d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
              />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}
