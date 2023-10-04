import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { bookOutline, createOutline, logOutOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Profile: React.FC = () => {
    const history = useHistory()
    const [user, setUser] = useState<any>('')
    const handleSignOut=()=>{
        signOut(auth)
        history.push('/signin')
    }
    onAuthStateChanged(auth, (user) => {
        setUser(user)
    })
    return (
        <IonPage>
            <IonHeader className='ion-no-border pt-4 bg-none'>
                <IonToolbar className='ion-no-border bg-white'>
                <IonButtons slot="start">
                <IonBackButton></IonBackButton>
                </IonButtons>
                    <h1 className='text-xl font-bold text-black px-3'>Profilku</h1>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <IonList>
            <IonItemGroup className='flex flex-col gap-5'>
            <IonItem>
                {/* <div className='flex flex-col gap-5'> */}
                <Link to='/profile-update' className='flex flex-row  gap-6 w-full py-4'>
                    <div className='rounded-full w-12 text-center py-3 bg-blue-500 text-white'>
                        {user?.displayName && user.displayName.split(" ").map((kata:any)=>kata[0]).join("").toUpperCase().substring(0,2)}
                    </div>
                    <div className='flex flex-col gap-1'>
                    <h3 className='font-bold'>{user?.displayName && user.displayName}</h3>
                    <h3>{user?.email && user?.email}</h3>
                    </div>
                </Link>
                </IonItem>
                <IonItem>
                <div>
                    <Link to={'/ketentuan-layanan'} className='flex flex-row gap-2'>
                        <IonIcon icon={bookOutline}></IonIcon><h1>Ketentuan Layanan</h1></Link>
                </div>

                </IonItem>
                <IonItem>
                <div className=' flex flex-row items-center'>
                    <button className='flex flex-row gap-2' onClick={handleSignOut}><span><IonIcon icon={logOutOutline}></IonIcon></span>Sign Out</button>
                </div>
                </IonItem>
                
                {/* </div> */}
                
                </IonItemGroup>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Profile;