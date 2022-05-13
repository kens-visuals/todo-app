import crossIcon from '../images/icon-cross.svg';

export default function TodoItem({ id, todo, index }) {
  return (
    <li
      className={`relative flex w-full bg-light-bg-primary py-3 px-4 dark:bg-dark-bg-primary 
      ${index === 0 && 'rounded-t-md'} ${
        index >= 0 &&
        'border-b border-b-light-text-secondary dark:border-b-dark-text-quaternary'
      }`}
      key={id}
    >
      <button className="aspect-square h-5  rounded-full border border-light-text-secondary hover:border-blue dark:border-dark-text-tertiary dark:hover:border-blue"></button>

      <span
        className={`border-0 pl-3 text-sm text-light-text-tertiary caret-blue placeholder:text-sm placeholder:text-light-text-tertiary focus-visible:outline focus-visible:outline-blue dark:text-dark-text-quaternary placeholder:dark:text-dark-text-quaternary `}
      >
        {todo}
      </span>

      <button className="ml-auto">
        <img src={crossIcon} alt="cross" className="w-3.5" />
      </button>
    </li>
  );
}
