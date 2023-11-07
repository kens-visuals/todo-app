import { useState, useContext } from 'react';
import { useQueryClient, useMutation } from 'react-query';

import updateTodo from '../api/updateTodo';

import { TodosContext } from '../context/TodosContext';

import checkIcon from '../images/icon-check--dark.svg';

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
        <img src={checkIcon} alt="cross" aria-hidden className="mr-auto w-4" />
      </button>
    </form>
  );
}
