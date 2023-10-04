import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import  { auth } from '../firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword,GoogleAuthProvider, onAuthStateChanged, signInWithPopup, updateProfile } from 'firebase/auth';
import { logoFacebook, logoGoogle } from 'ionicons/icons';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

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
                <input className='border p-4 focus:outline-blue-300' type='text' onChange={(e:any)=>setName(e.target.value)}></input>
                <label htmlFor="email">Email</label>
                <input className='border p-4 focus:outline-blue-300' type='email' onChange={(e:any)=>setEmail(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input className='border p-4 focus:outline-blue-300' type='password' onChange={(e:any)=>setPassword(e.target.value)}></input>
                <label htmlFor="password">Confirm Password</label>
                <input className='border p-4 focus:outline-blue-300' type='password' onChange={(e:any)=>setConfirmPassword(e.target.value)}></input>
               
                <IonButton onClick={signup}>Sign Up</IonButton>
                <IonButton onClick={signupGoogle}>Sign Up with Google</IonButton>
                </form>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', textAlign:'center'}}>
                    
                    <p>Already have an account?<span><Link to={'/signin'} className='text-blue-500' style={{textDecoration:'none',fontWeight:'bold', alignSelf:'center'}}> Sign In</Link></span> </p>
                    
                    </div>
                </div>
    
        </IonContent>
        </IonPage>
    );
};

export default SignUp;