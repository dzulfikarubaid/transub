import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
const Deposit: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [order_id, setOrder_id] = React.useState('');
    const [total, setTotal] = React.useState(0);
    const [token, setToken] = React.useState('');
    const process = async () =>{
        const data = {
            email: email,
            order_id: order_id,
            total: total
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post('http://localhost:1000/api/payment/process-transaction', data, config)
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
                localStorage.setItem('payment', JSON.stringify(result));
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
          setEmail('');
          setOrder_id('');
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
                <label htmlFor="">Nama</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className='bg-slate-200 w-full px-2 py-2 focus:outline-none rounded-lg' type="text" placeholder='masukkan nama'/>
                <label htmlFor="">Order ID</label>
                <input value={order_id} onChange={e => setOrder_id(e.target.value)} className='bg-slate-200 w-full px-2 py-2 focus:outline-none rounded-lg' type="text" placeholder='masukkan order id'/>
                <label htmlFor="">Total</label>
                <input value={total} onChange={(e:any) => setTotal(e.target.value)} className='bg-slate-200 w-full px-2 py-2 focus:outline-none rounded-lg' type="text" placeholder='masukkan total'/>
                <button onClick={process}>Process</button>
            </IonContent>
        </IonPage>
    );
};

export default Deposit;