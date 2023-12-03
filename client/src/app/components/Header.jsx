'use client';
import { useState, Fragment } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [show, setShow] = useState(false);

  const getHeader = (word) => (
    <ul className="flex items-center justify-start gap-1">
      {session?.user
        ? word.split('').map((letter, index) => (
            <Fragment key={index}>
              {letter === 'o' && word?.lastIndexOf('o') === index ? (
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
                <li className="text-7xl text-center font-bold leading-none uppercase text-primary dark:text-secondary">
                  {letter}
                </li>
              )}
            </Fragment>
          ))
        : word.split('').map((letter, index) => (
            <li
              key={index}
              className="text-7xl text-center font-bold leading-none uppercase text-primary dark:text-secondary"
            >
              {letter}
            </li>
          ))}
    </ul>
  );

  if (pathname === '/') {
    return getHeader('Home');
  } else if (pathname === '/todos') {
    return getHeader('Todo');
  } else if (pathname === '/routines') {
    return getHeader('Routine');
  }
}
