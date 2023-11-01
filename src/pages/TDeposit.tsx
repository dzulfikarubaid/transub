import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { auth, db } from '../firebaseConfig';
import { useHistory } from 'react-router';
import moment from 'moment';
import { addDoc, collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
const Deposit: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [order_id, setOrder_id] = React.useState('');
    const [total, setTotal] = React.useState<any>('');
    const [token, setToken] = React.useState('');
    const [user, setUser] = React.useState<any>(null);
    const history = useHistory()
    const [result, setResult] = React.useState<any>('');
    const [saldo, setSaldo] = React.useState<any>(0);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
    
          const orderCollection = collection(db, 'users');
    
          // Menggunakan query untuk mendapatkan data dengan nama (displayName) yang sama
          // dan hanya dengan status 'ready'
          const q = query(orderCollection, 
            where('email', '==', user.email)
          );
    
          const snapshotUnsubscribe = onSnapshot(q, (querySnapshot:any) => {
            const ordersData = querySnapshot.docs.map((doc:any) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setSaldo(ordersData[0].saldo);
          });
    
          return () => snapshotUnsubscribe();
        } else {
          history.push('/signin');
        }
      });
    
      return () => unsubscribe();
    }, [history]);
  
    const process = async () =>{
        const data = {
            email: user.email,
            order_id: user.displayName+"-"+moment().format('YYYYMMDDHHmmss'),
            total: parseFloat(total)
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post('https://transub-payment-gateway.vercel.app/api/payment/process-transaction', data, config)
        console.log(response.data.token)
        setToken(response.data.token)
    }
    useEffect(() => {
        if (token && 'snap' in window) {
          // Tipekan window.snap sesuai dengan kebutuhan Anda
          const snap: any = window.snap;
      
          snap.pay(
            token,
            {
              onSuccess: (result: any) => {
                setResult(result.gross_amount);
                console.log('payment success', result);
                console.log('user.uid:', user.uid);
                console.log('result.gross_amount:', result.gross_amount);
                console.log('saldo:', saldo);
                console.log('new saldo:', Number(saldo)+Number(result.gross_amount))
                localStorage.setItem('payment', JSON.stringify(result));
                setDoc(doc(db, 'users', user.uid), {
                  saldo: Number(saldo)+Number(result.gross_amount)
                }, {merge: true})
                .then((res)=>{
                  console.log('Firestore update success:', res);
                })
                .catch((err)=>{
                  console.log('Firestore update error:', err.message);
                })
                console.log('payment success', result);
                setToken('');
              },
              onPending: (result: any) => {
                console.log('payment pending', result);
                localStorage.setItem('payment', JSON.stringify(result));
                setToken('');
              },
              onError: (err: any) => {
                console.log('payment error', err);
                setToken('');
              },
              onClose: () => {
                console.log('Anda belum menyelesaikan pembayaran');
                setToken('');
              },
            }
          );
      
          // Reset state setelah melakukan pembayaran
         
          setTotal(0);
        }
      }, [token]);
      

    useEffect(() => {
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        const midtransClientKey = 'SB-Mid-client-Qkw3jqs283jROxRW';
        scriptTag.setAttribute('data-client-key', midtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        }
    }, [])
    
    return (
        <IonPage>
            
            <IonContent >
                
                <div className='p-10'>
                  <h1 className='text-xl font-bold mb-6'>Deposit</h1>
                
                
                <input value={total} onChange={(e:any) => setTotal(e.target.value)} className='bg-slate-200 w-full px-2 py-2 focus:outline-none rounded-lg' type="text" placeholder='Masukkan saldo'/>
                <button onClick={process} className='w-full text-center p-3 bg-blue-900 rounded-xl text-white mt-6'>Process</button>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Deposit;