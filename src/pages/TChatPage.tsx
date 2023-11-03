import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth, db } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { IoAddCircleOutline, IoArrowBack } from 'react-icons/io5';
import { BiChat } from 'react-icons/bi';

// ... (kode sebelumnya)

const ChatPage: React.FC = () => {
    const history = useHistory();
    const [user, setUser] = useState<any>(null);
    const [userNames, setUserNames] = useState<Record<string, string>>({});
    const [lastMessages, setLastMessages] = useState<Record<string, string>>({});
    const [lastMessageTimes, setLastMessageTimes] = useState<Record<string, string>>({});
    const [userRooms, setUserRooms] = useState<string[]>([]);
    const [userData, setUserData] = useState<Record<string, any>>({});


    const formatTime = (createdAt: any) => {
        const now = moment();
        const messageTime = moment(createdAt);

        if (now.isSame(messageTime, 'day')) {
            // Jika hari ini, tampilkan jam
            return messageTime.format('HH:mm');
        } else if (now.isSame(messageTime.clone().subtract(1, 'days'), 'day')) {
            // Jika kemarin, tampilkan "kemarin"
            return 'kemarin';
        } else {
            // Jika lebih dari 1 hari yang lalu, tampilkan tanggal
            return messageTime.format('DD/MM/YY');
        }
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

                const messagesCollection = collection(db, 'messages');
                const userRooms: string[] = [];

                const unsubscribeSnapshot = onSnapshot(messagesCollection, async (querySnapshot: any) => {
                    const userRoomsSet: Set<string> = new Set();
                    const lastMessages: Record<string, string> = {};
                    const lastMessageTimes: Record<string, string> = {};

                    querySnapshot.docs.forEach((doc: any) => {
                        const roomId = doc.data().room;
                        const [user1, user2] = roomId.split('-');

                        if (user1 === user.uid || user2 === user.uid) {
                            userRoomsSet.add(roomId);
                            lastMessages[roomId] = doc.data().text;
                            lastMessageTimes[roomId] = doc.data().createdAt;
                        }
                    });

                    const rooms = Array.from(userRoomsSet);
                    setUserRooms(rooms);
                    setLastMessages(lastMessages);
                    setLastMessageTimes(lastMessageTimes);
                    console.log(lastMessageTimes[rooms[0]]);

                    // Dapatkan nama pengguna untuk user1 dan user2
                    for (const room of rooms) {
                        const [user1, user2] = room.split('-');
                        const user1Doc = await getDoc(doc(db, 'users', user1));
                        const user2Doc = await getDoc(doc(db, 'users', user2));

                        if (user1Doc.exists() && user2Doc.exists()) {
                            const user1Data = user1Doc.data();
                            const user2Data = user2Doc.data();
                            userData[room] = { user1: user1Data, user2: user2Data };



                            setUserNames((prevUserNames) => ({
                                ...prevUserNames,
                                [user1]: user1Data.name,
                                [user2]: user2Data.name,
                            }));
                        }
                    }
                    setUserData(userData);
                });

                return () => {
                    // Unsubscribe dari listener ketika komponen tidak lagi digunakan
                    unsubscribeSnapshot();
                };
            } else {
                history.push('/signin');
            }
        });

        return () => {
            // Unsubscribe dari listener auth ketika komponen tidak lagi digunakan
            unsubscribe();
        };
    }, [history]);

    return (
        <IonPage>
            <IonContent>
                <div className='p-4'>
                    <div className='fixed top-0 left-0 w-full  text-center justify-center items-center bg-gray-100 p-6 px-4'>
                            <div className='flex flex-row justify-between items-center gap-4'>
                                
                                <h1 className='text-xl font-bold'>Chat</h1>
                                <button onClick={() => history.push('/userlist')}>
                                <IoAddCircleOutline size={25}></IoAddCircleOutline>
                                </button>
                            </div>
                            </div>
                            <div className='flex flex-col gap-4 mt-20'>
                    {userRooms.map((room) => (

                        <Link key={room} to={`/chat/${room}`} className='flex flex-col gap-2 '>
                            <div className='flex gap-4 justify-between items-center'>
                                <div className='flex gap-4'>
                                    <div className='rounded-full  text-center w-10 h-10 py-2 justify-center items-center bg-blue-500 text-white'>
                                        {userData[room]?.user2.name.split(' ').map((kata: any) => kata[0]).join('').toUpperCase().substring(0, 2)}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h1 className=''>{userData[room]?.user2.name}</h1>
                                        <h1>{lastMessages[room]}</h1>
                                    </div>
                                </div>
                                <h1>{formatTime(lastMessageTimes[room])}</h1>
                            </div>

                        </Link>
                    ))}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ChatPage;

