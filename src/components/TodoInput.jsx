import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// assets
import { ACTIONS } from '../App';

export default function TodoInput({ dispatch }) {
  const [task, setTask] = useState('');

  const handleTodos = (text) => {
    dispatch({
      type: ACTIONS.ADD,
      payload: { id: uuidv4(), task: text, completed: false },
    });

    setTask('');
  };

  return (
    <div className="pt-8">
      <form action="#" className="w-full" onSubmit={() => handleTodos(task)}>
        <label htmlFor="todo-input" className="relative">
          <div className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 rounded-full border border-light-text-secondary  dark:border-dark-text-tertiary"></div>

          <input
            type="text"
            value={task}
            id="todo-input"
            onChange={(e) => setTask(e.target.value)}
            placeholder="Creacte a new todo..."
            className="w-full rounded-md border-0 bg-light-bg-primary p-3 px-6 pl-12 text-sm text-light-text-tertiary caret-blue placeholder:text-sm placeholder:text-light-text-secondary focus-visible:outline focus-visible:outline-blue dark:bg-dark-bg-primary dark:text-dark-text-primary placeholder:dark:text-dark-text-quaternary"
          />
        </label>
      </form>
    </div>
  );
}
