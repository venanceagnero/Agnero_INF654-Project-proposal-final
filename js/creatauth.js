
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";


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
const createLogForm = document.querySelector("#createlogin-form");
createLogForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //get user info
    const email = createLogForm["cLog-email"].value;
    const password = createLogForm["cLog-password"].value;
    const confpassword = createLogForm["cLog-confPassword"].value;

    //verifying password match
    if (password === confpassword) {

        //create user credentials
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            const createLogModal = document.querySelector("#modal-createlogin");
            M.Modal.getInstance(createLogModal).close();
            createLogForm.reset();

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    } else {
        consol.log("Your password does not match!");
    }

})
