'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  const [show, setShow] = useState(false);

  return (
    <ul className="flex items-center justify-start gap-1">
      {'Tod'.split('').map((letter) => (
        <li className="text-7xl text-center font-bold leading-none uppercase text-primary dark:text-secondary ">
          {letter}
        </li>
      ))}
      {session ? (
        <li
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className={`rounded-full border-primary dark:border-secondary border-8 mt-1.5 ml-1 ${
            show ? 'w-full pr-4' : 'w-max'
          }`}
        >
          <div className="flex items-center gap-2 justify-between filter grayscale hover:filter-none cursor-pointer">
            <img
              alt="user"
              src={session?.user?.picture}
              className="h-10 aspect-square rounded-full"
            />
            {show && (
              <span className="uppercase text-sm tracking-widest text-white">
                {session?.user?.name}
              </span>
            )}
          </div>
        </li>
      ) : (
        <li className="text-7xl text-center font-bold leading-none uppercase text-secondary dark:text-primary ">
          o
        </li>
      )}
    </ul>
  );
}
