// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');
//importScripts('https://www.gstatic.com/firebase/init-compat.js');



const firebaseConfig = {
  apiKey: "AIzaSyBrSpSq0nhvIbV_N1UfnfAXdPSaX8V7W9U",
  authDomain: "trying-cloud-messaging.firebaseapp.com",
  projectId: "trying-cloud-messaging",
  storageBucket: "trying-cloud-messaging.firebasestorage.app",
  messagingSenderId: "214363828693",
  appId: "1:214363828693:web:1c8c2361de371926994d5c",
  measurementId: "G-2CBLGKFNS5",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
 