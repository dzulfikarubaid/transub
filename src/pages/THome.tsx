import { IonButton, IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { collection, getDoc, getDocs, getFirestore, DocumentData, DocumentSnapshot, doc } from 'firebase/firestore';

// Import Firebase Cloud Messaging untuk mengirim notifikasi
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { FaArrowAltCircleRight, FaDollarSign, FaLocationArrow } from 'react-icons/fa';
import {MdLocationOn, MdOutlinePayments} from 'react-icons/md'
import {RiUserLocationLine} from 'react-icons/ri'
import {GrMapLocation} from 'react-icons/gr'
import {IoIosArrowForward} from 'react-icons/io'
import { push } from 'ionicons/icons';
const db = getFirestore();
const messaging:any = getMessaging();

interface AvailableData {
    id: string;
    data: () => DocumentData;
}

const THome: React.FC = () => {
    const history = useHistory();
    const [user, setUser] = React.useState<any>('');
    const [authenticated, setAuthenticated] = React.useState(false);
    function InputAntar(){
        history.push('/antar')
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
            setUser(user);
        } else {
            history.push('/signin');
        }
    });

    const [data, setData] = React.useState<AvailableData[]>([]);

    useEffect(() => {
        getDocs(collection(db, 'available')).then((res) => {
            setData(res.docs as AvailableData[]);
        });
    }, []);

    const requestRide = async (ownerUid: string) => {
        // Mendapatkan token perangkat pemilik postingan
        const ownerDocRef = doc(db, 'users', ownerUid);
        const ownerDoc = (await getDoc(ownerDocRef)) as DocumentSnapshot;
        const ownerToken = ownerDoc.data()?.fcmToken;

        // Kirim notifikasi ke pemilik postingan
        const message = {
            data: {
                title: 'Permintaan Antar',
                body: 'Ada pengguna yang meminta antaran Anda.',
            },
            token: ownerToken,
        };

        // Kirim notifikasi menggunakan Firebase Cloud Messaging
        try {
            const response = await messaging.send(message);
            console.log('Notifikasi terkirim:', response);
        } catch (error) {
            console.error('Gagal mengirim notifikasi:', error);
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <div className='flex justify-between flex-row-reverse'>
                    <Link to='/profile' className='rounded-full w-12 text-center py-3 bg-blue-500 text-white'>
                        {user.displayName && user.displayName?.split(" ").map((kata: any) => kata[0]).join("").toUpperCase().substring(0, 2)}
                    </Link>
                </div>
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
                <button onClick={InputAntar}  className='flex flex-row gap-4  items-center bg-white p-4 rounded-3xl w-full'>
                <GrMapLocation size={25} color=''></GrMapLocation>
                <div className='flex flex-row items-center justify-between w-full'>
                <h1>Mau diantar ke mana?</h1>
                <IoIosArrowForward size={20}></IoIosArrowForward></div>
                </button>
                <button className='flex flex-row gap-4 items-center bg-white p-4 w-full rounded-3xl'>
                <RiUserLocationLine size={25} color=''></RiUserLocationLine>
                <div className='flex flex-row items-center justify-between w-full'>
                <h1>Mau dijemput di mana?</h1>
                <IoIosArrowForward size={20}></IoIosArrowForward></div>
                </button>
                
                </div>
                
            </IonContent>
            <IonFooter>
            <div className=' p-10 rounded-2xl'>
            <div className='flex flex-row items-center gap-2 mb-6'>
            <MdOutlinePayments size={25}></MdOutlinePayments>
            <h1>Tunai</h1>
            </div>
            <button className='w-full flex flex-row gap-4 items-center justify-center text-xl font-bold bg-blue-900 text-white p-3 rounded-3xl'>
            <h1>Pesan Transub</h1>
            <FaArrowAltCircleRight></FaArrowAltCircleRight>
            </button>
            </div>
            </IonFooter>
        </IonPage>
    );
};

export default THome;
