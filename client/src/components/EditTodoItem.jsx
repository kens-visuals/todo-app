import { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import updateTodo from '../api/updateTodo';

import checkIcon from '../images/icon-check--dark.svg';

export default function EditTodoItem({ todo, isEditing, setIsEditing }) {
  const [updatedTask, setUpdatedTask] = useState(todo?.text);

  const queryClient = useQueryClient();

  console.log(todo);

  const { mutate: updateMutationTodo, isLoading: isUpdateMutationLoading } =
    useMutation({
      mutationFn: (todo) => updateTodo(todo),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
      },
    });

  // const handleEdit = () => {
  //   dispatch({
  //     type: 'edit',
  //     payload: { id: id, updatedTodo: updatedTask },
  //   });
  //   setIsEditing(false);
  // };

  const handleEdit = () => {
    updateMutationTodo({ ...todo, text: updatedTask });
    setIsEditing(false);
  };

  return (
    <form className="flex w-full items-center" action="#" onSubmit={handleEdit}>
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
