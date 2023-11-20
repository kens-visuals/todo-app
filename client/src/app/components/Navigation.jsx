import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function Navigation() {
  const session = await getServerSession(options);

  const navigation = [
    { name: 'Home', href: '/' },
    // { name: 'Sign Up', href: '/signup' },
    // { name: 'Login ', href: '/login' },
  ];

  return (
    <div className="flex justify-between mt-10 gap-4">
      <ul className="flex items-center gap-4">
        {navigation?.map(({ name, href }) => (
          <li
            key={name}
            className="text-dark-bg-primary dark:text-light-bg-primary"
          >
            <Link href={href}>{name}</Link>
          </li>
        ))}
        <li key="signinout">
          {session ? (
            <Link
              href="/api/auth/signout?callbackUrl=/"
              className="text-dark-bg-primary dark:text-light-bg-primary"
            >
              Sign out
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="text-dark-bg-primary dark:text-light-bg-primary"
            >
              Sign In
            </Link>
          )}
        </li>
      </ul>

      <div className="flex items-center">
        <span className="uppercase tracking-widest text-white">
          {session?.user?.name}
        </span>
        <img
          src={session?.user?.picture}
          alt="user"
          className="h-6 aspect-square"
        />
      </div>
    </div>
  );
}
