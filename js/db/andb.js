// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
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

//for announcements
async function getAnnounce(db) {
    const announceCollect = collection(db, "announcements");
    const announceSnapshot = await getDocs(announceCollect);
    const announcementList = announceSnapshot.docs.map((doc) => doc);
    return announcementList;
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


//using onSnapchot method for announcements
const announcsub = onSnapshot(collection(db, "announcements"), (doc) => {
    doc.docChanges().forEach((change) => {
        if (change.type === "added") {
            //call render function in ui
            renderAnnouncement(change.doc.data(), change.doc.id);
        }

        if (change.type === "removed") {

        }
    })
})

//create/add announcement
const announceform = document.querySelector("form");
announceform.addEventListener("submit", (event) => {
    event.preventDefault();
    addDoc(collection(db, "announcements"), {
        Title: announceform.title.value,
        Date: announceform.date.value,
        Announcement: announceform.announcetext.value,

    }).catch((error) =>
        console.log(error));
    announceform.title.value = "";
    announceform.date.value = "";
    announceform.announcetext.value = "";

})