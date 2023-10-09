import { IonButton, IonContent, IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, setDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { useHistory } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';

const Wa: React.FC = () => {
  const [user, setUser] = useState<any>('');
  const history = useHistory();
  const db = getFirestore();
  const [error, setError] = useState<string>('');
  const [wa, setWa] = useState<string>('');
  const [numberWa, setNumberWa] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        history.push('/signin');
      }
    });

    return () => unsubscribe();
  }, [history]);
  async function fetchNumberWa() {
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().wa) {
          history.push('/app');
        }
      }
    } catch (error) {
      console.error('Error fetching number WA:', error);
    }}
  useEffect(() => {
    setInterval(() => {
       fetchNumberWa()
    }, 500)
  },[])
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wa === '') {
      setError('Masukkan nomor WhatsApp kamu!');
    } else {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, { wa: wa }, { merge: true });
      // Tidak perlu push('/app') di sini, karena useEffect akan menangani perubahan numberWa
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className='h-full flex flex-1 items-center w-full justify-center'>
          <form className='flex flex-col justify-center items-center gap-6'>
            <h1 className='text-red-500 text-center p-2 rounded-xl w-full'>{error}</h1>
            <label htmlFor=''>WhatsApp Number</label>
            <input
              className='border-gray-900 border-2 p-3 focus:outline-blue-300 rounded-xl'
              type='text'
              onChange={(e) => setWa(e.target.value)}
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

export default Wa;
