importScripts("https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCctfe3oKKY5-y-iZaEA4qDopFsgqupZEA",
  authDomain: "orato-service.firebaseapp.com",
  projectId: "orato-service",
  messagingSenderId: "680811163000",
  appId: "1:680811163000:web:19391ec9eb3e2b4ee0ac8d",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Mensaje recibido en segundo plano:", payload);
  // Mostrar una notificación nativa
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});
