'use client';

import { useEffect } from 'react';

import TodoList from '@/app/components/TodoList';
import TodoCollectionInput from '@/app/components/TodoCollectionInput';
import { registerServiceWorker } from './lib/registerServiceWorker';

export default function Home() {
  useEffect(() => {
    async function setupServiceWorker() {
      try {
        await registerServiceWorker();
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    }

    setupServiceWorker();

    // async funciton setupServiceWorker() {
    //   }
    // }
    // setupServiceWorker()
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker
    //     .register('/serviceWorker.js')
    //     .then((registration) => {
    //       console.log('Service worker registration successful:', registration);
    //     })
    //     .catch((error) => {
    //       console.log('Service worker registration failed:', error);
    //     });
    // }
  }, []);

  return (
    <>
      <TodoCollectionInput />

      <TodoList />
    </>
  );
}
