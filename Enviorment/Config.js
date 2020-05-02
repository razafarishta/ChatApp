import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDK9TsO-pQ04GlAfcAf_wLfSJPPqaYneY4",
    authDomain: "chatapp-8429a.firebaseapp.com",
    databaseURL: "https://chatapp-8429a.firebaseio.com",
    projectId: "chatapp-8429a",
    storageBucket: "chatapp-8429a.appspot.com",
    messagingSenderId: "697775477567",
    appId: "1:697775477567:web:ca34609ecefc59af63b98a"
  };
  // Initialize Firebase
 const firebaseApp= firebase.initializeApp(firebaseConfig);
 export const firebaseAuth =firebaseApp.auth();
