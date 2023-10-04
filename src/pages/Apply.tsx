import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { cloudUploadOutline } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Apply: React.FC = () => {
  
    return (
        <IonPage>
             <IonHeader className='ion-no-border pt-4 bg-none'>
                <IonToolbar className='ion-no-border bg-white'>
                <IonButtons slot="start">
                <IonBackButton></IonBackButton>
                </IonButtons>
                    <h1 className='text-xl font-bold text-black px-3'>Penawaran Pengantaran</h1>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <form className='flex flex-col gap-2'>
                    <label htmlFor="">Kamu di mana?</label>
                    <input className='bg-slate-200 w-full px-2 py-2 focus:outline-none rounded-lg' type="text" placeholder='masukkan alamat kamu'/>
                    <label htmlFor="">Mau ngasih harga berapa?</label>
                    <input className='bg-slate-200 w-full px-2 py-2 focus:outline-none rounded-lg' type="text" placeholder='masukkan harga barang'/>
                    <Link  className='text-center mt-5 bg-blue-500 text-white p-2 rounded-xl' to='/app/home'>Kirim Penawaran
                    </Link>
                   
                </form>
            </IonContent>
        </IonPage>
    );
};

export default Apply;