import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getFirestore, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import moment from 'moment';
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { FaTimes } from 'react-icons/fa';
import { BiChat, BiInfoCircle, BiLogoWhatsapp, BiMoney, BiTimer, BiWind } from 'react-icons/bi';
import Routing from './TRouting';
import { auth } from '../firebaseConfig';
import './signin.css';
import { FaRemoveFormat } from 'react-icons/fa';
import { BsFillChatLeftDotsFill } from 'react-icons/bs';
import { IoChatbubbleEllipsesOutline, IoChatbubbleOutline } from 'react-icons/io5';
import { MdOutlineChat, MdOutlineChatBubbleOutline } from 'react-icons/md';
import { PiChatCircleDotsBold } from 'react-icons/pi';
const db = getFirestore();

const Driver: React.FC = () => {
  const [user, setUser] = useState<any>('');
  const [orders, setOrders] = useState<any[]>([]);
  const history = useHistory();
  const [modalData, setModalData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
  
        const orderCollection = collection(db, 'order');
  
        // Menggunakan query untuk mendapatkan data dengan nama (displayName) yang sama
        // dan hanya dengan status 'ready'
        const q = query(orderCollection, 
          where('status', '==', 'ready')
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
  function Gas({ orderId}: any) {
    const orderRef = doc(db, 'order', orderId);

    // Menggunakan setDoc untuk mengubah status menjadi "diantar"
    setDoc(orderRef, { status: 'diantar', driver: user.uid}, { merge: true })
      .then(() => {
        console.log('Status berhasil diubah menjadi "diantar"');
        history.push('/app/pesanan/antar');
      })
      .catch((error) => {
        console.error('Gagal mengubah status:', error);
      });
  }
  return (
    <IonPage>
      <IonContent>
        <div className={`flex flex-col gap-4 p-6 ${isOpen ? 'bg-gray-400/30' : ''}`}>
          <h1 className='font-bold text-xl'>Ayo antar</h1>
          {
            orders.length > 0 ?
            orders.map((order: any) => (
              <div key={order.id} className='p-4 bg-gray-100 rounded-xl'>
                <div className='flex flex-col gap-4'>
            
                  <div className='flex gap-4  items-center'>
                    <div className='rounded-full w-10 text-center p-2 bg-blue-500 text-white'>
                      {order.name.split(' ').map((kata: any) => kata[0]).join('').toUpperCase().substring(0, 2)}
                    </div>
                    <h1>{order.name}</h1>
                  </div>
                
                  <h1>{getTimeAgo(order.date)}</h1>
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
                      onClick={() => {
                        setModalData(order);
                        setIsOpen(true);
                      }}
                    >
                      <BiInfoCircle size={25}></BiInfoCircle>
                    </button>
                    <a href={`${user.displayName !== order.name ? `https://wa.me/${order.wa}` : 'app/driver'}`}>
                      <PiChatCircleDotsBold color={`${user.displayName !== order.name ? 'black' : 'gray'}`} size={25}></PiChatCircleDotsBold>
                    </a>
                  
                  </div>
                  <button
                    onClick={() => Gas({ orderId: order.id })}
                    disabled={user.displayName === order.name}
                    className={`flex flex-row gap-3 items-center justify-center  p-2 rounded-xl text-white ${
                      user.displayName === order.name ? 'bg-gray-300' : 'bg-gradient-to-l from-blue-900 to-blue-600'
                    }`}
                  >
                    <h1>Gas</h1>
                    <BiWind></BiWind>
                  </button>
                </div>
              </div>
            ))
            :
            <div>
              Belum ada pesanan
            </div>
          }
        </div>
      </IonContent>
      {isOpen ? (
        <IonFooter>
          <div className='p-4 relative bg-white h-fit  w-full rounded-3xl pb-2  -translate-y-4'>
            <div className='flex flex-row-reverse mb-10'>
              <FaTimes size={25} onClick={() => setIsOpen(false)}></FaTimes>
            </div>
            <Routing x1={modalData.location.lat} y1={modalData.location.lng} x2={modalData.destination.lat} y2={modalData.destination.lng} />
            <div className='flex flex-col gap-3 p-4'>
              <h1 className='font-bold'>Jemput di</h1>
              <h1>{modalData.titikjemput}</h1>
              <h1 className='font-bold'>Antar ke</h1>
              <h1>{modalData.titikantar}</h1>
            </div>
          </div>
        </IonFooter>
      ) : null}
    </IonPage>
  );
};

export default Driver;
