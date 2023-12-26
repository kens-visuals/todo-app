export async function getCurrentPushSubscription() {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service worker not supported');
  }

  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.getSubscription();

  return subscription;
}
