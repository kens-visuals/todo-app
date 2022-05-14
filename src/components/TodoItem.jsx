import { useState } from 'react';

// components
import EditTodoItem from './EditTodoItem';

// assets
import crossIcon from '../images/icon-cross.svg';
import checkIcon from '../images/icon-check.svg';
import pencilIcon from '../images/icon-pencil.svg';

export default function TodoItem({ id, todo, completed, index, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li
      key={id}
      className={`flex w-full items-center bg-light-bg-primary py-3 px-4 dark:bg-dark-bg-primary md:p-5 md:px-6 
      ${index === 0 && 'rounded-t-md'} ${
        index >= 0 &&
        'border-b border-b-light-text-secondary dark:border-b-dark-text-quaternary'
      }`}
    >
      <button
        type="button"
        aria-label="complete"
        onClick={() => dispatch({ type: 'complete', payload: { id: id } })}
        className={`flex aspect-square h-5 items-center justify-center rounded-full border border-light-text-secondary hover:border-blue dark:border-dark-text-tertiary dark:hover:border-blue md:h-6
        ${completed && 'bg-button-gradient'}`}
      >
        {completed && (
          <img src={checkIcon} alt="check" aria-hidden className="h-2" />
        )}
      </button>

      {isEditing ? (
        <EditTodoItem
          id={id}
          todo={todo}
          dispatch={dispatch}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <span
          className={`w-[75%] overflow-scroll px-3 text-sm text-light-text-tertiary transition-all duration-300 focus-visible:outline focus-visible:outline-blue dark:text-dark-text-primary md:w-[85%] md:px-5 md:text-lg
          ${
            completed &&
            'text-light-text-secondary line-through dark:text-dark-text-secondary'
          } `}
        >
          {todo}
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
            onClick={() => dispatch({ type: 'remove', payload: { id: id } })}
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
