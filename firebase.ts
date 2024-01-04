import * as firebase from 'firebase/app'
import { getAuth, onAuthStateChanged, getReactNativePersistence, initializeAuth, User, updateProfile, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    //YOUR FIREBASE CONFIG CREDENTIALS
    
};


const app = firebase.initializeApp(firebaseConfig)

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})


  const db = getFirestore(app);
  const auth = getAuth(app);


  export { db, auth, onAuthStateChanged, User, updateProfile, createUserWithEmailAndPassword }

