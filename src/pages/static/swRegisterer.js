if (navigator && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    .then(() => {
      console.log('Service Worker Registered');
    })
    .catch(() => {
      console.log('Failed to Register Service Worker');
    })
}