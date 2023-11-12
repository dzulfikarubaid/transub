import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import TabsPesanan from './TabsPesanan';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, setDoc, getDoc, getDocs, collection, onSnapshot, where, query} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useHistory } from 'react-router';
import { BiInfoCircle, BiLogoWhatsapp, BiMoney, BiTimer, BiWind } from 'react-icons/bi';
import moment from 'moment';
const Selesai: React.FC = () => {
    const [user, setUser] = useState<any>(null)
    const [orders, setOrders] =useState<any>(null)
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
    const history = useHistory() 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
      
            const orderCollection = collection(db, 'order');
      
            // Query pertama: Pesanan dengan nama pengguna (name) yang sama dan status 'diantar'
            const q1 = query(orderCollection, 
              where('name', '==', user.displayName), 
              where('status', '==', 'selesai')
            );
      
            // Query kedua: Pesanan dengan id pengguna (driver) yang sama dan status 'diantar'
            const q2 = query(orderCollection, 
              where('driver', '==', user.uid), 
              where('status', '==', 'selesai')
            );
      
            // Mendapatkan hasil query pertama
            onSnapshot(q1, (querySnapshot1) => {
              const ordersData1 = querySnapshot1.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
      
              // Mendapatkan hasil query kedua
              onSnapshot(q2, (querySnapshot2) => {
                const ordersData2 = querySnapshot2.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
      
                // Menggabungkan hasil dari kedua query
                const combinedOrdersData = [...ordersData1, ...ordersData2];
      
                // Set state dengan hasil yang telah digabung
                setOrders(combinedOrdersData);
                
                // ... (lanjutkan logika penanganan jika perlu)
              });
            });
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
               <div className='w-full flex flex-col gap-6 p-2'>
               {
                orders !== null && orders.length > 0 ? 
                orders.map((order: any) => (
                    <div key={order.id} className='p-4 bg-white shadow-md border-[1px] rounded-xl'>
                      <div className='flex flex-col gap-4'>
                       <h1>{getTimeAgo(order.date)}</h1>
                        <div className='flex flex-row gap-4'>
                        <img className='w-[80px] h-fit' src="/selesai.png" alt="" />
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

export default Selesai;