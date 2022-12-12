// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

const db = getFirestore(app);

//for message
async function getMessage(db) {
    const messageCollect = collection(db, "messages");
    const messageSnapshot = await getDocs(messageCollect);
    const messageList = messageSnapshot.docs.map((doc) => doc);
    return messageList;
}


enableIndexedDbPersistence(db)
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            console.log("Persistente failed")
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            console.log("Persistente is not valid")
        }
    });

//using onSnapchot method for message
const messagesub = onSnapshot(collection(db, "messages"), (doc) => {
    doc.docChanges().forEach((change) => {
        if (change.type === "added") {
            //call render function in ui
            renderMessage(change.doc.data(), change.doc.id);
        }

        if (change.type === "removed") {
            // removeMessage(change.doc.id)

        }
    })
})

//write/add message
const messageform = document.querySelector("form");
messageform.addEventListener("submit", (event) => {
    event.preventDefault();
    addDoc(collection(db, "messages"), {
        Message: messageform.messageBox.value,

    }).catch((error) =>
        console.log(error));
    messageform.messageBox.value = "";

})


//delete message
const messageContainer = document.querySelector(".listcontainer");
messageContainer.addEventListener("click", (event) => {

    //console.log(event);
    if (event.target.tagName === "I") {
        const id = event.target.getAttribute("data-id");
        deleteDoc(doc(db, "messages", id))
    }

});