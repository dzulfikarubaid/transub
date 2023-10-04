import { IonContent, IonHeader, IonIcon, IonPage, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline, bagOutline, card, chatbubblesOutline, homeOutline, locationOutline, notificationsOutline } from 'ionicons/icons';
import React, { useState } from 'react';

const Pesanan: React.FC = () => {
    const cardSelesai = () =>{
        return(
            <div className='mt-5 w-full flex flex-col gap-6'>
                <div className='bg-[#D8E5FD] rounded-xl p-4 flex flex-col gap-2 shadow-lg'>
                <div className='flex gap-3'>
                        <img className='w-[40px] h-[40px] object-cover rounded-full' src="jokowi.jpg" alt="" />
                        <h1 className='font-bold'>Joko Widodo</h1>
                    </div>
                <h1 className='font-semibold text-lg'>Nasi ayam joder spicy galbi</h1>
            <p><span><IonIcon icon={locationOutline}></IonIcon></span> Joder Gebang</p>
            <p className='font-bold'>Harga Barang: <span className='text-red-500'>Rp10.000</span></p>
            <p className='font-bold'>Biaya Antar: <span className='text-red-500'>Rp2.000</span></p>
            <div className='flex flex-row w-full gap-3'>
                <button className='w-full bg-white text-blue-500 p-2 rounded-xl'>Nilai</button>
            </div>
                </div>
                </div>

        )
    }
    const cardAntar = () =>{
        return(
            
                <div className='mt-5 w-full flex flex-col gap-6'>
                <div className='bg-[#D8E5FD] rounded-xl p-4 flex flex-col gap-2 shadow-lg'>
                <div className='flex gap-3'>
                        <img className='w-[40px] h-[40px] object-cover rounded-full' src="kingsalman.jpg" alt="" />
                        <h1 className='font-bold'>Salman bin Abdulaziz Al Saud</h1>
                    </div>
                <h1 className='font-semibold text-lg'>Jus buah naga</h1>
            <p><span><IonIcon icon={locationOutline}></IonIcon></span> Jus barokah keputih</p>
            <p className='font-bold'>Harga Barang: <span className='text-red-500'>Rp12.000</span></p>
            <p className='font-bold'>Biaya Antar: <span className='text-red-500'>Rp2.000</span></p>
            <div className='flex flex-row w-full gap-3'>
                <button className='w-full bg-blue-500 text-white p-2 rounded-xl'>Pesanan diterima</button>
            </div>
                </div>
                </div>
        )
    }
    const cardTunggu = ()=>{
        return(
            <div className='mt-5 w-full flex flex-col gap-6'>
            <div className='bg-[#D8E5FD] rounded-xl p-4 flex flex-col gap-2 shadow-lg'>
            <div className='flex gap-3'>
                        <img className='w-[40px] h-[40px] object-cover rounded-full' src="bill.jpg" alt="" />
                        <h1 className='font-bold'>Bill Gates</h1>
                    </div>
            <h1 className='font-semibold text-lg'>Keyboard Rexus</h1>
            <p><span><IonIcon icon={locationOutline}></IonIcon></span> Tunjungan Plaza 2</p>
            <p className='font-bold'>Harga Barang: <span className='text-red-500'>Rp200.000</span></p>
            <p className='font-bold'>Biaya Antar: <span className='text-red-500'>Rp10.000</span></p>
            <div className='flex flex-row w-full gap-3'>
                <button className='w-full p-2 rounded-xl bg-white text-blue-500'>Tolak</button >
                <button className='w-full bg-blue-500 text-white rounded-xl'>Terima</button>
            </div>
            </div>
            <div className='bg-[#D8E5FD] rounded-xl p-4 flex flex-col gap-2 shadow-lg'>
            <div className='flex gap-3'>
                        <img className='w-[40px] h-[40px] object-cover rounded-full' src="prabowo.jpg" alt="" />
                        <h1 className='font-bold'>Prabowo</h1>
                    </div>
            <h1 className='font-semibold text-lg'>Keyboard Rexus</h1>
            <p><span><IonIcon icon={locationOutline}></IonIcon></span> Tunjungan Plaza 2</p>
            <p className='font-bold'>Harga Barang: <span className='text-red-500'>Rp220.000</span></p>
            <p className='font-bold'>Biaya Antar: <span className='text-red-500'>Rp8.000</span></p>
            <div className='flex flex-row w-full gap-3'>
                <button className='w-full p-2 rounded-xl bg-white text-blue-500'>Tolak</button >
                <button className='w-full bg-blue-500 text-white rounded-xl'>Terima</button>
            </div>
            </div>
            
            <div className='bg-[#D8E5FD] rounded-xl p-4 flex flex-col gap-2 shadow-lg'>
            <div className='flex gap-3'>
                        <img className='w-[40px] h-[40px] object-cover rounded-full' src="kingsalman.jpg" alt="" />
                        <h1 className='font-bold'>Salman bin Abdulaziz Al Saud</h1>
                    </div>
                    
            <h1 className='font-semibold text-lg'>Es Krim Mixue</h1>
            <p><span><IonIcon icon={locationOutline}></IonIcon></span> Mixue cabang keputih</p>
            <p className='font-bold'>Harga Barang: <span className='text-red-500'>Rp20.000</span></p>
            <p className='font-bold'>Biaya Antar: <span className='text-red-500'>Rp2.000</span></p>
            <div className='flex flex-row w-full gap-3'>
                <button className='w-full p-2 rounded-xl bg-white text-blue-500'>Tolak</button >
                <button className='w-full bg-blue-500 text-white rounded-xl'>Terima</button>
            </div>
            </div>
            
            
        </div>
        )
    }
    const [selesai, setSelesai] = useState(<></>)
    const [diantar,setDiantar] = useState(<></>)
    const [Menunggu, setMenunggu] = useState(cardTunggu)
    const [Bg1,setBg1] = useState('blue-500')
    const [text1, setText1] = useState('white')
    const [Bg2,setBg2] = useState('slate-200')
    const [text2, setText2] = useState('black')
    const [Bg3,setBg3] = useState('slate-200')
    const [text3, setText3] = useState('black')
    const Button1 = (props:any)=>{
        const {bg, children,text} =props
        return(
            <button onClick={handleClick1} className={`bg-${bg} px-2 py-1 text-${text} rounded-xl w-full`}>{children}</button>
        )
    }
    const Button2 = (props:any)=>{
        const {bg, children,text} =props
        return(
            <button onClick={handleClick2} className={`bg-${bg} px-2 py-1 text-${text} rounded-xl w-full`}>{children}</button>
        )
    }
    const Button3 = (props:any)=>{
        const {bg, children,text} =props
        return(
            <button onClick={handleClick3} className={`bg-${bg} px-2 py-1 text-${text} rounded-xl w-full`}>{children}</button>
        )
    }
    const handleClick1 = ()=>{
        setBg1('blue-500')
        setText1('white')
        setBg2('slate-200')
        setText2('black')
        setBg3('slate-200')
        setText3('black')
        setMenunggu(cardTunggu)
        setDiantar(<></>)
        setSelesai(<></>)
    }
    const handleClick2 = ()=>{
        setBg2('blue-500')
        setText2('white')
        setBg1('slate-200')
        setText1('black')
        setBg3('slate-200')
        setText3('black')
        setMenunggu(<></>)
        setDiantar(cardAntar)
        setSelesai(<></>)
    }
    const handleClick3 =()=>{
        setBg3('blue-500')
        setText3('white')
        setBg2('slate-200')
        setText2('black')
        setBg1('slate-200')
        setText1('black')
        setMenunggu(<></>)
        setDiantar(<></>)
        setSelesai(cardSelesai)
    }
    return (
        <IonPage>
            <IonContent >
            <div className='px-8 mt-8 flex-col flex mb-5'>
                    <h1 className='text-xl font-bold'>Pesanan</h1>
                   <div className='flex flex-row justify-between mt-5 bg-slate-200 rounded-xl '>
                    <Button1 bg={Bg1} text={text1}>menunggu</Button1>
                    <Button2 bg={Bg2} text={text2}>diantar</Button2>
                    <Button3 bg={Bg3} text={text3}>selesai</Button3>
                  
                   </div>
                   {Menunggu}
                   {diantar}
                   {selesai}
                </div>
               
                
            </IonContent>
            
        </IonPage>
        
    );
};

export default Pesanan;