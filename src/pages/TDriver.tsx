import { IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React from 'react';

import {auth} from '../firebaseConfig';
const Driver: React.FC = () => {
    const db = getFirestore();
    const [user, setUser] = React.useState<any>('');
    const [date1, setDate1] = React.useState<any>('')
    const [date2, setDate2] = React.useState<any>('')
    onAuthStateChanged(auth, (user) => {
        if(user){
            setUser(user)
        }
    })
    async function postSedia(e:any){
        e.preventDefault();
        if(user){
          
            const q = query(collection(db, "available"), where("uid", "==", user.uid))
            const snapshot = await getDocs(q);
            if (snapshot.docs.length > 0) {
              await deleteDoc(doc(db, "available", snapshot.docs[0].id));
            }
            await addDoc(collection(db, 'available'), {
                uid: user.uid,
                name: user.displayName,
                id_post: `${user.displayName}-${date1}-${date2}`,
                date1: date1,
                date2: date2
            })
            .then(
                (res)=>{
                    console.log(res)
                }
            )
            .catch(
                (err)=>{
                    console.log(err)
                }
            )
        }
        
    }
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <form  onSubmit={postSedia} className='flex flex-col gap-4'>
                    <h1>Bersedia Mengantar</h1>
                    <div className='flex gap-4 flex-row items-center  '>
                    <input onChange={(e:any)=>setDate1(e.target.value)} className='border p-1' type="time" name="time1" id="" />
                    <h1> sampai </h1>
                    <input onChange={(e:any)=>setDate2(e.target.value)}  className='border p-1' type="time" name="time2" id="" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default Driver;