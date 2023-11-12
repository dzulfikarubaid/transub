import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import TabsPesanan from './TabsPesanan';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, setDoc, getDoc, getDocs, collection, onSnapshot, where, query, doc} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useHistory } from 'react-router';
import { BiInfoCircle, BiLogoWhatsapp, BiMoney, BiTimer, BiWind } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import moment from 'moment';
const Tunggu: React.FC = () => {
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
    const [user, setUser] = useState<any>(null)
    const [orders, setOrders] =useState<any>(null)
    const history = useHistory() 
    const datetime = moment().format('YYYYMMDDHHmmss')
    const [saldo, setSaldo] = useState<any>(0);
    const [success1, setSuccess1] = useState(false);
    const [success2, setSuccess2] = useState(false);
    useEffect(() => {
      const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
    
          // Get user saldo
          const userCollection = collection(db, 'users');
          const userQuery = query(userCollection, where('email', '==', user.email));
          const userSnapshotUnsubscribe = onSnapshot(userQuery, (userQuerySnapshot:any) => {
            const userData = userQuerySnapshot.docs.map((doc:any) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setSaldo(userData[0].saldo);
          });
    
          // Get user orders with status 'ready'
          const orderCollection = collection(db, 'order');
          const orderQuery = query(orderCollection, 
            where('name', '==', user.displayName), 
            where('status', '==', 'ready')
          );
          const orderSnapshotUnsubscribe = onSnapshot(orderQuery, (orderQuerySnapshot:any) => {
            const ordersData = orderQuerySnapshot.docs.map((doc:any) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setOrders(ordersData);
          });
    
          return () => {
            userSnapshotUnsubscribe();
            orderSnapshotUnsubscribe();
          };
        } else {
          history.push('/signin');
        }
      });
    
      return () => unsubscribeAuth();
    }, [history]);
      
      console.log(orders)
      async function Batal({orderId, price, titikJemput, titikAntar}:any){
        const orderRef = doc(db, 'order', orderId);
        
        
        await setDoc(doc(db, "payment", `${user.uid}#${datetime}`), {
          uid: user.uid,
          saldo: '+Rp'+price,
          create_at: moment().format(),
          titikjemput: titikJemput,
          titikantar: titikAntar,
          status:"pembatalan"
        }, { merge: true })
        .then(() => {
          setDoc(doc(db, "users", user.uid), {
            saldo: Number(saldo) + Number(price)
          }, { merge: true }).then(() => {

          })
        })
        .then(() => {
          setDoc(orderRef, { status: 'dibatalkan'}, { merge: true })
        .then(() => {
          console.log('Status berhasil diubah menjadi "dibatalkan"');
          history.push('/app/pesanan/batal');
        })
        .catch((error) => {
          console.error('Gagal mengubah status:', error);
        });
        })
      }
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
                        {/* {order.avatar === null ? (
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
                        )} */}
                       
                        <div className='w-full flex gap-6'>
                          <img className='w-[80px] h-fit' src="/tunggu.png" alt="" />
                          <div>
                            <h1 className='font-semibold text-sm'>{order.titikjemput}</h1>
                          <div className='flex flex-row gap-1 items-center'>
                          <BiTimer></BiTimer>
                        <h1 className='text-sm'>{order.waktu} menit</h1>
                        </div>
                        <div className='flex flex-row gap-1 items-center'>
                          <BiMoney></BiMoney>
                        <h1 className='text-sm'>Rp{order.price}</h1>
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
                
                        <button
                         onClick={()=> Batal({orderId: order.id, price: order.price, titikJemput: order.titikjemput, titikAntar: order.titikantar})}
                        className={`flex flex-row gap-3 items-center justify-center  p-2 px-3 rounded-xl text-white  bg-gradient-to-r from-red-500 to-pink-500`}
                      >
                        <h1>Batalkan</h1>
                
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

export default Tunggu;