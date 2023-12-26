'use client';

import { useState, useEffect, useRef } from 'react';

export default function Routines() {
  const numbers = Array.from({ length: 50 }, (_, index) => index + 1);

  const containerRef = useRef(null);

  const [currentDay, setCurrentDay] = useState(3);
  const [leftOfSelectedButton, setLeftOfSelectedButton] = useState(0);
  const [rightOfSelectedButton, setRightOfSelectedButton] = useState(0);
  const [habits, setHabits] = useState([
    { id: 1, text: 'Read for 30 minutes', completed: false },
    { id: 2, text: 'Exercise for 45 minutes', completed: true },
    { id: 3, text: 'Meditate for 10 minutes', completed: false },
    { id: 4, text: 'Write in journal', completed: true },
  ]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const buttonWidth = 80;

      const scrollPosition = container.scrollLeft;
      const visibleButtons = Math.floor(container.clientWidth / buttonWidth);
      const middleButton = Math.floor(visibleButtons / 2);

      const selectedButtonIndex =
        Math.round(scrollPosition / buttonWidth + middleButton) + 1;

      const leftOfSelectedButton = selectedButtonIndex - 1;
      const rightOfSelectedButton = selectedButtonIndex + 1;

      setLeftOfSelectedButton(leftOfSelectedButton);
      setRightOfSelectedButton(rightOfSelectedButton);

      setCurrentDay(selectedButtonIndex);
    }
  };

  const handleToggleCompletion = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const getTopMarks = (number) => (
    <>
      <div
        className={`absolute top-0 left-3 h-2 rounded-b-md w-0.5 ${
          currentDay === number
            ? 'bg-green dark:bg-yellow'
            : 'bg-green/50 dark:bg-yellow/50'
        }`}
      />
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 h-4 rounded-b-md ${
          currentDay === number
            ? 'bg-green dark:bg-yellow w-1'
            : 'bg-green/50 dark:bg-yellow/50 w-0.5'
        }`}
      />
      <div
        className={`absolute top-0 right-3 h-2 rounded-b-md w-0.5 ${
          currentDay === number
            ? 'bg-green dark:bg-yellow'
            : 'bg-green/50 dark:bg-yellow/50'
        }`}
      />
    </>
  );

  return (
    <div>
      <input
        type="text"
        name="routines"
        placeholder="create a routine..."
        className="w-full rounded-xl text-xl border-0 bg-green px-4 py-6 text-tertiary caret-dark-green shadow-2xl shadow-black/20 placeholder:text-secondary focus-visible:outline focus-visible:outline-dark-green dark:bg-yellow dark:text-primary placeholder:dark:text-primary/50 md:p-4 md:text-lg md:placeholder:text-xl placeholder:tracking-wide"
      />

      <ul
        ref={containerRef}
        className="flex snap-x snap-proximity overflow-x-auto max-w-full no-scrollbar my-4 pr-1 w-full"
      >
        {numbers.map((number) => (
          <li key={number} className="relative">
            {getTopMarks(number)}
            <button
              type="button"
              onClick={() => setCurrentDay(number)}
              className={`relative w-20 flex-shrink-0 hover:cursor-pointer snap-start rounded-b-lg hover:bg-primary/20 dark:hover:bg-secondary/20 dark:hover:text-yellow hover:text-green py-2 pt-4 ${
                currentDay === number
                  ? 'text-green dark:text-yellow text-5xl dark:bg-secondary/20 bg-primary/20'
                  : 'text-primary/50 dark:text-tertiary/50 h-max'
              } 
              ${
                leftOfSelectedButton === number ||
                rightOfSelectedButton === number
                  ? 'text-2xl'
                  : (leftOfSelectedButton - 1 !== number ||
                        rightOfSelectedButton + 1 !== number) &&
                      currentDay !== number
                    ? 'text-xs !opacity-30'
                    : ''
              }
            `}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>

      <ul className="space-y-4">
        {habits.map((habit) => (
          <li key={habit.id} className="flex items-center">
            <label
              htmlFor={`habit${habit.id}`}
              className={`text-lg ${habit.completed ? 'line-through' : ''}`}
            >
              <input
                type="checkbox"
                className="mr-4"
                id={`habit${habit.id}`}
                checked={habit.completed}
                onChange={() => handleToggleCompletion(habit.id)}
              />

              {habit.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
