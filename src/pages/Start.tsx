import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { onAuthStateChanged } from 'firebase/auth';
import { logoIonic } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebaseConfig';
function Start() {
    const history = useHistory()
    onAuthStateChanged(auth, (user) => {
        if(user){
            history.push('/app')
        }
    })
    const handleSignin = () =>{
        history.push('/signin')
    }
    const handleSignup=()=>{
        history.push('/signup')
    }
    return (
        <IonPage >
            <IonContent className="ion-padding ion-text-center">
            <div
                style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '85%',
                }}> 
                <img className='p-20' src="Logo.png" alt="" />
            </div>
                <IonButton expand='block'className='ion-text-capitalize ion-padding' color={'primary'} style={{fontSize:'16px', fontWeight:'bold'}} onClick={handleSignup}>Sign Up</IonButton>
                <IonButton expand='block' color={'primary'} fill="clear" className='ion-text-capitalize ion-padding text-blue-500' style={{fontSize:'16px', fontWeight:'bold'}} onClick={handleSignin}>Sign In</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Start;