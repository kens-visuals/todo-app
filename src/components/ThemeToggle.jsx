import { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';

import sunIcon from '../images/icon-sun.svg';
import moonIcon from '../images/icon-moon.svg';

const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="rounded-full p-2 transition-all duration-500 ease-in-out">
      {theme === 'dark' ? (
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="cursor-pointer"
        >
          <img src={sunIcon} alt="sun" className="w-5" />
        </button>
      ) : (
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="cursor-pointer"
        >
          <img src={moonIcon} alt="moon" className="w-5" />
        </button>
      )}
    </div>
  );
};

export default ThemeToggler;
