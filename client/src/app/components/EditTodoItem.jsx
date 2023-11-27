'use client';
import { useState, useContext } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import updateTodo from '@/app/api/updateTodo';

import { TodosContext } from '@/app/context/TodosContext';

export default function EditTodoItem({ todo, isEditing, setIsEditing }) {
  const queryClient = useQueryClient();

  const [updatedTask, setUpdatedTask] = useState(todo?.text);

  const { currentTodoCollectionID } = useContext(TodosContext);

  const { mutate: updateMutationTodo, isLoading: isUpdateMutationLoading } =
    useMutation({
      mutationFn: ({ id, todoID, todo }) => updateTodo(id, todoID, todo),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todo-collections'] });
      },
    });

  const handleEdit = () => {
    updateMutationTodo({
      id: currentTodoCollectionID,
      todoID: todo?._id,
      todo: { ...todo, text: updatedTask },
    });
    setIsEditing(false);
  };

  return (
    <form
      action="PUT"
      onSubmit={handleEdit}
      className="flex w-full items-center gap-4"
    >
      <input
        type="text"
        value={updatedTask}
        disabled={isUpdateMutationLoading}
        onChange={(e) => setUpdatedTask(e.target.value)}
        className={`mx-3 mr-auto w-10/12 rounded-md px-1 text-sm dark:caret-yellow caret-green outline-1 duration-150 focus-visible:outline-none bg-primary ${
          isEditing &&
          'border dark:border-yellow border-green text-green dark:text-yellow '
        }`}
      />
      <button
        type="button"
        aria-label="confirm"
        onClick={handleEdit}
        className="p-2"
      >
        <svg
          fill="none"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-primary hover:text-green"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </form>
  );
}
