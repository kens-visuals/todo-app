import { useState } from 'react';

export default function ActivityPanel({ todos, dispatch }) {
  const countOfCompletedTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="flex w-full items-center justify-between rounded-b-md bg-light-bg-primary py-3 px-4 dark:bg-dark-bg-primary">
      <span className="text-xs text-light-text-primary dark:text-dark-text-quaternary">
        {countOfCompletedTodos <= 1
          ? `${countOfCompletedTodos} item left`
          : `${countOfCompletedTodos} items left`}
      </span>

      <div className="hidden space-x-4 text-xs  text-light-text-primary hover:text-light-text-tertiary dark:text-dark-text-quaternary hover:dark:text-dark-text-secondary md:inline-block">
        <button type="button" className="font-bold">
          All
        </button>
        <button type="button" className="font-bold">
          Active
        </button>
        <button type="button" className="font-bold">
          Completed
        </button>
      </div>

      <button
        type="button"
        onClick={() => dispatch({ type: 'clear_completed' })}
        className="text-xs text-light-text-primary hover:text-light-text-tertiary dark:text-dark-text-quaternary hover:dark:text-dark-text-secondary"
      >
        Clear Completed
      </button>
    </div>
  );
}
