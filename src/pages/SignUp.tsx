import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import  { auth } from '../firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword,GoogleAuthProvider, onAuthStateChanged, signInWithPopup, updateProfile } from 'firebase/auth';
import { logoFacebook, logoGoogle } from 'ionicons/icons';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const db = getFirestore();
const SignUp: React.FC = () => {
    const history = useHistory()
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [name, setName] = React.useState('')
    onAuthStateChanged(auth, (user) => {
        if(user){
            history.push('/app')
        }
    })
    const signup = async () =>{
        if(password === confirmPassword){
            try{
                const user = await createUserWithEmailAndPassword(auth, email, password)
                console.log(user)
                await updateProfile(auth.currentUser, { displayName: name })
                if(user){
                    await addDoc(collection(db, 'users'), {
                        uid: user.user.uid,
                        name: name,
                        email: email,
                        photoURL: ''
                    }).then((res)=>{
                        console.log(res)
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
                
                history.push('/app')

            }
            catch(error:any){
                setError(error.message.slice(10))
            }
            
        }
        else{
            setError('Password does not match')
        }
        
        
    }
    function signupGoogle(){
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
            setError(errorMessage)
            // ...
        });
    }

    return (
    
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar >
                    <IonButtons slot="start">
                    <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Sign Up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
            <div className='ion-padding'>
                <h1 className='text-red-500 text-center'>{error}</h1>
                <form action="" style={{display:'flex', flexDirection:'column', padding:'15px', gap:'20px'}}>
                <label htmlFor="name">Full Name</label>
                <input placeholder='Enter your name' className='border-gray-900 border-2 p-3 focus:outline-blue-300 rounded-xl' type='text' onChange={(e:any)=>setName(e.target.value)}></input>
                <label htmlFor="email">Email</label>
                <input placeholder='Enter your email' className='border-gray-900 border-2 p-3 focus:outline-blue-300 rounded-xl' type='email' onChange={(e:any)=>setEmail(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input placeholder='Enter your password' className='border-gray-900 border-2 p-3 focus:outline-blue-300 rounded-xl' type='password' onChange={(e:any)=>setPassword(e.target.value)}></input>
                <label htmlFor="password">Confirm Password</label>
                <input placeholder='Enter your password again' className='border-gray-900 border-2 p-3 focus:outline-blue-300 rounded-xl' type='password' onChange={(e:any)=>setConfirmPassword(e.target.value)}></input>
               
                <IonButton className='capitalize' onClick={signup}>Sign Up</IonButton>
                <h1 className='text-center'>or</h1>
                <IonButton className='capitalize google'  onClick={signupGoogle}>
                    <div className='flex flex-row gap-4 justify-center items-center'>
                        <FcGoogle size={25}></FcGoogle>
                        <h1>Sign Up with Google</h1>
                    </div>
                </IonButton>
                </form>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', textAlign:'center'}} className='mt-6'>
                    
                    <p>Already have an account?</p>
                    <Link className='text-blue-800 mt-6 rounded-xl w-full p-3 bg-[#DADADA]' to={'/signin'} style={{textDecoration:'none',fontWeight:'bold', alignSelf:'center'}}> Sign In</Link>
                     
                
                </div>
                </div>
    
        </IonContent>
        </IonPage>
    );
};

export default SignUp;