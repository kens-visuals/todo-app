import { useState } from 'react';

// assets
import checkIcon from '../images/icon-check.svg';

export default function EditTodoItem({ id, todo, dispatch, setIsEditing }) {
  const [updatedTask, setUpdatedTask] = useState(todo);

  const handleEdit = () => {
    dispatch({
      type: 'edit',
      payload: { id: id, updatedTodo: updatedTask },
    });
    setIsEditing(false);
  };

  return (
    <form className="flex w-full items-center" action="#" onSubmit={handleEdit}>
      <input
        type="text"
        value={updatedTask}
        onChange={(e) => setUpdatedTask(e.target.value)}
        className="mx-3 mr-auto w-10/12 rounded-sm border-0 bg-light-bg-primary text-light-text-tertiary caret-blue outline-2   duration-150 focus-visible:outline focus-visible:outline-blue dark:bg-dark-bg-primary dark:text-dark-text-quaternary"
      />
      <button onClick={handleEdit}>
        <img src={checkIcon} alt="cross" aria-hidden className="mr-auto w-4" />
      </button>
    </form>
  );
}
