import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCheckbox, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom';
import { logoIonic, logoFacebook, logoGoogle } from 'ionicons/icons';
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {auth} from '../firebaseConfig';
function SignIn() {
    const [error, setError] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory()
    onAuthStateChanged(auth, (user) => {
        if(user){
            history.push('/app')
        }
    })
    const signin = async () =>{
        try{
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user)
            history.push('/app')
        }
        catch(error:any){
            console.log(error)
            if(!email || !password){
                setError('Email and password are required')
            }
            else if(error.message === 'Firebase: Error (auth/invalid-login-credentials).'){
                setError('Invalid email or password')
            }
            else if(error.message === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'){
                setError('Too many attempts, please try again later!')
            }
            else{
                setError(error.message.slice(10))
            }
     
        }
    }
    function signinGoogle(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential:any = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            history.push('/app')
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
        }
  return (
    <IonPage>
        
        <IonContent >
            <div className='ion-padding'>
                <h1 className='text-red-500 text-center'>{error}</h1>
                <form action="" style={{display:'flex', flexDirection:'column', padding:'15px', gap:'20px'}}>
                <label htmlFor="email">Email</label>
                <input className='border p-4 focus:outline-blue-300' type='email' onChange={(e:any)=>setEmail(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input className='border p-4 focus:outline-blue-300' type='password' onChange={(e:any)=>setPassword(e.target.value)}></input>
                
                <IonButton onClick={signin}>Sign In</IonButton>
                <IonButton onClick={signinGoogle}>Sign In with Google</IonButton>
                </form>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', textAlign:'center'}}>
                    
                    <p>Don't have an account?<span><Link className='text-blue-500' to={'/signup'} style={{textDecoration:'none',fontWeight:'bold', alignSelf:'center'}}> Sign Up</Link></span> </p>
                
                </div>
            </div>
        </IonContent>

    </IonPage>
    
  );
}
export default SignIn;