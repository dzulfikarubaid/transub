import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {logoFacebook,camera,man,personCircleOutline, homeOutline,shirtSharp, womanSharp,manSharp, footballSharp, notificationsOutline, bagOutline, chatbubblesOutline, bicycleOutline, person, personOutline} from 'ionicons/icons' 
import {FaBicycle, FaMotorcycle} from "react-icons/fa"
import { Route, Redirect } from 'react-router';
import Home from './Home';
import Profile from './TProfile';
import Categories from './Categories';
import Notification from './Notification';
import Pesanan from './TPesanan'
import Anter from './TAnter';
import Selesai from './TSelesai';
import Tunggu from './TTunggu';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Chat from './Chat';
import THome from './THome';
import Driver from './TDriver';
import Batal from './TBatal';
import { Link } from 'react-router-dom';

const Tabs: React.FC = () => {

    return (
        <div className='flex flex-col w-full gap-10 p-6'>
        <h1 className='font-bold text-xl '>Pesananmu</h1>
        <IonTabs>
            
            <IonRouterOutlet>
                <Route path='/app/pesanan/tunggu'>
                    <Tunggu/>
                </Route>
                <Route path={'/app/pesanan/antar'} component={Anter}></Route>
                <Route path={'/app/pesanan/selesai'} component={Selesai}></Route>
                <Route path={'/app/pesanan/batal'} component={Batal}></Route>
            
                <Route exact path='/app/pesanan'>
                    <Redirect to='/app/pesanan/tunggu'></Redirect>
                </Route>
            </IonRouterOutlet>
            {/* <IonTabBar slot='top'>
            <div className='w-full flex flex-row gap-4 justify-around bg-black'>
                <Link to={'/app/pesanan/tunggu'}>
                    Menunggu
                </Link>
                <Link to={'/app/pesanan/antar'}>
                    Diantar
                </Link>
                <Link to={'/app/pesanan/selesai'}>
                    Selesai
                </Link>
                <Link to={'/app/pesanan/batal'}>
                    Dibatalkan
                </Link>
            </div>
            </IonTabBar> */}
            <IonTabBar slot='top' style={{paddingLeft:'10px',paddingRight:'10px', paddingTop:'10px', paddingBottom:'10px', marginTop:'50px', backgroundColor:'white',borderBottom:'1px solid rgba(50, 50, 50, 0.1)'}} className=''>
            
            <IonTabButton tab='tunggu' href='/app/pesanan/tunggu'>
                   <h1 className='text-sm'>Menunggu</h1>
                  
                </IonTabButton>
                <IonTabButton tab='antar' href='/app/pesanan/antar'>
                    <h1 className='text-sm'>Diantar</h1>
                    
                </IonTabButton>
              
                <IonTabButton tab='selesai' href='/app/pesanan/selesai'>
                   <h1 className='text-sm'>Selesai</h1>
                </IonTabButton>
                <IonTabButton tab='batal' href='/app/pesanan/batal'>
                   <h1 className='text-sm'>Dibatalkan</h1>
                </IonTabButton>
                
                
            </IonTabBar>
        </IonTabs>
        
        </div>
        

    );
};

export default Tabs;