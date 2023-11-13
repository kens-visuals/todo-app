'use client';

import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import signup from '@/app/api/signup';

export default function Signup() {
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const {
    mutate: signUpMutation,
    isLoading: isSignUpMutationLoading,
    isError: isSignUpError,
    error: signUpError,
  } = useMutation({
    queryKey: ['signup'],
    mutationFn: (user) => signup(user),
    onSuccess: (data) => {
      console.log('Mutation Data:', data);

      queryClient.invalidateQueries(['signup']);
    },
  });

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    signUpMutation({ name, email, password, passwordConfirm });

    setName('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  };

  if (isSignUpMutationLoading) {
    return <div>Signing up...</div>;
  }

  console.log('signUpError:', signUpError);

  return (
    <div className="text-white">
      <h1>Sign Up</h1>

      {isSignUpError && (
        <span className="text-red-500">{signUpError?.toString()}</span>
      )}

      <from
        action="POST"
        onSubmit={handleSignUpSubmit}
        className="w-full flex items-center justify-center flex-col mt-4 bg-dark-text-primary dark:bg-light-text-primary p-6 py-8 rounded-md"
      >
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded-md border-0 bg-light-bg-primary p-3 px-6 pl-12 text-sm text-light-text-tertiary caret-blue shadow-2xl shadow-black/20 placeholder:text-sm placeholder:text-light-text-secondary focus-visible:outline focus-visible:outline-blue dark:bg-dark-bg-primary dark:text-dark-text-primary placeholder:dark:text-dark-text-quaternary md:p-2 md:px-6 md:text-lg md:placeholder:text-lg"
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-md border-0 bg-light-bg-primary p-3 px-6 pl-12 text-sm text-light-text-tertiary caret-blue shadow-2xl shadow-black/20 placeholder:text-sm placeholder:text-light-text-secondary focus-visible:outline focus-visible:outline-blue dark:bg-dark-bg-primary dark:text-dark-text-primary placeholder:dark:text-dark-text-quaternary md:p-2 md:px-6 md:text-lg md:placeholder:text-lg"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-md border-0 bg-light-bg-primary p-3 px-6 pl-12 text-sm text-light-text-tertiary caret-blue shadow-2xl shadow-black/20 placeholder:text-sm placeholder:text-light-text-secondary focus-visible:outline focus-visible:outline-blue dark:bg-dark-bg-primary dark:text-dark-text-primary placeholder:dark:text-dark-text-quaternary md:p-2 md:px-6 md:text-lg md:placeholder:text-lg"
        />

        <input
          type="password"
          value={passwordConfirm}
          placeholder="Password Confirm"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="mb-4 w-full rounded-md border-0 bg-light-bg-primary p-3 px-6 pl-12 text-sm text-light-text-tertiary caret-blue shadow-2xl shadow-black/20 placeholder:text-sm placeholder:text-light-text-secondary focus-visible:outline focus-visible:outline-blue dark:bg-dark-bg-primary dark:text-dark-text-primary placeholder:dark:text-dark-text-quaternary md:p-2 md:px-6 md:text-lg md:placeholder:text-lg"
        />

        <button
          type="submit"
          onClick={handleSignUpSubmit}
          className="w-full rounded-md border-0 bg-light-bg-primary p-3 px-6 pl-12 text-sm text-light-text-tertiary caret-blue shadow-2xl shadow-black/20 placeholder:text-sm placeholder:text-light-text-secondary focus-visible:outline focus-visible:outline-blue dark:bg-dark-bg-primary dark:text-dark-text-primary placeholder:dark:text-dark-text-quaternary md:p-2 md:px-6 md:text-lg md:placeholder:text-lg"
        >
          Sign Up
        </button>
      </from>
    </div>
  );
}
