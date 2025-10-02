// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

// Request permission and get FCM token
export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VAPID_PUBLIC_KEY,
    });
    if (token) {
      // console.log("FCM Token:", token);
      // send this token to your backend to save for sending push
    } else {
      // console.log("No registration token available");
    }
  } catch (err) {
    // console.error("An error occurred while retrieving token.", err);
  }
};

// Listen for messages when app is in foreground
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });