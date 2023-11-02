import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { bookOutline, createOutline, logOutOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { FaMoneyBillAlt, FaToolbox } from 'react-icons/fa';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import {BsGear} from 'react-icons/bs'
import { collection, query, where, onSnapshot } from 'firebase/firestore';
const Profile: React.FC = () => {
    const history = useHistory()
    const [user, setUser] = useState<any>('')
    const handleSignOut=()=>{
        signOut(auth)
        history.push('/signin')
    }
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

    const [isOpen, setIsOpen] = useState(false)
    return (
        <IonPage>
            <IonContent className="">
           
            <div className='bg-gradient-to-b from-blue-900 to-blue-500 text-white p-6 h-full'>
                {/* <div className='flex flex-col gap-5'> */}
                <div className='flex-row flex justify-between items-center'>
                <div className='flex flex-row  gap-6 w-full py-4'>
                    {!user.photoURL ?
                    <div className='rounded-full text-center p-3 bg-blue-500 text-white'>
                        {user?.displayName && user.displayName.split(" ").map((kata:any)=>kata[0]).join("").toUpperCase().substring(0,2)}
                    </div>
                    :
                    <img src={user.photoURL} className='w-10 h-auto rounded-full'></img>}
                    <div className='flex flex-col gap-1'>
                    <h3 className='font-bold'>{user?.displayName && user.displayName}</h3>
                    <h3>{user?.email && user?.email}</h3>
                    </div>
                </div>
                <button onClick={()=>history.push('/setting')}><BsGear size={25}></BsGear></button>
                </div>

              
                <div className='flex flex-col gap-4 justify-center'>
                    <div className='rounded-2xl bg-white text-gray-800 p-4 flex flex-col gap-4'>
                        <h1>Main Balance</h1>
                        <h1 className='text-3xl font-semibold'>Rp{saldo}</h1>
                    </div>
                    <div className='flex flex-row justify-center gap-4 text-gray-800'>
                        <button onClick={()=>history.push('/deposit')} className='p-2 py-4 bg-white rounded-xl w-1/2 flex justify-center items-center gap-1'><GiPayMoney></GiPayMoney><h1>Deposit</h1></button>
                        <button className='p-2 py-4 bg-white rounded-xl w-1/2 flex items-center justify-center gap-1'><GiReceiveMoney></GiReceiveMoney><h1>Tarik Tunai</h1></button>
                    </div>
                    <h1>Riwayat Transaksi</h1>
                    <div className='bg-white p-4 text-gray-800 rounded-2xl text-sm flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                        <h1 className='bg-blue-700 text-white p-2  px-3 rounded-xl w-fit'>Driver</h1>
                        <div className='flex flex-row justify-between pb-2'>
                        <h1>Pengantaran ke balai kota surabaya</h1>
                        <h1>+Rp8000</h1>
                        </div>
                        </div>
                        
                        
                    </div>
                    <div className='bg-white p-4 text-gray-800 rounded-2xl text-sm flex flex-col gap-4'>
                    <div className='flex flex-col gap-2  '>
                        <h1 className='bg-gray-400 text-white p-2  px-3 rounded-xl w-fit'>Passenger</h1>
                        <div className='flex flex-row justify-between pb-2'>
                        <h1>Diantar ke ITS</h1>
                        <h1>-Rp6000</h1>
                        </div>
                      
                        </div>
                        
                    </div>
                </div>
                {
                    isOpen && 
                    <div className='bg-white text-gray-800 flex flex-col gap-4 p-4 rounded-2xl mt-10 absolute top-0 h-full'>
                    <Link to={'/ketentuan-layanan'} className='flex flex-row gap-2'>
                        <IonIcon icon={bookOutline}></IonIcon>
                        <h1>Ketentuan Layanan</h1>
                        </Link>
                        <div className=' flex flex-row items-center'>
                    <button className='flex flex-row gap-2' onClick={handleSignOut}><span><IonIcon icon={logOutOutline}></IonIcon></span>Sign Out</button>
                   </div>
                </div>
                }
                
            </div>
            </IonContent>
        </IonPage>
    );
};

export default Profile;