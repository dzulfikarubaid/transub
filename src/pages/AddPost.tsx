import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Link } from 'react-router-dom';
import { fileTray, cloudUploadOutline } from 'ionicons/icons';
const AddPost: React.FC = () => {
    const [Image, setImage] = React.useState<string>();
    const takePicture = async () => {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.Uri
        });
      
        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        var imageUrl = image.webPath;
      
        // Can be set to the src of an image now
        setImage(imageUrl)
      };
    return (
        <IonPage>
            <IonHeader className='ion-no-border pt-4 bg-none'>
                <IonToolbar className='ion-no-border bg-white'>
                <IonButtons slot="start">
                <IonBackButton></IonBackButton>
                </IonButtons>
                    <h1 className='text-xl font-bold text-black px-3'>Permintaan Penitipan</h1>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <form action="" className='flex flex-col gap-2'>
                    <label htmlFor="">Masukkan nama barang</label>
                    <input className='bg-slate-200 w-full px-2 py-2 focus:outline-none rounded-lg' type="text" placeholder='cth: Headphone'/>
                    <label htmlFor="">Contoh gambar barang</label>
                    <IonButton color='medium' onClick={takePicture} style={{width:'100%',height:'200px'}} >
                        <div className='py-4 w-full rounded-lg bg-slate-200 text-slate-400'>
                        <IonIcon size='large' icon={cloudUploadOutline}></IonIcon>
                        <p>klik untuk upload</p>
                        </div>
                    </IonButton>
                    <input type="image" value={Image} />
                    <label htmlFor="">Mau beli berapa?</label>
                    <input type="text" className='bg-slate-200 w-full px-2 py-2 focus:outline-none rounded-lg' placeholder='masukkan jumlah barang'/>
                    <label htmlFor="">Mau beli di mana?</label>
                    <input className='bg-slate-200 w-full px-2 py-2 focus:outline-none rounded-lg' type="text" placeholder='masukkan alamat pembelian'/>
                    <label htmlFor="">Mau diantar ke mana?</label>
                    <input className='bg-slate-200 w-full px-2 py-2 focus:outline-none rounded-lg' type="text" placeholder='masukkan alamat kamu'/>
                    <button className='mt-5 bg-blue-500 text-white p-2 rounded-xl'>Buat Permintaan</button>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default AddPost;