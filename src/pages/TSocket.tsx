import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
import io from 'socket.io-client';


const socket = io('http://localhost:3000')
const Socket: React.FC = () => {
    const [message, setMessage] = React.useState('');
    const [receivedMessage, setReceivedMessage] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [registeredRoom, setRegisteredRoom] = React.useState('');
    function joinRoom() {
        if(room !== '') {
            socket.emit('join_room', room)
            setRegisteredRoom(room)
        }
    }
    function sendMessage() {
        socket.emit('send_message', {message, room});
    }
    useEffect(() => {
      socket.on('received_message', (data) => {
        setReceivedMessage(data.message);
      })
    
    }, [socket])
    
    return (
        <IonPage>
          
            <IonContent>
                <div className='flex flex-col gap-4 items-center w-full p-6'>
                    {
                        registeredRoom === '' ? (
                            <div className='flex flex-col gap-4 w-full'>
                                <input value={room} onChange={(e) => setRoom(e.target.value)} type="text" placeholder='Masukkan kode room' className=' w-full rounded-2xl p-3 bg-gray-100' />
                                <button onClick={joinRoom} className='rounded-2xl p-3 bg-gray-800 text-white w-full'>Join</button>
                            </div>
                            )
                        :
                            <h1>Anda masuk pada room {room}</h1>
                    }
                    <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder='Masukkan pesan' className=' w-full rounded-2xl p-3 bg-gray-100' />
                    <button onClick={sendMessage} className='rounded-2xl p-3 bg-blue-900 text-white w-full'>Send</button>
                    <div className='flex flex-col gap-4 w-full'>
                    <h1 className=''>Message:</h1>
                    <h1>{receivedMessage}</h1>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Socket;