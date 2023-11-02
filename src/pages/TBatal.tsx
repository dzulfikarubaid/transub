import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import TabsPesanan from './TabsPesanan';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, setDoc, getDoc, getDocs, collection, onSnapshot, where, query} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useHistory } from 'react-router';
import { BiInfoCircle, BiLogoWhatsapp, BiMoney, BiTimer, BiWind } from 'react-icons/bi';
const Anter: React.FC = () => {
    const [user, setUser] = useState<any>(null)
    const [orders, setOrders] =useState<any>("")
    const history = useHistory() 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
      
            const orderCollection = collection(db, 'order');
      
            // Menggunakan query untuk mendapatkan data dengan nama (displayName) yang sama
            // dan hanya dengan status 'ready'
            const q = query(orderCollection, 
              where('name', '==', user.displayName), 
              where('status', '==', 'dibatalkan')
            );
      
            const snapshotUnsubscribe = onSnapshot(q, (querySnapshot:any) => {
              const ordersData = querySnapshot.docs.map((doc:any) => ({
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
      console.log(orders)
    return (
        <IonPage>
        
            <IonContent >
               <div className='w-full p-10 flex flex-col gap-4'>
               {
                orders !== null && orders.length > 0 ? 
                orders.map((order: any) => (
                    <div key={order.id} className='p-4 bg-gray-100 rounded-xl'>
                      <div className='flex flex-col gap-4'>
                        {order.avatar === null ? (
                          <div className='flex gap-4  items-center'>
                            <div className='rounded-full w-10 text-center p-2 bg-blue-500 text-white'>
                              {order.name.split(' ').map((kata: any) => kata[0]).join('').toUpperCase().substring(0, 2)}
                            </div>
                            <h1>{order.name}</h1>
                          </div>
                        ) : (
                          <div className='flex gap-4  items-center'>
                            <img className='rounded-full w-10 h-auto' src={order.avatar} alt='' />
                            <h1>{order.name}</h1>
                          </div>
                        )}
                       
                        <div className='flex flex-row gap-1 items-center'>
                          <BiTimer></BiTimer>
                        <h1>{order.waktu} menit</h1>
                        </div>
                        <div className='flex flex-row gap-1 items-center'>
                          <BiMoney></BiMoney>
                        <h1>Rp{order.price}</h1>
                        </div>
                      </div>
                      <div className='flex flex-row justify-between mt-4'>
                        <div className='flex flex-row gap-4 justify-center items-center text-center'>
                          <button
                            className=''
                            
                          >
                            <BiInfoCircle size={25}></BiInfoCircle>
                          </button>
                          <a href={`${user.displayName !== order.name ? `https://wa.me/${order.wa}` : 'app/driver'}`}>
                            <BiLogoWhatsapp color={`${user.displayName !== order.name ? '#25D366' : 'gray'}`} size={25}></BiLogoWhatsapp>
                          </a>
                        
                        </div>
                        <button
                          disabled={user.displayName === order.name}
                          className={`flex flex-row gap-3 items-center justify-center  p-2 rounded-xl text-white ${
                            user.displayName === order.name ? 'bg-gray-300' : 'bg-blue-900'
                          }`}
                        >
                          <h1>Gas</h1>
                          <BiWind></BiWind>
                        </button>
                      </div>
                    </div>
                  ))
                  :
                  <div>Belum ada pesanan</div>
               }
               </div>
            </IonContent>
        </IonPage>
    );
};

export default Anter;