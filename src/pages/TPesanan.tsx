import { IonContent, IonHeader, IonIcon, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { homeOutline, notificationsOutline, bicycleOutline, bagOutline, personOutline } from 'ionicons/icons';
import React from 'react';
import { Route } from 'react-router';
import Driver from './TDriver';
import THome from './THome';
import Profile from './TProfile';
import Notification from './Notification';
import TabsPesanan from './TabsPesanan';
const Pesanan: React.FC = () => {

    return (
        <IonPage>
            <IonContent className="ion-padding">
                
            </IonContent>
        </IonPage>
    );
};

export default Pesanan;