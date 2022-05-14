import { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';

import sunIcon from '../images/icon-sun.svg';
import moonIcon from '../images/icon-moon.svg';

const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="rounded-full py-2 transition-all duration-500 ease-in-out">
      {theme === 'dark' ? (
        <button
          type="button"
          className="cursor-pointer"
          aria-label="toggle light mode"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <img src={sunIcon} alt="sun" className="w-5 md:w-6" />
        </button>
      ) : (
        <button
          type="button"
          className="cursor-pointer"
          aria-label="toggle dark mode"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <img src={moonIcon} alt="moon" className="w-5 md:w-6" />
        </button>
      )}
    </div>
  );
};

export default ThemeToggler;
