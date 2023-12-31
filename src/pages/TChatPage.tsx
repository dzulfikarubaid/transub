import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
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
                const orderedMessagesQuery = query(messagesCollection, orderBy('createdAt', 'desc'));

                const unsubscribeSnapshot = onSnapshot(orderedMessagesQuery, async (querySnapshot: any) => {
                    console.log(querySnapshot.docs);
                    const userRoomsSet: Set<string> = new Set();
                    const lastMessages: Record<string, string> = {};
                    const lastMessageTimes: Record<string, string> = {};
                
                    querySnapshot.docs.forEach((doc: any) => {
                        const roomId = doc.data().room;
                        const [user1, user2] = roomId.split('-');
                
                        if (user1 === user.uid || user2 === user.uid) {
                            userRoomsSet.add(roomId);
                
                            // Periksa apakah dokumen terkait dengan ruangan ini
                            if (!lastMessages[roomId] || doc.data().createdAt > lastMessageTimes[roomId]) {
                                lastMessages[roomId] = doc.data().text;
                                lastMessageTimes[roomId] = doc.data().createdAt;
                            }
                        }
                    });
                
                    // Menggunakan indeks 0 untuk mendapatkan pesan terbaru
                    const newestRoomId = userRoomsSet.values().next().value;
                    console.log(`Newest Room: ${newestRoomId}, Newest Message: ${lastMessages[newestRoomId]}`);
                    
                    const rooms = Array.from(userRoomsSet);
                    setUserRooms(rooms);
                    setLastMessages(lastMessages);
                    setLastMessageTimes(lastMessageTimes);
                
                

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
    function truncateText(text:any, maxLength:any) {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
      }
    return (
        <IonPage>
            <IonContent>
                <div className='p-4'>
                    <div className='fixed top-0 left-0 w-full  text-center justify-center items-center bg-gray-100 p-6 px-4'>
                            <div className='flex flex-row justify-between items-center gap-4'>
                                
                                <h1 className='text-xl font-bold'>Chat</h1>
                                <button onClick={() => history.push('/userlist')}>
                                <IoAddCircleOutline size={30}></IoAddCircleOutline>
                                </button>
                            </div>
                            </div>
                            <div className='flex flex-col gap-4 mt-20'>
                    {userRooms.map((room) => (

                        <Link key={room} to={`/chat/${room}`} className='flex flex-col gap-2 border-b-[1px] py-2'>
                            <div className='flex gap-4 justify-between items-center'>
                                <div className='flex gap-4 items-center'>
                                   <img className='w-12 rounded-full border-2' src="/avatar/avatar.png" alt="" />
                                    <div className='flex flex-col gap-2'>
                                        <h1 className='font-semibold'>{userNames[user.uid === room.split('-')[0] ? room.split('-')[1] : room.split('-')[0]]}</h1>
                                        <h1>{truncateText(lastMessages[room], 16)}</h1>
                                    </div>
                                </div>
                                <h1 className='text-sm self-end'>{formatTime(lastMessageTimes[room])}</h1>
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

