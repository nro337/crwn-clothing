import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDgHEpQbpFJh9RFRHcetQjm8Wu4fqXqHTI",
    authDomain: "crwn-db-9956e.firebaseapp.com",
    projectId: "crwn-db-9956e",
    storageBucket: "crwn-db-9956e.appspot.com",
    messagingSenderId: "773821991277",
    appId: "1:773821991277:web:87baa42aee93e00ad9f264"
  }

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('Error creating user', error.message);
    }
  }

  //may want this for other purposes
  return userRef;
}

export const auth = firebase.auth();
// eslint-disable-next-line
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
