export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service worker not supported');
  }

  const publicVapidKey =
    'BEgTSeiuPVvvwdaC-5j1Z6t1Oae2kxyS7ypNOO-SqcfiZSvpP30_ZQ4z9W-STw-6sVsF9mBuc1tprBXAfaHp2iM';

  const register = await navigator.serviceWorker.register('/serviceWorker.js', {
    scope: '/',
  });

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });

  await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getReadyServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service worker not supported');
  }

  return navigator.serviceWorker.ready;
};
