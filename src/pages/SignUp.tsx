import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import  { auth } from '../firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword,GoogleAuthProvider, onAuthStateChanged, signInWithPopup, updateProfile, User } from 'firebase/auth';
import { logoFacebook, logoGoogle } from 'ionicons/icons';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const db = getFirestore();// ... (import statements)

const SignUp: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [name, setName] = React.useState('');
  const [userGoogle, setUserGoogle] = React.useState<User | null>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserGoogle(user);
      history.push('/WA');
    }
  });

  const signup = async () => {
    if (password === confirmPassword) {
      try {
        const users = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(users.user, { displayName: name });
        history.push('/WA');
      } catch (error: any) {
        setError(error.message.slice(10));
      }
    } else {
      setError('Password does not match');
    }
  };

  async function signupGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        setUserGoogle(user);

        await updateProfile(auth.currentUser, {
          displayName: user.displayName,
          photoURL: user.photoURL
        });

        

        history.push('/WA');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <div className='ion-padding'>
          <h1 className='text-red-500 text-center'>{error}</h1>
          <form
            action=''
            style={{ display: 'flex', flexDirection: 'column', padding: '15px', gap: '20px' }}
          >
            <label htmlFor="name">Full Name</label>
                <input placeholder='Enter your name' className='border-gray-900 border-2 p-3 focus:outline-blue-300 rounded-xl' type='text' onChange={(e:any)=>setName(e.target.value)}></input>
                <label htmlFor="email">Email</label>
                <input placeholder='Enter your email' className='border-gray-900 border-2 p-3 focus:outline-blue-300 rounded-xl' type='email' onChange={(e:any)=>setEmail(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input placeholder='Enter your password' className='border-gray-900 border-2 p-3 focus:outline-blue-300 rounded-xl' type='password' onChange={(e:any)=>setPassword(e.target.value)}></input>
                <label htmlFor="password">Confirm Password</label>
                <input placeholder='Enter your password again' className='border-gray-900 border-2 p-3 focus:outline-blue-300 rounded-xl' type='password' onChange={(e:any)=>setConfirmPassword(e.target.value)}></input>
            <IonButton className='capitalize gradient' onClick={signup}>
              Sign Up
            </IonButton>
            <h1 className='text-center'>or</h1>
            <IonButton className='capitalize google' onClick={signupGoogle}>
              <div className='flex flex-row gap-4 justify-center items-center'>
                <FcGoogle size={25}></FcGoogle>
                <h1>Sign Up with Google</h1>
              </div>
            </IonButton>
          </form>
          <div
            style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
            className='mt-6'
          >
               <p>Already have an account?</p>
                    <Link className='text-blue-800 mt-6 rounded-xl w-full p-3 bg-[#DADADA]' to={'/signin'} style={{textDecoration:'none',fontWeight:'bold', alignSelf:'center'}}> Sign In</Link>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;


