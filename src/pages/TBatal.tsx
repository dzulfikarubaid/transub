import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import TabsPesanan from './TabsPesanan';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, setDoc, getDoc, getDocs, collection, onSnapshot, where, query} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useHistory } from 'react-router';
import { BiInfoCircle, BiLogoWhatsapp, BiMoney, BiTimer, BiWind } from 'react-icons/bi';
import moment from 'moment';
const Anter: React.FC = () => {
    const [user, setUser] = useState<any>(null)
    const [orders, setOrders] =useState<any>("")
    const history = useHistory() 
    const getTimeAgo = (date: string) => {
      const now = moment();
      const orderDate = moment(date);
      const diff = now.diff(orderDate, 'minutes');
  
      if (diff < 60) {
        return `${diff} menit yang lalu`;
      } else if (diff < 1440) {
        return `${Math.floor(diff / 60)} jam yang lalu`;
      } else {
        return orderDate.format('MMMM D, YYYY [at] h:mm A');
      }
    };
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
               <div className='w-full p-2 flex flex-col gap-4'>
               {
                orders !== null && orders.length > 0 ? 
                orders.map((order: any) => (
                  <div key={order.id} className='p-4 bg-white shadow-md border-[1px] rounded-xl'>
                  <div className='flex flex-col gap-4'>
                   <h1>{getTimeAgo(order.date)}</h1>
                    <div className='flex flex-row gap-4'>
                    <img className='w-[80px] h-fit' src="/batal.png" alt="" />
                      <div>
                      <h1 className='font-semibold text-sm'>{order.titikjemput}</h1>
                      <div className='flex flex-row gap-1 items-center'>
                      <BiTimer></BiTimer>
                    <h1>{order.waktu} menit</h1>
                    </div>
                    <div className='flex flex-row gap-1 items-center'>
                      <BiMoney></BiMoney>
                    <h1>Rp{order.price}</h1>
                    </div>
                      </div>
                    
                    </div>
                  </div>
                  <div className='flex flex-row justify-between mt-4'>
                    <div className='flex flex-row gap-4 justify-center items-center text-center'>
                      <button
                        className=''
                        
                      >
                        <BiInfoCircle size={25}></BiInfoCircle>
                      </button>
     
                    
                    </div>
                  
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