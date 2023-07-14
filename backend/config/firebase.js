// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore  } = require("firebase/firestore");
const { getAuth  } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApaVitEBxGtt0Dwm7X7VeFHRbPDzFjrK4",
  authDomain: "xtremegamingv2-fd143.firebaseapp.com",
  projectId: "xtremegamingv2-fd143",
  storageBucket: "xtremegamingv2-fd143.appspot.com",
  messagingSenderId: "433091617056",
  appId: "1:433091617056:web:3fde04b708c02e3b973745"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);

module.exports = {
    db, auth
}