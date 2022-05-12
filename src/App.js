import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';

// assets
// import sunIcon from './images/icon-sun.svg';

function App() {
  return (
    <div className="min-h-screen w-full bg-light-bg-primary dark:bg-dark-bg-primary">
      <div className="md:dark:bg-hero-desktop--dark--dark h-screen bg-hero-mobile--light bg-contain bg-no-repeat dark:bg-hero-mobile--dark md:bg-hero-desktop--light">
        <div className=" mx-auto w-[87%] max-w-lg py-12">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold uppercase tracking-[.8rem] text-white">
              Todo
            </h1>
            <ThemeToggle />
            {/* <button type="button">
              <img src={sunIcon} alt="sun icon" className="w-5" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
