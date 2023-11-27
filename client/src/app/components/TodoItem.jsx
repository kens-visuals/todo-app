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
      className={`flex w-full items-center bg-tertiary dark:bg-secondary p-2 overflow-hidden 
      ${index === 0 && 'rounded-t-md'} ${
        index >= 0 && 'border-b border-b-secondary dark:border-b-primary'
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
        className={`flex aspect-square h-5 items-center justify-center rounded-full border border-green hover:border-primary dark:border-primary dark:hover:border-yellow md:h-6
        ${
          todo?.completed &&
          'dark:bg-button-gradient--dark bg-button-gradient--light'
        }`}
      >
        {todo?.completed && (
          <svg
            width="11"
            height="9"
            className="h-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="#FFF"
              strokeWidth="2"
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
          className={`w-[75%] overflow-scroll px-3 text-sm text-primary transition-all duration-300 focus-visible:outline-none dark:text-primary md:w-[85%] md:px-5 md:text-lg
          ${
            todo?.completed &&
            'text-secondary line-through dark:text-dark-green'
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
        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="p-2"
            aria-label="edit"
            onClick={() => setIsEditing(true)}
          >
            <svg
              fill="none"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 hover:text-green text-primary"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          <button
            type="button"
            className="p-2"
            aria-label="delete"
            disabled={isRemoveMutationLoading}
            onClick={() =>
              removeMutation({ id: currentTodoCollectionID, todoID: todo._id })
            }
          >
            <svg
              fill="none"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-primary hover:text-red "
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}
