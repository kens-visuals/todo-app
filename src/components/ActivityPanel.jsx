export default function ActivityPanel({ todos, dispatch, show, setShow }) {
  const countOfCompletedTodos = todos.filter((todo) => !todo.completed).length;

  function showAllTasks() {
    Object.keys(show).forEach((key) => (show[key] = false));
    setShow((prevState) => ({ all: true }));
  }

  function showActiveTasks() {
    Object.keys(show).forEach((key) => (show[key] = false));
    setShow({ completed: true });
  }

  function showCompletedTasks() {
    Object.keys(show).forEach((key) => (show[key] = false));
    setShow({ active: true });
  }

  return (
    <div className="flex w-full items-center justify-between rounded-b-md bg-light-bg-primary py-3 px-4 dark:bg-dark-bg-primary">
      <span className="text-xs text-light-text-primary dark:text-dark-text-quaternary">
        {countOfCompletedTodos <= 1
          ? `${countOfCompletedTodos} item left`
          : `${countOfCompletedTodos} items left`}
      </span>

      <div className="hidden space-x-4 md:inline-block">
        <button
          type="button"
          className="text-xs font-bold text-light-text-primary hover:text-light-text-tertiary dark:text-dark-text-quaternary hover:dark:text-dark-text-secondary"
          onClick={showAllTasks}
        >
          All
        </button>
        <button
          type="button"
          className="text-xs font-bold text-light-text-primary hover:text-light-text-tertiary dark:text-dark-text-quaternary hover:dark:text-dark-text-secondary"
          onClick={showActiveTasks}
        >
          Active
        </button>
        <button
          type="button"
          className="text-xs font-bold text-light-text-primary hover:text-light-text-tertiary dark:text-dark-text-quaternary hover:dark:text-dark-text-secondary"
          onClick={showCompletedTasks}
        >
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
