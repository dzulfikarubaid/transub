import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemGroup, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { star, starHalf, starOutline } from 'ionicons/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const PostDetail: React.FC = () => {

    return (
        <IonPage>
             <IonHeader className='ion-no-border pt-4 bg-none'>
                <IonToolbar className='ion-no-border bg-white'>
                <IonButtons slot="start">
                <IonBackButton></IonBackButton>
                </IonButtons>
                    <h1 className='text-xl font-bold text-black px-3'>Soto Ayam</h1>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className='flex flex-col gap-2'>

                        <img className='rounded-xl w-full h-[200px] object-cover' src="soto.jpg" alt="" />
               
                    <h2 className='font-semibold'>Alamat Pembelian</h2>
                    <p>Soto Lamongan Cak Har</p>
                    <h2 className='font-semibold'>Alamat Pengantaran</h2>
                    <p>Jl. Teknik Elektro Asrama Mahasiswa ITS</p>
                    <div className='mt-2 flex flex-row justify-between items-center'>
                            <p>Jarak: 5,24 km</p>
                            <p>Bidder: 2</p>
                            <p>Jumlah: 1</p>
                    </div>
                    <h2 className='font-bold mt-5'>Bidder</h2>

                    <IonList className='w-full mb-5'>
                    <IonItemGroup><IonItem>
                    <Link className='flex flex-row justify-between w-full' to='/app/chat'>
                        <div className='flex flex-row gap-4'>
                        <img  className='w-[40px] h-[40px] object-cover rounded-full' src="jokowi.jpg" alt="" />
                        <div>
                        <h1 className='font-bold'>
                        Joko Widodo
                        </h1>
                        <div className='flex flex-row gap-1'>
                            <IonIcon icon={star}></IonIcon>
                            <IonIcon icon={star}></IonIcon>
                            <IonIcon icon={star}></IonIcon>
                            <IonIcon icon={star}></IonIcon>
                            <IonIcon icon={starOutline}></IonIcon>
                        </div>
                        </div>
                        </div>
                     
                        </Link>
                        </IonItem>
                        <IonItem>
                        <Link className=' flex flex-row justify-between w-full' to='/app/chat'>
                       
                        <div className='flex flex-row gap-4'>
                        <img  className='w-[40px] h-[40px] object-cover rounded-full' src="putin.jpg" alt="" />
                        <div>
                        <h1 className='font-bold'>
                        Vladimir Putin
                        </h1>
                        <div className='flex flex-row gap-1'>
                            <IonIcon icon={star}></IonIcon>
                            <IonIcon icon={star}></IonIcon>
                            <IonIcon icon={star}></IonIcon>
                            <IonIcon icon={star}></IonIcon>
                            <IonIcon icon={starHalf}></IonIcon>
                        </div>
                        </div>
                        </div>
                        </Link>
                        </IonItem>
                        </IonItemGroup>
                    </IonList>
                    <h1 className='font-bold'>Penitip</h1>
                    <div className='flex gap-3 px-4 py-2'>
                        <img className='w-[40px] h-[40px] object-cover rounded-full' src="kingsalman.jpg" alt="" />
                        <h1 className='font-bold'>Salman bin Abdulaziz Al Saud</h1>
                    </div>
                    <Link to={'/apply'} className='text-center mt-10 bg-blue-500 text-white p-2 w-full'>Bid</Link>
                </div>
                
            </IonContent>
            
        </IonPage>
    );
};

export default PostDetail;