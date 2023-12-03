'use client';

import { useState, useEffect, useRef } from 'react';

export default function Routines() {
  const numbers = Array.from({ length: 50 }, (_, index) => index + 1);

  const containerRef = useRef(null);

  const [currentDay, setCurrentDay] = useState(3);
  const [leftOfSelectedButton, setLeftOfSelectedButton] = useState(0);
  const [rightOfSelectedButton, setRightOfSelectedButton] = useState(0);

  // useEffect(() => {
  //   const container = containerRef.current;

  //   if (container) {
  //     const buttonWidth = 80;
  //     const visibleButtons = Math.floor(container.clientWidth / buttonWidth);
  //     const middleButton = Math.floor(visibleButtons / 2);

  //     const selectedButtonIndex = currentDay - 1;
  //     const leftOfSelectedButton = selectedButtonIndex - 1;
  //     const rightOfSelectedButton = selectedButtonIndex + 1;

  //     setLeftOfSelectedButton(leftOfSelectedButton);
  //     setRightOfSelectedButton(rightOfSelectedButton);

  //     const scrollPosition =
  //       selectedButtonIndex * buttonWidth - middleButton * buttonWidth;

  //     container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  //   }
  // }, [currentDay]);

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
    <div className="">
      <ul
        ref={containerRef}
        className="flex snap-x snap-proximity overflow-x-auto max-w-full no-scrollbar my-4 pr-1 w-full"
      >
        {numbers.map((number, index) => (
          <li key={number} className="relative">
            {getTopMarks(number)}
            <button
              type="button"
              onClick={() => setCurrentDay(number)}
              className={`relative w-20 flex-shrink-0 hover:cursor-pointer snap-start rounded-b-lg hover:bg-primary/20 dark:hover:bg-secondary/20 dark:hover:text-yellow hover:text-green py-2 pt-4 ${
                currentDay === number
                  ? 'text-green dark:text-yellow text-5xl dark:bg-secondary/20 bg-primary/20'
                  : 'text-primary/50 dark:text-tertiary/50 h-max'
              } ${
                (leftOfSelectedButton === number ||
                  rightOfSelectedButton === number) &&
                'text-2xl'
              } }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
