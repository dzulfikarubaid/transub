import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCheckbox, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom';
import { logoIonic, logoFacebook, logoGoogle } from 'ionicons/icons';
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {auth} from '../firebaseConfig';
import { FcGoogle } from 'react-icons/fc';
import './signin.css'
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
            <div className='ion-padding p-16'>
                <h1 className='text-blue-700 text-2xl font-semibold mb-4'>Welcome back!</h1>
                <p>Hello there, sign in to continue</p>
                <div className='mt-20'>
                <h1 className='text-red-500 text-center'>{error}</h1>
                <form action="" style={{display:'flex', flexDirection:'column', gap:'20px'}}>
                <label htmlFor="email">Email</label>
                <input placeholder='Enter your email' className='border-gray-900 border-2 p-3 focus:outline-blue-300 rounded-xl' type='email' onChange={(e:any)=>setEmail(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input placeholder='Enter your password' className='border-gray-900 border-2 p-3 focus:outline-blue-300 rounded-xl' type='password' onChange={(e:any)=>setPassword(e.target.value)}></input>
                
                <IonButton className='capitalize gradient' onClick={signin}>
                    Sign In</IonButton>
                {/* <h1 className='text-center'>or</h1> */}
                {/* <IonButton className='google capitalize ' onClick={signinGoogle}><div className='flex justify-center items-center flex-row gap-4'>
                <FcGoogle size={25}></FcGoogle>
                    <h1>Continue with Google</h1>
                    </div></IonButton> */}
                </form>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', textAlign:'center'}} className='mt-6'>
                    
                    <p>Don't have an account?</p>
                    <Link className='text-blue-800 mt-6 rounded-xl w-full p-3 bg-[#DADADA]' to={'/signup'} style={{textDecoration:'none',fontWeight:'bold', alignSelf:'center'}}> Sign Up</Link>
                     
                
                </div>
                </div>
                
            </div>
        </IonContent>

    </IonPage>
    
  );
}
export default SignIn;