import { IonButton, IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useHistory } from 'react-router';
import {TbLocationPin} from 'react-icons/tb'
import {RiSpeedMiniLine} from 'react-icons/ri'
import { Link } from 'react-router-dom';
import { collection, getDoc, getDocs, getFirestore, DocumentData, DocumentSnapshot, doc, Firestore, setDoc, onSnapshot, query, where } from 'firebase/firestore';
import {BiTimer} from 'react-icons/bi'
import {GiPathDistance} from 'react-icons/gi'
import './TLeafletlogo.css'
import {PiPersonSimpleBikeBold} from 'react-icons/pi'
// Import Firebase Cloud Messaging untuk mengirim notifikasi
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { FaArrowAltCircleRight, FaDollarSign, FaLocationArrow } from 'react-icons/fa';
import {MdLocationOn, MdOutlinePayments} from 'react-icons/md'
import {RiUserLocationLine} from 'react-icons/ri'
import {GrMapLocation} from 'react-icons/gr'
import {IoIosArrowForward} from 'react-icons/io'
import { push } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';
import axios from 'axios';
const db = getFirestore();
const messaging:any = getMessaging();
import Routing from './TRouting';
import moment from 'moment';
interface AvailableData {
    id: string;
    data: () => DocumentData;
}

const THome: React.FC = () => {
  const [titikAntar, setTitikAntar] = useState<any>('');
  const [titikJemput, setTitikJemput] = useState<any>('');
  const [valueLatAntar, setValueLat] = useState<any>('');
  const [valuelngAntar, setValuelng] = useState<any>('');
  const history = useHistory();
  const [valueLatjemput, setValueLatjemput] = useState<any>('');
  const [valuelngjemput, setValuelngjemput] = useState<any>('');
  const [user, setUser] = useState<any>('');
  const [result, setResult] = useState<any>('');
  const [price, setPrice] = useState<any>('');
  const [waktu, setWaktu] = useState<any>('');
  const [Wa, setWa] = useState<any>('');
  const [confirm, setConfirm] = useState(false);
  const [saldo, setSaldo] = useState(0);

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
  const getWa = async () => {
    try {
      if (user) {
        const querySnapshot = await getDoc(doc(db, 'users', user.uid));
        if (querySnapshot.exists()) {
          if (querySnapshot.data().wa) {
            Preferences.set({ key: 'wa', value: querySnapshot.data().wa });
            console.log(querySnapshot.data().wa);
          }
        }
      }
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };
  function InputAntar(){
    history.push('/antar')
}
function InputJemput(){
    history.push('/jemput')
}


  const fetchAntar = async () => {
    try {
      const [latAntar, lngAntar, titikantar] = await Promise.all([
        Preferences.get({ key: 'latantar' }),
        Preferences.get({ key: 'lngantar' }),
        Preferences.get({ key: 'titikantar' }),
      ]);

      if (latAntar.value !== null && lngAntar.value !== null) {
        setValueLat(latAntar.value);
        setValuelng(lngAntar.value);
      } else {
        // Handle the case where latAntar.value or lngAntar.value is null
        console.error('latAntar or lngAntar is null');
      }
      setTitikAntar(titikantar.value);
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const fetchJemput = async () => {
    try {
      const [latjemput, lngjemput, titikjemput] = await Promise.all([
        Preferences.get({ key: 'latjemput' }),
        Preferences.get({ key: 'lngjemput' }),
        Preferences.get({ key: 'titikjemput' }),
      ]);
      setValueLatjemput(latjemput.value);
      setValuelngjemput(lngjemput.value);
      setTitikJemput(titikjemput.value);
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const fetchSummary = async () => {
    try {
      const [distance, time, price, wa] = await Promise.all([
        Preferences.get({ key: 'distance' }),
        Preferences.get({ key: 'waktu' }),
        Preferences.get({ key: 'price' }),
        Preferences.get({ key: 'wa' }),
      ]);
      setResult(distance.value);
      setWaktu(time.value);
      setPrice(price.value);
      setWa(wa.value);
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };
  const datetime = moment().format()
    async function postFirestore(){
      console.log("User UID:", user.uid);
      console.log("Datetime:", datetime);
      if(saldo >= price){
        await setDoc(doc(db, "order", `${user.uid}#${datetime}`), {
            uid: user.uid,
            name: user.displayName,
            avatar: user.photoURL,
            id_post: `${user.displayName}#${datetime}`,
            location: {
                lat: valueLatjemput,
                lng: valuelngjemput,
            },
            destination: {
                lat: valueLatAntar,
                lng: valuelngAntar,
            },
            titikjemput: titikJemput,
            titikantar: titikAntar,
            date: datetime,
            distance: result,
            waktu: waktu,
            price: price,
            wa: Wa,
            status: "ready"
          }).then(()=>{
            setDoc(doc(db, "payment", `${user.uid}#${datetime}`), {
              uid: user.uid,
              saldo: '-Rp'+price,
              create_at: datetime,
              titikjemput: titikJemput,
              titikantar: titikAntar,
              status:"pembayaran"
            }, { merge: true });
          })
          .then(()=>{
            setDoc(doc(db, "users", user.uid), {
              saldo: saldo - price
            }, { merge: true });
          })
          .then(()=>{
            history.push('/app/pesanan')
          })
          .catch((error)=>{
            console.log(error)
            alert(error.message)
          })
      }
      else{
        alert("Saldo anda tidak mencukupi")
      }
      
        
    }
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchAntar();
      fetchJemput();
      fetchSummary();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getWa();
  }, [user]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchSummary();
    }, 100);

    return () => clearInterval(intervalId);
  }, [valueLatAntar, valuelngAntar, valueLatjemput, valuelngjemput]);
  const RoutingMap = () => {
    return (
      <Routing
        x1={valueLatAntar}
        y1={valuelngAntar}
        x2={valueLatjemput}
        y2={valuelngjemput}
      />
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      RoutingMap();
      fetchSummary();
    }, 100);

    return () => clearInterval(intervalId);
  }, [valueLatAntar, valuelngAntar, valueLatjemput, valuelngjemput]);

    return (
        <IonPage>
            <IonContent className="ion-padding">
                {/* <div className='flex justify-between flex-row-reverse'>
                    <Link to='/profile' className='rounded-full w-12 text-center py-3 bg-blue-500 text-white'>
                        {user.displayName && user.displayName?.split(" ").map((kata: any) => kata[0]).join("").toUpperCase().substring(0, 2)}
                    </Link>
                </div> */}
                {/* <div>
                    <h1 className='mb-6'>Driver yang tersedia</h1>
                    {
                        data.map((item: AvailableData) => {
                            return (
                                <div key={item.id} className='bg-gray-200 p-4 rounded-xl flex flex-col gap-3'>
                                    <h3>{item.data().name}</h3>
                                    <h3>{item.data().date1}</h3>
                                    <h3>{item.data().date2}</h3>
                                    <div className='flex flex-row-reverse'>
                                        <button
                                            className='bg-gray-800 text-white p-2 rounded-xl'
                                            onClick={() => requestRide(item.data().uid)}
                                        >
                                            Minta Anterin
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> */}
               <div className='h-[360px] w-[755px] bg-gradient-to-b to-[#0097B2] from-[#11009E] absolute top-0 -z-10 rounded-b-full mx-auto left-1/2 transform -translate-x-1/2'>
</div>

                <div className='flex flex-col gap-6 mt-10'>
                <button onClick={InputAntar}  className='flex flex-row gap-4  items-center bg-white p-4 rounded-3xl w-full' title={titikAntar}>
                <GrMapLocation size={25} color=''></GrMapLocation>
                <div className='flex flex-row items-center justify-between w-full'>
                {
                    titikAntar? <h1 className='text-[14px] text-left'>{titikAntar.length > 80 ? titikAntar.substring(0, 77) + '...' : titikAntar}</h1> :
                     <h1>Mau diantar ke mana?</h1>
                }
                <IoIosArrowForward size={20}></IoIosArrowForward></div>
                </button>
                <button onClick={InputJemput} className='flex flex-row gap-4 items-center bg-white p-4 w-full rounded-3xl' title={titikJemput}>
                <RiUserLocationLine size={25} color=''></RiUserLocationLine>
                <div className='flex flex-row items-center justify-between w-full'>
                {
                    titikJemput? <h1 className='text-[14px] text-left'>{titikJemput.length > 80 ? titikJemput.substring(0, 77) + '...' : titikJemput}</h1> : <h1>Mau dijemput di mana?</h1>
                }
                <IoIosArrowForward size={20}></IoIosArrowForward></div>
                </button>
                </div>
                {
                    valueLatAntar!='' && valueLatjemput!='' ?
                    <div className='relative mt-10'>
                        <RoutingMap></RoutingMap>
                    </div>
                    :
                    <></>
                    
                }
                
               
                
            </IonContent>
            {
                confirm ?
                    <IonFooter >
                     <div className='p-6 flex flex-col gap-4'>
                     <h1 className='font-bold'>Konfirmasi pembayaran</h1>
                     <h1>Apakah anda yakin ingin memesan?</h1>
                     <div className='flex flex-row justify-between gap-4 items-center'>
                     <button className='w-1/2 p-2 rounded-3xl bg-blue-900 text-white' onClick={postFirestore}>Iya</button>
                      <button className='w-1/2 p-2 rounded-3xl bg-gray-500 text-white' onClick={()=>setConfirm(false)}>Tidak</button>
                     </div>
                     </div>
                      
                    </IonFooter>
                    :
                    <IonFooter>
                    <div className=' p-6 rounded-2xl'>
                    <div className='flex flex-row items-center justify-between mb-6'>
                    <div className='flex flex-row items-center gap-2'><MdOutlinePayments size={25}></MdOutlinePayments>
                    <h1>Rp{price}</h1></div>
                    <div className='flex flex-row items-center gap-2'><BiTimer size={25}></BiTimer>
                    <h1>{waktu} menit</h1></div>
                    <div className='flex flex-row items-center gap-2'><GiPathDistance size={25}></GiPathDistance>
                    <h1>{result} km</h1></div>

                    </div>
                    <button onClick={()=>setConfirm(true)} className='w-full flex flex-row gap-3 items-center justify-center text-xl font-bold bg-blue-900 text-white p-3 rounded-3xl'>
                    <h1>Pesan Transub</h1>
                    <RiSpeedMiniLine size={35}></RiSpeedMiniLine>
                    </button>
                    </div>
                    </IonFooter>


                }
            
        </IonPage>
    );
};

export default THome;