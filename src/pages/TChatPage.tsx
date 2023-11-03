import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth, db } from '../firebaseConfig';
import { Link } from 'react-router-dom';

// ... (kode sebelumnya)

const ChatPage: React.FC = () => {
    const history = useHistory();
    const [user, setUser] = useState<any>(null);
    const [userNames, setUserNames] = useState<Record<string, string>>({});
    const [lastMessages, setLastMessages] = useState<Record<string, string>>({});
    const [lastMessageTimes, setLastMessageTimes] = useState<Record<string, string>>({});
    const [userRooms, setUserRooms] = useState<string[]>([]);
  
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
  
            // Dapatkan nama pengguna untuk user1 dan user2
            for (const room of rooms) {
              const [user1, user2] = room.split('-');
              const user1Doc = await getDoc(doc(db, 'users', user1));
              const user2Doc = await getDoc(doc(db, 'users', user2));
  
              if (user1Doc.exists() && user2Doc.exists()) {
                const user1Data = user1Doc.data();
                const user2Data = user2Doc.data();
  
                setUserNames((prevUserNames) => ({
                  ...prevUserNames,
                  [user1]: user1Data.name,
                  [user2]: user2Data.name,
                }));
              }
            }
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
          <div className='flex flex-col gap-4 p-4'>
            {userRooms.map((room) => (

                  <Link key={room} to={`/chat/${room}`} className='flex flex-col gap-2'>
                    <div className='flex gap-4  items-center'>
                    <div className='rounded-full w-10 text-center p-2 bg-blue-500 text-white'>
                      {(userNames[user.uid === room.split('-')[0] ? room.split('-')[1] : room.split('-')[0]]).split(' ').map((kata: any) => kata[0]).join('').toUpperCase().substring(0, 2)}
                    </div>
                    <h1 className=''>{userNames[user.uid === room.split('-')[0] ? room.split('-')[1] : room.split('-')[0]]}</h1>
                  </div>
                    <p>User Room: {room}</p>
                    
                    <p>Last Message: {lastMessages[room]}</p>
                    <p>Last Message Time: {lastMessageTimes[room]}</p>
                  </Link>
            ))}
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default ChatPage;
  
