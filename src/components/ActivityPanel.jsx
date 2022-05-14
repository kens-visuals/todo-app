export default function ActivityPanel({ todos, dispatch, show, setShow }) {
  const sections = ['all', 'active', 'completed'];

  const countOfCompletedTodos = todos.filter((todo) => !todo.completed).length;

  const sectionsButtons = sections.map((section, index) => {
    return (
      <button
        key={index}
        type="button"
        className={`text-xs font-bold text-light-text-primary hover:text-light-text-tertiary dark:text-dark-text-quaternary hover:dark:text-dark-text-secondary 
        ${Object.keys(show)[0] === section && 'text-blue dark:text-blue'}`}
        onClick={() => setShow({ [section]: true })}
      >
        {section.replace(/^\w/, (c) => c.toUpperCase())}
      </button>
    );
  });

  return (
    <>
      <div className="flex w-full items-center justify-between rounded-b-md bg-light-bg-primary py-3 px-4 dark:bg-dark-bg-primary">
        <span className="text-xs text-light-text-primary dark:text-dark-text-quaternary">
          {countOfCompletedTodos <= 1
            ? `${countOfCompletedTodos} item left`
            : `${countOfCompletedTodos} items left`}
        </span>

        <div className="hidden space-x-4 md:inline-block">
          {sectionsButtons}
        </div>

        <button
          type="button"
          onClick={() => dispatch({ type: 'clear_completed' })}
          className="text-xs text-light-text-primary hover:text-light-text-tertiary dark:text-dark-text-quaternary hover:dark:text-dark-text-secondary"
        >
          Clear Completed
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-4 rounded-md bg-light-bg-primary py-3 px-4 dark:bg-dark-bg-primary md:hidden">
        {sectionsButtons}
      </div>
    </>
  );
}
