import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { collection, getDoc, getDocs, getFirestore, DocumentData, DocumentSnapshot, doc } from 'firebase/firestore';

// Import Firebase Cloud Messaging untuk mengirim notifikasi
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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
                <div>
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
                </div>
            </IonContent>
        </IonPage>
    );
};

export default THome;
