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
      className="flex w-full items-center"
    >
      <input
        type="text"
        value={updatedTask}
        disabled={isUpdateMutationLoading}
        onChange={(e) => setUpdatedTask(e.target.value)}
        className={`mx-3 mr-auto w-10/12 rounded-md bg-light-bg-primary px-1 text-sm text-light-text-tertiary caret-blue outline-1 duration-150 focus-visible:outline focus-visible:outline-blue dark:bg-dark-bg-primary dark:text-dark-text-primary ${
          isEditing && 'border border-blue'
        }`}
      />
      <button type="button" onClick={handleEdit}>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
          <path
            fill="none"
            stroke="#FFF"
            strokeWidth="2"
            d="M1 4.304L3.696 7l6-6"
          />
        </svg>
      </button>
    </form>
  );
}
