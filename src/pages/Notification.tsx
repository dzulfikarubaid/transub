import { IonContent, IonHeader, IonItem, IonItemGroup, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, getFirestore, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

const db = getFirestore();

interface NotificationData {
    timestamp: string;
    message: string;
    sender: string;
    link: string;
}

const Notification: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    useEffect(() => {
        // Mengambil notifikasi dari Firebase Firestore atau sumber data lainnya
        getDocs(collection(db, 'notifications')).then((res) => {
            const fetchedNotifications = res.docs.map((doc) => doc.data()) as NotificationData[];
            setNotifications(fetchedNotifications);
        });
    }, []);

    return (
        <IonPage>
            <IonContent>
                <div className='mt-8 flex-col flex'>
                    <h1 className='px-8 text-xl font-bold mb-5'>Notifikasi</h1>
                    <IonList>
                        <IonItemGroup>
                            {notifications.map((notification: NotificationData, index) => (
                                <IonItem key={index}>
                                    <div className='p-2 bg-slate-200 w-full'>
                                        <h1>{notification.timestamp}</h1>
                                        <Link to={notification.link}>
                                            {notification.message}
                                            <span className='text-blue-500'>{notification.sender}</span>
                                        </Link>
                                    </div>
                                </IonItem>
                            ))}
                        </IonItemGroup>
                    </IonList>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Notification;
