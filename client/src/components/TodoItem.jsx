import { useState, useContext } from 'react';
import { useQueryClient, useMutation } from 'react-query';

import updateTodo from '../api/updateTodo';
import removeTodo from '../api/removeTodo';

import { TodosContext } from '../context/TodosContext';

import EditTodoItem from './EditTodoItem';

import crossIcon from '../images/icon-cross.svg';
import checkIcon from '../images/icon-check.svg';
import pencilIcon from '../images/icon-pencil.svg';

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
          <img src={checkIcon} alt="check" aria-hidden className="h-2" />
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
          {isUpdateMutationLoading ? (
            <div className="h-4 w-1/2 rounded-lg bg-light-bg-secondary" />
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
            <img
              src={pencilIcon}
              alt="cross"
              aria-hidden
              className="w-4 md:w-5"
            />
          </button>
          <button
            type="button"
            aria-label="delete"
            disabled={isRemoveMutationLoading}
            onClick={() =>
              removeMutation({ id: currentTodoCollectionID, todoID: todo._id })
            }
          >
            <img
              src={crossIcon}
              alt="cross"
              aria-hidden
              className="w-3.5 md:w-5"
            />
          </button>
        </div>
      )}
    </li>
  );
}
