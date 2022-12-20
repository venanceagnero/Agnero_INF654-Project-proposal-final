import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOIWnH5HjKcsbIQ_lYLiK15uD1zf2NIwk",
    authDomain: "cafridia.firebaseapp.com",
    projectId: "cafridia",
    storageBucket: "cafridia.appspot.com",
    messagingSenderId: "19210724650",
    appId: "1:19210724650:web:94f0aa3652f5f7d7086a53",
    measurementId: "G-HFH6TG21EE"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


//logout
const logout = document.querySelector("#log-out");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        console.log("User has logged out");
    }).catch((error) => {
        //error handler
    });
});


//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        //signed -in
        const user = userCredential.user;
        console.log(user);
        const userportal = document.querySelector("#modal-login");
        M.Modal.getInstance(userportal).close();
        loginForm.reset();
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
});
