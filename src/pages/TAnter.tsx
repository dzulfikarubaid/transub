import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import TabsPesanan from './TabsPesanan';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, setDoc, getDoc, getDocs, collection, onSnapshot, where, query, doc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useHistory } from 'react-router';
import { BiInfoCircle, BiLogoWhatsapp, BiMoney, BiTimer, BiWind } from 'react-icons/bi';
import moment from 'moment';
const Anter: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [driver, setDriver] = useState<any>(null)
  const [orders, setOrders] = useState<any>("")
  const history = useHistory()
  const [saldo, setSaldo] = useState(0);
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
        const q1 = query(orderCollection,
          where('name', '==', user.displayName),
          where('status', 'in', ['diantar', 'menunggu konfirmasi'])
        );
        const q2 = query(orderCollection,
          where('driver', '==', user.uid),
          where('status', 'in', ['diantar', 'menunggu konfirmasi'])
        );

        onSnapshot(q1, (querySnapshot1) => {
          const ordersData1 = querySnapshot1.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          onSnapshot(q2, (querySnapshot2) => {
            const ordersData2 = querySnapshot2.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            // setDriver(ordersData2)

            const combinedOrdersData = [...ordersData1, ...ordersData2];

            setOrders(combinedOrdersData);


          });
        });
      } else {
        history.push('/signin');
      }
    });

    return () => unsubscribe();
  }, [history]);
  console.log(orders)
  function DriverSelesai({ orderId }: any) {
    const orderRef = doc(db, 'order', orderId);
    setDoc(orderRef, { status: 'menunggu konfirmasi' }, { merge: true })
      .then(() => {
        console.log('Status berhasil diubah menjadi "menunggu konfirmasi"');
      })
      .catch((error) => {
        console.error('Gagal mengubah status:', error);
      });

  }
  const datetime = moment().format('YYYYMMDDHHmmss')
  async function RealSelesai({ orderId, driver, price, titikJemput, titikAntar, }: any) {
    const userDoc = await getDoc(doc(db, 'users', driver));

    if (userDoc.exists()) {
      const currentSaldo = userDoc.data().saldo
      const newSaldo = Number(currentSaldo) + Number(price);
      await setDoc(doc(db, "payment", `${user.uid}#${datetime}`), {
        uid: user.uid,
        saldo: '+Rp' + price,
        create_at: datetime,
        titikjemput: titikJemput,
        titikantar: titikAntar,
        status: "penerimaan"
      }, { merge: true }).then(() => {
        setDoc(doc(db, 'users', driver), { saldo: newSaldo }, { merge: true })
          .then(() => {
            setDoc(doc(db, 'order', orderId), { status: 'selesai' }, { merge: true })
              .then(() => {
                console.log('Status berhasil diubah menjadi "selesai"');
              })
              .catch((error) => {
                console.error('Gagal mengubah status:', error);
              });
  
          })
          .catch((error) => {
            console.error('Gagal mengubah status:', error);
          });
      })
    }
    
  }
  return (
    <IonPage>

      <IonContent >
        <div className='w-full p-2 flex flex-col gap-6'>
          {
            orders !== null && orders.length > 0 ?
              orders.map((order: any) => (
                <div key={order.id} className='p-4 bg-white shadow-md border-[1px] rounded-xl'>
                  <h1>{getTimeAgo(order.date)}</h1>
                  <div className='flex flex-col gap-4 mt-4'>
                    {order.avatar === null ? (
                      <div className='flex gap-4  items-center'>
                        <div className='rounded-full w-10 text-center p-2 bg-gradient-to-l from-blue-500 to-blue-900 text-white'>
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

                   <div className='flex flex-row gap-4 '>
                    <img className='w-[80px] h-fit' src="/antar.png" alt="" />
                   <div className=''>
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
                      {/* <a href={`${user.displayName !== order.name ? `https://wa.me/${order.wa}` : 'app/driver'}`}>
                        <BiLogoWhatsapp color={`${user.displayName !== order.name ? '#25D366' : 'gray'}`} size={25}></BiLogoWhatsapp>
                      </a> */}

                    </div>
                    {
                      user.displayName === order.name && order.status === 'menunggu konfirmasi'
                        ?
                        <button
                          onClick={() => RealSelesai({ orderId: order.id, driver: order.driver, price: order.price, titikJemput: order.titikjemput, titikAntar: order.titikantar })}

                          className={`flex flex-row gap-3 items-center justify-center  p-2 rounded-xl text-white bg-gradient-to-l from-blue-500 to-blue-900 `}
                        >
                          <h1>Konfirmasi Selesai</h1>

                        </button>
                        :
                        user.uid === order.driver && order.status === "menunggu konfirmasi"
                          ?
                          <h1

                            className={`flex flex-row gap-3 items-center justify-center  p-2 rounded-xl text-blue-900 `}
                          >
                            <h1>Menunggu Konfirmasi</h1>

                          </h1>
                          :
                          user.displayName !== order.name
                            ?
                            <button
                              onClick={() => DriverSelesai({ orderId: order.id })}
                              className={`flex flex-row gap-3 items-center justify-center  p-2 rounded-xl text-white bg-gradient-to-l from-blue-500 to-blue-900 `}
                            >
                              <h1>Selesai</h1>

                            </button>


                            :
                            <h1

                              className={`flex flex-row gap-3 items-center justify-center  p-2 rounded-xl bg-gradient-to-l text-blue-900 `}
                            >
                              <h1>Sedang diantar</h1>

                            </h1>

                    }

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