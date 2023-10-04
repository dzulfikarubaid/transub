import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemGroup, IonList, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { QuerySnapshot, collection, getDocs, query, where } from 'firebase/firestore';
import { addCircleOutline, addOutline, closeOutline } from 'ionicons/icons';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const Chat: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [user, setUser] = React.useState<any>();
    const [err, setErr] = React.useState('');
   useEffect(() => {
       getDocs(collection(db, 'users')).then((res)=>{
           setUser(res.docs)
           console.log(res.docs)
           
       })
   }, [])
   const [currentUser, setCurrentuser] = React.useState<any>();
   onAuthStateChanged(auth, (user) => {
       if(user){
           setCurrentuser(user)
       }
   })
   function handleSelect({user}:any){
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

   }
    console.log(user)
    return (
        <IonPage>
           
            <IonContent>
            <div className='mt-8 flex-col flex'>
           <div className='px-8 flex flex-row justify-between w-full'>
           <h1 className=' text-xl font-bold'>Pesan</h1>
    
{!open ? (
  <button onClick={() => setOpen(!open)}>
    <IonIcon size='large' icon={addCircleOutline}></IonIcon>
  </button>
) : (
  <IonModal isOpen={open}>
    <IonContent className="ion-padding ">
      <input
        autoFocus={true}
        value={search}
        type="text"
        className='focus:outline-none p-3 w-full border-b-2'
        placeholder='Cari nama atau email...'
        onChange={(e: any) => setSearch(e.target.value)}
      />

      <div className='flex flex-col gap-2'>
        {err && <h1 className=''>{err}</h1>}
        {search &&
          user &&
          user
            .filter((item: any) => {
              const name = item.data().name.toLowerCase();
              const email = item.data().email.toLowerCase();
              const searchQuery = search.toLowerCase();
              return name.includes(searchQuery) || email.includes(searchQuery);
            })
            .map((item: any) => (
              <button  onClick={()=>handleSelect(item)} key={item.id}>
                <h1>{item.data().name}</h1>
                <h1>{item.data().email}</h1>
              </button>
            ))}
      </div>
    </IonContent>
  </IonModal>
)}

           </div>
            <IonList className='px-4'>
                <IonItemGroup><IonItem>
                    <Link className=' p-2 flex flex-row justify-between w-full' to='/app/chat'>
                        <div className='flex flex-row gap-4'>
                        <img  className='w-[40px] h-[40px] object-cover rounded-full' src="jokowi.jpg" alt="" />
                        <div>
                        <h1 className='font-bold'>
                        Joko Widodo
                        </h1>
                        <p>Halo</p>
                        </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-1 px-2'>
                            <h1 className='text-blue-500'>13.50</h1>
                            <h1 className='bg-blue-500 px-[10px] py-1 text-white rounded-full text-[12px]'>
                                1
                            </h1>
                        </div>      
                        </Link>
                        
                        </IonItem>
                        <IonItem>
                        <Link className=' p-2 flex flex-row justify-between w-full' to='/app/chat'>
                       
                        <div className='flex flex-row gap-4'>
                        <img  className='w-[40px] h-[40px] object-cover rounded-full' src="putin.jpg" alt="" />
                        <div>
                        <h1 className='font-bold'>
                        Vladimir Putin
                        </h1>
                        <p>Apakah pesanan saya sudah diantar?</p>
                        </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-1 px-2'>
                            <h1 className=''>10.50</h1>
                            
                        </div>

                        
                        
                                
                            </Link>
                        </IonItem>
                        
                        </IonItemGroup>
                        
                    </IonList>
            </div>
            </IonContent>
        </IonPage>
    );
};

export default Chat;