import { collection, getDocs, getFirestore, onSnapshot } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { IonButton, IonContent, IonFooter, IonModal, IonPage } from '@ionic/react';
import Routing from './TRouting';
import { FaCross, FaInfo, FaInfoCircle, FaTimes, FaWind } from 'react-icons/fa';
const db = getFirestore();
import './signin.css'
import DriverModal from './TDriverModal';
import { BiInfoCircle, BiLogoWhatsapp } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Driver: React.FC = () => {
  const [user, setUser] = useState<any>('');
  const [orders, setOrders] = useState<any[]>([]); // Inisialisasi state orders sebagai array

  const history = useHistory();
  const [modalData, setModalData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        const orderCollection = collection(db, 'order');

        const snapshotUnsubscribe = onSnapshot(orderCollection, (querySnapshot) => {
          const ordersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersData);
        });

        return () => snapshotUnsubscribe();
      } else {
        history.push('/signin');
      }
    });

    return () => unsubscribe();
  }, [history]);

  // const getOrders = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, 'order'));
  //     const ordersData = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setOrders(ordersData);
  //   } catch (error) {
  //     console.error('Error getting documents: ', error);
  //   }
  // };

  // Panggil fungsi untuk mendapatkan dokumen
 
  const [isOpen, setIsOpen] = useState(false);


  return (
    <IonPage>
      <IonContent>
        <div className={`flex flex-col gap-4 p-10 ${isOpen ? 'bg-gray-400/30' : ''}`}>
          <h1 className='font-bold text-xl'>Ayo antar</h1>
          {orders.map((order: any) => (
            <div key={order.id} className='p-4 bg-gray-100 rounded-xl'>
                <div className='flex flex-col gap-4'>
                  <h1>{order.name}</h1>
                  <h1>{order.date}</h1>
                    <h1>{order.distance}</h1>
                    <h1>{order.price}</h1>

                  
                </div>
              
              <div className='flex flex-row justify-between'>
              <div className='flex flex-row gap-4 justify-center items-center text-center'>
              <button className='' onClick={()=> {
                setModalData(order);
                setIsOpen(true);
              }} >
                <BiInfoCircle size={25} ></BiInfoCircle>
              </button>
              <a href={`${user.displayName !== order.name ? `https://wa.me/${order.wa}` : 'app/driver'}`} >
                <BiLogoWhatsapp color={`${user.displayName !== order.name ? '#25D366' : 'gray'}`} size={25} ></BiLogoWhatsapp>
              </a>
              
              </div>
              <button disabled={user.displayName === order.name} className={`flex flex-row gap-3 items-center justify-center  p-2 rounded-xl text-white ${user.displayName === order.name ? 'bg-gray-300':'bg-blue-900'}`}>
                <h1>
                  Gas
                </h1>
                <FaWind></FaWind>
              </button>
              </div>
              
            </div>
          ))}
        </div>
      </IonContent>
      {
                isOpen ?
                <IonFooter >
                   
                  <div className='p-4 relative bg-white h-fit  w-full rounded-3xl pb-2  -translate-y-4'>
                    <div className='flex flex-row-reverse mb-10'>
                        <FaTimes size={25} onClick={() => setIsOpen(false)}></FaTimes>
                    </div>
            
                    <Routing x1={modalData.location.lat} y1={modalData.location.lng} x2={modalData.destination.lat} y2={modalData.destination.lng}/>
          
                    <div className='flex flex-col gap-3 p-4'>
                    <h1 className='font-bold'>Jemput di</h1>
                    <h1>{modalData.titikjemput}</h1>
                    <h1 className='font-bold'>Antar ke</h1>
                    <h1>{modalData.titikantar}</h1>
                    </div>
                  
                  </div>
    

                </IonFooter>
                
                :
                null
              }
    </IonPage>
  );
};

export default Driver;
