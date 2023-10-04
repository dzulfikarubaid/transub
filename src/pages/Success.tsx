import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Success: React.FC = () => {

    return (
        <IonPage>
            <IonContent>
            <div>
                <h1>Terima kasih, data anda telah disimpan,selanjutnya anda akan dihubungi oleh admin</h1>
            </div>
            </IonContent>
            
        </IonPage>
    );
};

export default Success;