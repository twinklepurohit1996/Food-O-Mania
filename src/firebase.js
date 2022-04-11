import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAMNvGXfulap5VtimPtR5wU2wqOK9iuJP4",
    authDomain: "food-o-mania.firebaseapp.com",
    projectId: "food-o-mania",
    storageBucket: "food-o-mania.appspot.com",
    messagingSenderId: "775835076722",
    appId: "1:775835076722:web:6955d8af6549b99777daeb",
    measurementId: "G-D2M2KV6DTS"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();