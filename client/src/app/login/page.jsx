'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import login from '@/app/api/login';

export default function Login() {
  const queryClient = useQueryClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: loginMutation, isLoading: isLoginMutationLoading } =
    useMutation({
      queryKey: ['login'],
      mutationFn: ({ email, password }) => login(email, password),
      onSuccess: (data) => {
        console.log('Mutation Data:', data);

        queryClient.invalidateQueries(['login']);
      },
    });

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    loginMutation({ email, password });

    setEmail('');
    setPassword('');
  };

  if (isLoginMutationLoading) {
    return <div>Logging in...</div>;
  }

  return (
    <div className="text-white">
      <h1>Login</h1>

      <from
        action="POST"
        onSubmit={handleLoginSubmit}
        className="w-full flex items-center justify-center flex-col mt-4"
      >
        <input
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-md border-0 bg-light-bg-primary p-3 px-6 pl-12 text-sm text-light-text-tertiary caret-blue shadow-2xl shadow-black/20 placeholder:text-sm placeholder:text-light-text-secondary focus-visible:outline focus-visible:outline-blue dark:bg-dark-bg-primary dark:text-dark-text-primary placeholder:dark:text-dark-text-quaternary md:p-2 md:px-6 md:text-lg md:placeholder:text-lg"
        />
        <input
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-md border-0 bg-light-bg-primary p-3 px-6 pl-12 text-sm text-light-text-tertiary caret-blue shadow-2xl shadow-black/20 placeholder:text-sm placeholder:text-light-text-secondary focus-visible:outline focus-visible:outline-blue dark:bg-dark-bg-primary dark:text-dark-text-primary placeholder:dark:text-dark-text-quaternary md:p-2 md:px-6 md:text-lg md:placeholder:text-lg"
        />
        <button
          type="submit"
          onClick={handleLoginSubmit}
          className="w-full rounded-md border-0 bg-light-bg-primary p-3 px-6 pl-12 text-sm text-light-text-tertiary caret-blue shadow-2xl shadow-black/20 placeholder:text-sm placeholder:text-light-text-secondary focus-visible:outline focus-visible:outline-blue dark:bg-dark-bg-primary dark:text-dark-text-primary placeholder:dark:text-dark-text-quaternary md:p-2 md:px-6 md:text-lg md:placeholder:text-lg"
        >
          Login
        </button>
      </from>
    </div>
  );
}
