import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { IoArrowBack } from 'react-icons/io5';

const Setting: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<any>('');
  const [saldo, setSaldo] = useState<any>(0);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
  
        const orderCollection = collection(db, 'users');
  
        // Menggunakan query untuk mendapatkan data dengan nama (displayName) yang sama
        // dan hanya dengan status 'ready'
        const q = query(orderCollection, 
          where('email', '==', user.email)
        );
  
        const snapshotUnsubscribe = onSnapshot(q, (querySnapshot:any) => {
          const ordersData = querySnapshot.docs.map((doc:any) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSaldo(ordersData[0].saldo);
        });
  
        return () => snapshotUnsubscribe();
      } else {
        history.push('/signin');
      }
    });
  
    return () => unsubscribe();
  }, [history]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      history.push('/signin');
    } catch (error:any) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <IonPage>
      <IonContent className="">
        <div className='bg-white text-black p-6 h-full'>
          <div className='flex flex-row items-center gap-4'>
            <button onClick={() => history.goBack()}>
              <IoArrowBack size={25}></IoArrowBack>
            </button>
            <h1 className='font-bold text-xl'>Setting</h1>
          </div>
          <div className='bg-white text-gray-800 flex flex-col gap-4 p-4 rounded-2xl '>
            <Link to='/Setting-update' className='flex flex-row  gap-6 w-full py-4'>
              {!user?.photoURL ? (
                <div className='rounded-full w-12 text-center py-3 bg-blue-500 text-white'>
                  {user?.displayName && user.displayName.split(" ").map((kata: any) => kata[0]).join("").toUpperCase().substring(0, 2)}
                </div>
              ) : (
                <img src={user.photoURL} className='w-12 h-auto rounded-full'></img>
              )}
              <div className='flex flex-col gap-1'>
                <h3 className='font-bold'>{user?.displayName && user.displayName}</h3>
                <h3>{user?.email && user?.email}</h3>
              </div>
            </Link>
            <Link to={'/ketentuan-layanan'} className='flex flex-row gap-2 border-b-2 border-gray-400 pb-2'>
              <IonIcon icon={logOutOutline}></IonIcon>
              <h1>Ketentuan Layanan</h1>
            </Link>
            <div className=' flex flex-row items-center'>
              <button className='flex flex-row gap-2 border-b-2 border-gray-400 border-solid w-full pb-2' onClick={handleSignOut}>
                <span>
                  <IonIcon icon={logOutOutline}></IonIcon>
                </span>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Setting;
