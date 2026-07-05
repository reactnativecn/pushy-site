(function () {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  // Don't register the SW on dev origins (its cache-first strategy pins stale
  // dev bundles); also clean up any previously installed registration.
  var DEV_HOSTNAMES = ['localhost', '127.0.0.1', '::1', '[::1]'];
  if (DEV_HOSTNAMES.indexOf(location.hostname) !== -1) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      registrations.forEach(function (registration) {
        registration.unregister();
      });
    });
    return;
  }

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function (error) {
      console.warn('PWA registration failed:', error);
    });
  });
})();
