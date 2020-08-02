import firebase from "firebase"

const firebaseApp = firebase.initializeAp({ // code directly from firebase, we grab 3 servers from firebase (db database) (auth for log in log out creat users etc) and (storage, how we upload a bunch of pictures etc..) );
    apiKey: "AIzaSyDiJ43IxyWmU5p8xOvXU79-bo8f8GOK81s",
    authDomain: "instagram-clone-9f92e.firebaseapp.com",
    databaseURL: "https://instagram-clone-9f92e.firebaseio.com",
    projectId: "instagram-clone-9f92e",
    storageBucket: "instagram-clone-9f92e.appspot.com",
    messagingSenderId: "891926326706",
    appId: "1:891926326706:web:09c821b03ec1dfbe1dc8ab",
    measurementId: "G-HD7SDXQX6C"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };


  // export default db;