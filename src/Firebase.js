import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
// import { initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBG9eTx7bgruTHz14bm8CIx9udbpVWGySU",
  authDomain: "e-commerce-f0b04.firebaseapp.com",
  databaseURL: "https://e-commerce-f0b04-default-rtdb.firebaseio.com",
  projectId: "e-commerce-f0b04",
  storageBucket: "e-commerce-f0b04.appspot.com",
  messagingSenderId: "36966543846",
  appId: "1:36966543846:web:4daa9ee2d16a753a8b2627",
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const database = getDatabase(app);
// const auth = initializeAuth(app);

// export { auth };
// export { database };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

// const auth = initializeAuth(app);

// export { auth };
export { database };
