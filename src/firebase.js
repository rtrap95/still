import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyCF2VxlieTTU1nwvYLKxc-D8UJjBVgDZ7g",
  authDomain: "sharespoti.firebaseapp.com",
  databaseURL: "https://sharespoti.firebaseio.com",
  projectId: "sharespoti",
  storageBucket: "sharespoti.appspot.com",
  messagingSenderId: "324150758722",
  appId: "1:324150758722:web:a3935e4229fd04ef"
};

let Firebase = firebase.initializeApp(config);

Firebase.firestore()
  .enablePersistence()
  .catch(err => console.log(err));

export default Firebase;
