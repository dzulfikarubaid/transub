import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Kl: React.FC = () => {

    return (
        <IonPage>
            <IonHeader className='ion-no-border pt-4 bg-none'>
                <IonToolbar className='ion-no-border bg-white'>
                <IonButtons slot="start">
                <IonBackButton></IonBackButton>
                </IonButtons>
                    <h1 className='text-xl font-bold text-black px-3'>Ketentuan Layanan</h1>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h1 className='font-bold text-center mb-3'>Dokumentasi Cara Penggunaan</h1>
    
                <p>
1. Mendaftar Akun<br/>
a. Buka aplikasi dan pilih Sign Up.<br/>
b. Pilihlah metode autentikasi yang diinginkan.<br/>
c. Apabila memilih menggunakan email, maka masukkan email, password, dan konfirmasi password. Apabila memilih nomor telepon, maka masukkan nomor telepon kemudian anda akan menerima pesan sms berupa kode otp, dan masukkan kode otp tersebut ke dalam aplikasi. Apabila memilih google, maka pilih akun google yang ingin digunakan untuk registrasi kemudian setujui.<br/>
d. Setelah melakukan pengisian input, selanjutnya klik tombol Sign Up.<br/>
e. Tunggu hingga pendaftaran selesai.<br/>
f. Apabila berhasil, anda akan dialihkan ke halaman utama aplikasi.<br/><br/>
2. Masuk ke Akun<br/>
a. Buka aplikasi dan pilih Sign In<br/>
b. Pilih metode autentikasi yang diinginkan<br/>
c. Apabila memilih menggunakan email, maka masukkan email dan password. Apabila memilih nomor telepon, maka masukkan nomor telepon kemudian anda akan menerima pesan sms berupa kode otp, dan masukkan kode otp tersebut ke dalam aplikasi. Apabila memilih google, maka pilih akun google yang ingin digunakan untuk masuk ke aplikasi kemudian setujui.<br/>
d. Setelah melakukan pengisian input, selanjutnya klik tombol Sign Up.<br/>
e. Apabila berhasil, anda akan dialihkan ke halaman utama aplikasi.<br/><br/>
3. Mengubah profil<br/>
a. Setelah melakukan Sign In atau Sign Up, anda akan langsung diarahkan ke halaman profil untuk melengkapi data anda<br/>
b. Masukkan nama lengkap, foto profil, dan juga <br/><br/>
4. Membaca Panduan Penggunaan<br/>
a. Pada menu beranda tekan foto profil anda yang berada pada pojok kanan atas<br/>
b. Pilih panduan penggunaan<br/>
c. Anda bisa membaca panduan penggunaan aplikasi secara lengkap<br/><br/>
5. Melakukan Post Permintaan Penitipan<br/>
a. Pada menu beranda, klik tombol + yang terletak di samping foto profil<br/>
b. Anda akan diarahkan pada halaman post<br/>
c. Masukkan nama barang, gambar contoh barang (opsional), dan alamat pengantaran<br/>
d. Tekan tombol post<br/><br/>
6. Mencari Post<br/>
a. Pada menu beranda, tekan pada search bar, kemudian masukkan apa yang ingin anda cari, dan tekan tombol dengan logo kaca pembesar pada keyboard anda<br/>
b. Setelah itu, akan muncul postingan yang memiliki parameter yang sesuai dengan yang anda cari<br/><br/>
7. Melakukan Apply dan Bidding Untuk Melakukan Pembelian dan Pengantaran Barang<br/>
a. Pada menu beranda, pilih apply pada postingan yang anda inginkan<br/>
b. Setelah itu, anda akan diarahkan pada halaman bidding<br/>
c. Di dalam halaman tersebut anda bisa mengisi data seperti alamat anda, alamat pembelian barang, dan harga penawaran<br/>
d. Tekan tombol apply, kemudian anda akan secara otomatis menerima informasi biaya penitipan<br/>
e. Untuk mengecek apply anda berhasil atau gagal, anda bisa mengecek pada postingan penitip yang tadi anda apply, apabila berhasil, maka akan terdapat foto profil anda di bawah postingan penitip<br/><br/>
8. Memilih Pengantar<br/>
a. Apabila ada pengantar yang melakukan apply dan bidding pada postingan anda, anda akan mendapatkan notifikasi<br/>
b. Pada menu notifikasi, tekan pada salah satu pesan notifikasi<br/>
c. Setelah itu, anda akan diarahkan ke halaman postingan yang telah diapply oleh pengantar<br/>
d. Di bagian bawah halaman tersebut anda bisa mengetahui siapa saja pengantar yang telah mengapply ke postingan anda beserta biaya pengiriman dan harga penawaran barang dari pengantar<br/>
e. Pilih salah satu pengantar dengan menekan tombol pilih<br/>
f. Anda akan diarahkan ke menu pembayaran, untuk membayar biaya pengiriman dan harga barang<br/><br/>
9. Mengirim dan Menerima Pesan<br/>
a. Untuk melakukan pengiriman pesan anda bisa pergi ke menu chat, kemudian pilih tombol + untuk mengirim pesan ke pengguna lain yang belum pernah anda chat sebelumnya<br/>
b. Cari nama pengguna yang ingin anda chat<br/>
c. Pilih, dan kemudian anda bisa mengirimkan pesan kepadanya<br/>
d. Atau bisa juga dengan menekan foto profil orang lain yang ada di beranda, kemudian anda akan diarahkan ke dalam halaman profil pengguna tersebut<br/>
e. Tekan pada ikon pesan untuk memulai percakapan dengan pengguna tersebut<br/><br/>
10. Memeriksa status pemesanan<br/>
a. Anda bisa melihat status pesanan anda pada menu pesanan<br/>
b. Anda bisa mencari pesanan yang sudah selesai maupun yang sedang diproses di dalam menu tersebut<br/><br/>
11. Memberikan Bintang dan Ulasan<br/>
a. Setelah anda menerima barang yang anda pesan dan mengonfirmasi barang telah diterima, anda bisa memberikan pengantar bintang dan ulasan<br/>
b. Bintang dan ulasan tersebut akan ditampilkan pada profil pengguna<br/><br/>
12. Sign Out<br/>
a. Pada menu beranda, tekan foto profil anda yang berada pada pojok kanan atas<br/>
b. Tekan tombol Sign Out<br/><br/>


                </p>
            </IonContent>
        </IonPage>
    );
};

export default Kl;