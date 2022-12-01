import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: "facebook-clone-11056.firebaseapp.com",
    projectId: "facebook-clone-11056",
    storageBucket: "facebook-clone-11056.appspot.com",
    messagingSenderId: "534099856446",
    appId: "1:534099856446:web:ce35148ee78f3115e0156f",
    measurementId: "G-11MXXLNLX4",
  };

  const app = initializeApp(firebaseConfig);
  initUser();
  fetchFirestore();
  const auth = getAuth(app);
  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);
});

