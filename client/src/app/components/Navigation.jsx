import Link from 'next/link';

export default function Navigation() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Sign Up', href: '/signup' },
    { name: 'Login ', href: '/login' },
  ];

  return (
    <ul className="flex items-center gap-4 mt-10">
      {navigation?.map((nav) => (
        <li className="text-dark-bg-primary dark:text-light-bg-primary">
          <Link href={nav?.href}>{nav?.name}</Link>
        </li>
      ))}
    </ul>
  );
}
