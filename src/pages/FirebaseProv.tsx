import { collection, getDoc, getDocs, getFirestore, DocumentData, DocumentSnapshot, doc, Firestore, setDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import React from 'react'
import { useHistory } from 'react-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
const FirebaseProv = ({children}:any) => {
    const [user, setUser] = React.useState<any>('');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user)
        // ...
      } else {
        useHistory().push('/signin');
      }
    })
  return (
    <div>{children}</div>
  )
}
export default FirebaseProv