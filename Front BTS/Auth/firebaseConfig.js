import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDbs_wllPKX979Gz1vRp3u02JdflKv9Mro",
    authDomain: "auth-bts.firebaseapp.com",
    projectId: "auth-bts",
    storageBucket: "auth-bts.appspot.com",
    messagingSenderId: "372323758560",
    appId: "1:372323758560:web:6fdddd2580808d62423b85"
};

const app = initializeApp(firebaseConfig);

export default app;
