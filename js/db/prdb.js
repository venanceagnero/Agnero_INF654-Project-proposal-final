// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";


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

const auth = getAuth(app);

//for profile
async function getMemData(db) {
    const profileCollect = collection(db, "profile");
    const profileSnapshot = await getDocs(profileCollect);
    const profileList = profileSnapshot.docs.map((doc) => doc);
    return profileList;
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


//using onSnapchot method for profile to track user activities
const prosub = onSnapshot(collection(db, "profile"), (doc) => {
    doc.docChanges().forEach((change) => {
        if (change.type === "added") {
            //call render function in ui
            renderProfile(change.doc.data(), change.doc.id);
        }

        if (change.type === "removed") {
            removeProfile(change.doc.id);
        }
    })
})

//create/add  profile
const form = document.querySelector("#signup-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    addDoc(collection(db, "profile"), {
        Firstname: form.fname.value,
        Lastname: form.lname.value,
        CityOfResidency: form.cofResidency.value,
        PhotoId: form.mphotoid.value,
    }).catch((error) =>
        console.log(error));
    form.fname.value = "";
    form.lname.value = "";
    form.cofResidency.value = "";
    form.mphotoid.value = "";
});

//listen to auth status changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in:", user.email);
        getMemData(db).then((snapshot) => {
            setUpMembData(snapshot);
        });
        setUpDataUI(user);
        const logform = document.querySelector("form");
        logform.addEventListener("submit", (e) => { e.preventDefault() });

    } else {
        console.log("User logged out!");
        setUpDataUI();
        setUpMembData([]);
    }
});

//delete profile
const deleteProfile = document.querySelector("#modal-account");
deleteProfile.addEventListener("click", (event) => {
    if (event.target.tagName === "I") {
        const pro_Id = event.target.getAttribute("data-id");
        deleteDoc(doc(db, "profile", pro_Id));
    }
})


//edit profile
const editProfile = document.querySelector("#modal-account");
editProfile.addEventListener("click", (event) => {
    if (event.target.tagName === "E") {
        const pro_Id = event.target.getAttribute("data-id");
        //edit handler here
    }
});
