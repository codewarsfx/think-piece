import  firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'




const configObj={
    apiKey: "AIzaSyDwMrsixk8jssJ_cbtay-lIVVRNVxd5LFQ",
    authDomain: "thinkpiece-bbbb8.firebaseapp.com",
    projectId: "thinkpiece-bbbb8",
    storageBucket: "thinkpiece-bbbb8.appspot.com",
    messagingSenderId: "319125769938",
    appId: "1:319125769938:web:2f4ce480dff1c0f93c270b",
    measurementId: "G-SXNSM2FCKG"
  };

  firebase.initializeApp(configObj)

  
  export const firestore= firebase.firestore()
  
  export const auth= firebase.auth()
  
  export const  googleProvider=new firebase.auth.GoogleAuthProvider()
  
  
  
  export default firebase