// // Give the service worker access to Firebase Messaging.
// // Note that you can only use Firebase Messaging here. Other Firebase libraries
// // are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

// // Initialize the Firebase app in the service worker by passing the generated config
// firebase.initializeApp({
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
//   measurementId: ""
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     icon: '/images/icons/512x512.png',
//     data: {
//       url: "/" + payload.data.activity_id
//     }
//   };

//   if (!payload.notification) {
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   }
// });

// // Notification click event listener
// self.addEventListener('notificationclick', e => {
//   // Close the notification popout
//   e.notification.close();
//   // Get all the Window clients
//   e.waitUntil(clients.matchAll({ type: 'window' }).then(clientsArr => {
//     console.log('clientsArr:', clientsArr)
//     // If a Window tab matching the targeted URL already exists, focus that;
//     const hadWindowToFocus = clientsArr.some(windowClient => windowClient.url === e.notification.data.url ? (windowClient.focus(), true) : false);
//     // Otherwise, open a new tab to the applicable URL and focus it.
//     if (!hadWindowToFocus) clients.openWindow(e.notification.data.url).then(windowClient => windowClient ? windowClient.focus() : null);
//   }));
// });
