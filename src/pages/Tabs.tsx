import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { logoFacebook, camera, man, personCircleOutline, homeOutline, shirtSharp, womanSharp, manSharp, footballSharp, notificationsOutline, bagOutline, chatbubblesOutline, bicycleOutline, person, personOutline } from 'ionicons/icons'
import { FaBicycle, FaMotorcycle } from "react-icons/fa"
import { Route, Redirect } from 'react-router';
import Home from './Home';
import Profile from './TProfile';
import Categories from './Categories';
import Notification from './Notification';
import Pesanan from './TPesanan'

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Chat from './Chat';
import THome from './THome';
import Driver from './TDriver';
import TabsPesanan from './TabsPesanan';
import ChatPage from './TChatPage';

const Tabs: React.FC = () => {

    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path='/app/pesanan'>
                    <TabsPesanan />
                </Route>
                <Route path={'/app/driver'} component={Driver}></Route>
                <Route path={'/app/notification'} component={Notification}></Route>
                <Route path="/app/profile">
                    <Profile></Profile>
                </Route>
                <Route path={"/app/chat"} component={ChatPage}></Route>
                <Route path="/app/home">
                    <THome></THome>
                </Route>
                <Route exact path='/app'>
                    <Redirect to='/app/home'></Redirect>
                </Route>
            </IonRouterOutlet>
            <IonTabBar color={'light'} slot='bottom' style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px' }} className='border-t-4 border-solid border-gray-200'>
                <IonTabButton tab='home' href='/app/home'>
                    <IonIcon icon={homeOutline}>
                    </IonIcon>

                </IonTabButton>
                {/* <IonTabButton tab='notification' href='/app/notification'>
                    <IonIcon icon={notificationsOutline}>
                    </IonIcon>

                </IonTabButton> */}
                <IonTabButton tab='driver' href='/app/driver'>
                    <IonIcon icon={bicycleOutline}></IonIcon>
                </IonTabButton>
                <IonTabButton tab='pesanan' href='/app/pesanan'>
                    <IonIcon icon={bagOutline}>
                    </IonIcon>
                </IonTabButton>
                <IonTabButton tab='chat' href='/app/chat'>
                    <IonIcon icon={chatbubblesOutline}></IonIcon>
                </IonTabButton>
                <IonTabButton tab='profile' href='/app/profile'>
                    <IonIcon icon={personOutline}>
                    </IonIcon>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>

    );
};

export default Tabs;