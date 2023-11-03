import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { useParams } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import moment from 'moment';
import { IoArrowBack, IoSend } from 'react-icons/io5';
const Chat: React.FC = () => {
    const [massagesList, setMessagesList] = useState<any>([])
    const { id } = useParams<{ id: string }>();
    const user1 = id.split('-')[0]
    const user2 = id.split('-')[1]
    const history = useHistory()
    const [user, setUser] = useState<any>('')
    const [newMessage, setNewMessage] = useState<any>('')
    const [userId, setUserId] = useState<any>('')
    const messagesContainerRef = useRef<any>(null);
    const myElementRef = useRef<any>(null);
    const [user1Name, setUser1Name] = useState<any>('')
    const [user2Name, setUser2Name] = useState<any>('')
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            console.log('scrolling')
          if (myElementRef.current) {
            myElementRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 4000); // Ubah nilai 1000 menjadi delay (dalam milidetik) yang Anda inginkan
    
        return () => clearTimeout(timeoutId);
      }, [history]);
      
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                
                setUser(user);
                const user2Collection = collection(db, 'users');
                const qUser2 = query(user2Collection, where('uid', '==', user2));

                const snapshotUnsubscribeUser2 = onSnapshot(qUser2, async (querySnapshot: any) => {
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const userData = userDoc.data();
                    setUser2Name(userData.name);
                }
                });

                const userCollection = collection(db, 'users');
                const qUser = query(userCollection, where('uid', '==', user1));

                const snapshotUnsubscribeUser = onSnapshot(qUser, async (querySnapshot: any) => {
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const userData = userDoc.data();
                    setUser1Name(userData.name);
                }
                });
                const orderCollection = collection(db, 'messages');
                const q = query(orderCollection,
                    where('room', 'in', [id, id.split('-')[1] + '-' + id.split('-')[0]]),
                );

                const snapshotUnsubscribe = onSnapshot(q, (querySnapshot: any) => {
                    const messages = querySnapshot.docs.map((doc: any) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    console.log(messages)
                    setMessagesList(messages);
                });

                return () => snapshotUnsubscribe();
            } else {
                history.push('/signin');
            }
        });

        return () => unsubscribe();
    }, [history]);
    const SendMessage = async (e: any) => {
        e.preventDefault();
        if (newMessage.trim() === "") {
            alert("Enter valid message");
            return;
        }

        await addDoc(collection(db, "messages"), {
            room: id,
            text: newMessage,
            name: user.displayName,
            createdAt: moment().format(),
            uid: user.uid,
        }).then(() => {
            setNewMessage("");
            if (myElementRef.current) {
                myElementRef.current.scrollIntoView({ behavior: 'smooth' });
              }
           
        })

    }
    const autoGrow = (element:any) => {
        element.style.height = '5px';
        element.style.height = `${element.scrollHeight}px`;
      };
    function onChange(e:any){
        setNewMessage(e.target.value);
        autoGrow(e.target);
    }
    const calculateTextareaRows = () => {
        const newlineCount = (newMessage.match(/\n/g) || []).length + 1;
        const minRows = 1;
        const maxRows = 5;
        const calculatedRows = Math.min(Math.max(newlineCount + 1, minRows), maxRows);
        return calculatedRows;
    };
    return (
        <IonPage>
            

            <IonContent className="ion-padding">
                {
                    user.uid === user1 || user.uid === user2 ? (
                        <div className='flex flex-col gap-4 w-full'>
                            <div className='fixed top-0 left-0 w-full  text-center justify-center items-center bg-gray-100 p-6 px-4'>
                            <div className='flex flex-row items-center gap-4'>
                                <button onClick={() => history.goBack()}>
                                <IoArrowBack size={25}></IoArrowBack>
                                </button>
                                <h1 className=''>{user1Name === user.displayName ? user2Name : user1Name}</h1>
                            </div>
                            </div>
                            <div ref={messagesContainerRef}  className='flex flex-col gap-4 mt-[75px]'>
                                {
                                    massagesList
                                        .slice()
                                        .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                                        .map((message: any, index:number) => (
                                            <div key={message.id} ref={myElementRef}
                                             className={`flex rounded-2xl p-2 w-fit ${message.uid === user.uid ? "self-end bg-blue-950 text-white " : "self-start bg-gray-100 text-black"}`}>
                                                <div className={`flex flex-col ${message.uid === user.uid ? "items-end" : "items-start"}`}>
                                                    <h1>{message.name}</h1>
                                                    <div className='flex h-fit w-full break-all'>{message.text}</div>
                                                    <p>{message.createdAt}</p> 
                                                </div>
                                            </div>
                                        ))
                                        
                                }
                            </div>



                        </div>
                    ) :
                        (
                            <div>
                                <h1>Nothing Here</h1>
                            </div>
                        )
                }
            </IonContent>
            <IonFooter slot='bottom'>
                <div className={`flex flex-row items-end  gap-2 w-full py-6 px-2`}>
                    <textarea placeholder='Ketik pesan' className='w-full rounded-2xl p-3 py-2 bg-gray-100 focus:outline-none' value={newMessage} onChange={onChange} 
                     style={{ resize: 'none', overflow: 'hidden', minHeight: '50px',height:'50px', maxHeight: '150px' }} cols={1}></textarea>
                    <button disabled={newMessage.trim() === ""} onClick={SendMessage} className={`${newMessage.trim() === "" ? "opacity-50" : ""} rounded-full text-blue-900 py-4 px-2`}><IoSend size={20}></IoSend></button>

                </div>

            </IonFooter>
        </IonPage>
    );
};

export default Chat;