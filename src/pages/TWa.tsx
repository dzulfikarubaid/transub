import { IonButton, IonContent, IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, setDoc, onSnapshot, getDoc, collection } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { useHistory } from 'react-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const db = getFirestore();
const WhatsApp: React.FC = () => {
    // const [user, setUser] = React.useState<any>('');
    const history = useHistory()
    const [waNumber, setWaNumber] = useState<string>('');
    const [error, setError] = useState('')
    const auth = getAuth();
    var user =  auth.currentUser;
    useEffect(()=>{
      setInterval(()=>{
        user = auth.currentUser; 
        
      }, 1000)
    },[])

    
    
    const handleSubmit = (e:any) =>{
        e.preventDefault();
        if(user){
          setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL || '',
            wa: waNumber
          }).then(
            (res) =>{
                history.push('/app')
            }
          )
          .catch((error) => {
            setError(error.message.slice(10))
          })
        }
        
           
    }
    return (
        <IonPage>
            
            <IonContent>
            <div className='h-full flex flex-1 items-center w-full justify-center'>
          <form className='flex flex-col justify-center items-center gap-6'>
            <h1 className='text-red-500 text-center p-2 rounded-xl w-full'>{error}</h1>
            <label htmlFor=''>WhatsApp Number</label>
            <input
              className='border-gray-900 border-2 p-3 focus:outline-blue-300 rounded-xl w-full'
              type='text'
              onChange={(e:any) => setWaNumber(e.target.value)}
              placeholder='Masukkan nomor WA kamu'
            />
            <IonButton className='gradient capitalize' onClick={handleSubmit}>
              Simpan
            </IonButton>
          </form>
        </div>
            </IonContent>
        </IonPage>
    );
};

export default WhatsApp;