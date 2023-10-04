import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonButton, IonIcon, IonCard, IonCardContent, IonText, IonBackButton, IonButtons } from '@ionic/react';
import React from 'react';
import {logoFacebook,camera,man,personCircleOutline, homeOutline,shirtSharp, womanSharp,manSharp, footballSharp, addOutline, locationOutline, chevronForwardOutline} from 'ionicons/icons' 
import './Home.css'
import { Camera, CameraResultType } from '@capacitor/camera';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


const Home: React.FC = () => {
    const history = useHistory()
      const handleAdd = () =>{
        history.push('/addpost')
      }
      const handleProfile = () =>{
        history.push('/profile')
      }
      const goDetailPost = () =>{
        history.push('/detailpost')
      }
    return (
        <IonPage>
             
            <IonContent>
                
                <div className='flex flex-col gap-2 mt-6'>
                <div className='px-8 text-xl font-bold flex-row justify-between items-center flex'>
                    <h1>Beranda</h1>
                    <div className='gap-6 flex flex-row items-center justify-center'>
                    <button onClick={handleAdd}><IonIcon size='large' icon={addOutline}></IonIcon></button>
                    <button onClick={handleProfile}>
                       <img src="aku.png" className='mb-2 w-[40px] rounded-full border-2 object-cover' alt="" />
                    </button>

                    </div>
                </div>
                <div className='px-5 '>
                    <div  style={{display:'flex', justifyContent:'center'}}>
                    <IonSearchbar animated={true} showCancelButton="focus" placeholder='Cari Sesuatu' class="custom"></IonSearchbar>
                   
                    </div>
                   
                    {/* <IonCardContent> */}

                </div>
                <div className='px-8 flex flex-col gap-3 mb-3'>
                <Link to={'/ketentuan-layanan'}>
                <div className='flex flex-row justify-center gap-5'>
                        <div className=' bg-gradient-to-tl from-[#5D93F8] to-[#acc8fd] h-[100px] w-[200px] rounded-xl flex flex-row '>
                            <h3 className='text-[18px] font-[600] pl-4 py-4'>Saya mau nitip</h3>
                            <img className='mt-10 mr-4' style={{width:'60px', height:'60px'}} src="package 1.png" />
                        </div>
                        
                        <div className='bg-gradient-to-tl from-[#FFB42B] to-[#f6d392] h-[100px] w-[200px] rounded-xl flex flex-row '>
                        <h3 className='text-[18px] font-semibold pl-4 py-4'>Saya mau antar</h3>
                            <img className='mt-10 mr-4' style={{width:'60px', height:'60px'}} src="food-delivery 1.png"/>
                        </div>
                    
                        
                    </div>
                    </Link>
                    <div className='flex flex-col gap-3'>
                        <h3 className='font-semibold'>Promo Juli 7.7</h3>
                        <div className='flex flex-row gap-2'>
                        <Swiper
      // install Swiper modules
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={50}
                            slidesPerView={1}
                          
                            scrollbar={{ draggable: true }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                        >
                        <SwiperSlide>
                        <div className='bg-[#f6d392] w-[300px] h-[100px] rounded-xl flex flex-row'>
                            <p className='text-lg font-bold pl-4 py-3'>voucher titip barang diskon <span className='text-red-500'>5%</span> </p>
                            <img className='rounded-xl' src="delivery-man 1.png" alt="" />

                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className='bg-[#f6d392] w-[300px] h-[100px] rounded-xl flex flex-row'>
                            <p className='text-lg font-bold pl-4 py-3'>voucher potongan ongkir <span className='text-red-500'>5%</span> </p>
                            <img className='rounded-xl' src="delivery-man 1.png" alt="" />

                        </div>
                        </SwiperSlide>
                        </Swiper>
                  
                        </div>
                        <p className='font-semibold'>Di sekitar anda</p>
                        
                        <div className='border-slate-200 border-2 rounded-xl '>
                            <div className='flex flex-row justify-between p-4 '>
                            <button onClick={goDetailPost} className='text-left'>
                            <div>
                            <p className=' font-semibold'>Soto Ayam</p>
                            <p><span><IonIcon icon={locationOutline}></IonIcon></span>Soto Lamongan Cak Har</p>
                            </div>
                            </button>
                            <div className='pl-2 flex flex-row gap-3 h-fit'>
                            <Link  to={'/apply'}>Bid</Link>
                            <Link to={'/app/chat'}>Chat</Link>
                            </div>
                            </div>
                            <div className='px-4 pb-4 flex flex-row justify-between items-center text-sm'>
                            <p>Jarak: 5,24 km</p>
                            <p>Bidder: 2</p>
                            <p>Jumlah: 1</p>
                            </div>   
                        </div>
                        <div className='border-slate-200 border-2 rounded-xl '>
                            <div className='flex flex-row justify-between p-4 '>
                            <button onClick={goDetailPost} className='text-left'>
                            <div>
                            <p className=' font-semibold'>Sapu</p>
                            <p><span><IonIcon icon={locationOutline}></IonIcon></span>Sakinah</p>
                            </div>
                            </button>
                            <div className='pl-2 flex flex-row gap-3'>
                            <Link  to={'/apply'}>Bid</Link>
                            <Link to={'/app/chat'}>Chat</Link>
                            </div>
                            </div>
                            <div className='px-4 pb-4 flex flex-row justify-between items-center text-sm'>
                            <p>Jarak: 0,2 km</p>
                            <p>Bidder: 0</p>
                            <p>Jumlah: 1</p>
                            </div>   
                        </div>
                        <div className='border-slate-200 border-2 rounded-xl '>
                            <div className='flex flex-row justify-between p-4 '>
                            <button onClick={goDetailPost} className='text-left'>
                            <div>
                            <p className=' font-semibold'>Sabun Cair Dettol</p>
                            <p><span><IonIcon icon={locationOutline}></IonIcon></span>Sakinah</p>
                            </div>
                            </button>
                            <div className='pl-2 flex flex-row gap-3'>
                            <Link  to={'/apply'}>Bid</Link>
                            <Link to={'/app/chat'}>Chat</Link>
                            </div>
                            </div>
                            <div className='px-4 pb-4 flex flex-row justify-between items-center text-sm'>
                            <p>Jarak: 0,2 km</p>
                            <p>Bidder: 5</p>
                            <p>Jumlah: 1</p>
                            </div>   
                        </div>
                        <div className='border-slate-200 border-2 rounded-xl '>
                            <div className='flex flex-row justify-between p-4 '>
                            <button onClick={goDetailPost} className='text-left'>
                            <div>
                            <p className=' font-semibold'>Es Krim Mixue</p>
                            <p><span><IonIcon icon={locationOutline}></IonIcon></span>Mixue Cabang Keputih</p>
                            </div>
                            </button>
                            <div className='pl-2 flex flex-row gap-3'>
                            <Link  to={'/apply'}>Bid</Link>
                            <Link to={'/app/chat'}>Chat</Link>
                            </div>
                            </div>
                            <div className='px-4 pb-4 flex flex-row justify-between items-center text-sm'>
                            <p>Jarak: 0,4 km</p>
                            <p>Bidder: 5</p>
                            <p>Jumlah: 1</p>
                            </div>   
                        </div>
                        <div className='border-slate-200 border-2 rounded-xl '>
                            <div className='flex flex-row justify-between p-4 '>
                            <button onClick={goDetailPost} className='text-left'>
                            <div>
                            <p className=' font-semibold'>Keyboard Rexus</p>
                            <p><span><IonIcon icon={locationOutline}></IonIcon></span>Tunjungan Plaza 2</p>
                            </div>
                            </button>
                            <div className='pl-2 flex flex-row gap-3'>
                            <Link  to={'/'}>Bid</Link>
                            <Link to={'/app/chat'}>Chat</Link>
                            </div>
                            </div>
                            <div className='px-4 pb-4 flex flex-row justify-between items-center text-sm'>
                            <p>Jarak: 6,2 km</p>
                            <p>Bidder: 3</p>
                            <p>Jumlah: 1</p>
                            </div>   
                        </div>
                        
                    </div>
                </div>

                </div>
                
                
            </IonContent>
        </IonPage>
    );
};

export default Home;