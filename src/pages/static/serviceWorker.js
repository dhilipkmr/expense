self.addEventListener('install', () => {
  console.log('Install Event');
});

self.addEventListener('activate', () => {
  console.log('Sw Activated');
});