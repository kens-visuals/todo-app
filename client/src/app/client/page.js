'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Client() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/client');
    },
  });

  return (
    <div>
      Client
      <div className="flex items-center">
        <span className="uppercase tracking-widest text-white">
          {session?.user?.name}
        </span>
        <img
          src={session?.user?.image}
          alt="user"
          className="h-6 aspect-square"
        />
      </div>
    </div>
  );
}
