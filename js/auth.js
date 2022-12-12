import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";


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


//create login
const createLogForm = document.querySelector("createLog-form");
createLogForm.addEventListener("Submit", (e) => {
    e.preventDefault();

    //get user info
    const email = createLogForm["cLog-email"].value;
    const password = createLogForm["cLog-password"].value;
    const confpassword = createLogForm["cLog-confPassword"].value;

    createUserWithEmailAndPassword(auth, email, password, confpassword).then((userCredential) => {
        //sighed -in
        const user = userCredential.user;
        console.log(user);

        const createLog = document.querySelector("create-log");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
})

//logout

const logout = document.querySelector("signout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        console.log("User has logout");
    }).catch((error) => {
        //error message
    });
});

//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm("login-email").value;
    const password = loginForm("login-pasword").value;

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        //sighed -in
        const user = userCredential.user;
        console.log(user);

        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });


});