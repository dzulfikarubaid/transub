import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useHistory } from 'react-router';
import { IoArrowBack, IoSearch } from 'react-icons/io5';


const UserList: React.FC = () => {
    const [users, setUsers] = React.useState<any>([]);
    const history = useHistory();
    const [search, setSearch] = React.useState('');
    const [user, setUser] = React.useState<any>(null);
    const [roomId, setRoomId] = React.useState<any>('');
    const [filteredUsers, setFilteredUsers] = React.useState<any>([]);
    const [searched, setSearched] = React.useState(false);
    const [searchedText, setSearchedText] = React.useState('');
    useEffect(() => {
        const fetchData = async () => {
            const userCollection = collection(db, 'users');
            const unsubscribe = onSnapshot(userCollection, (snapshot) => {
                setUsers(snapshot.docs);
            });
            
            return () => {
                // Unsubscribe from the snapshot listener when the component unmounts
                unsubscribe();
            };
        };

        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchData();
                setUser(user)
            } else {
                history.push('/signin');
            }
        });
    }, [history]);

    function searchUser() {
        if (!search) {
            // If search is empty, fetch all users
            getDocs(collection(db, 'users')).then((res) => {
                setUsers(res.docs);
            });
        } else {
            // If search is not empty, filter users based on the search input
            const query = search.toLowerCase();
            const filteredUsers = users.filter((user: any) => {
                const userName = user.data()?.name?.toLowerCase();
                const userEmail = user.data()?.email?.toLowerCase();
                return userName?.includes(query) || userEmail?.includes(query);
            });
            setSearched(true)
            setFilteredUsers(filteredUsers);
            setSearchedText(search)
        }
    }
    function createRoom({ userId }: any) {
        // Mengurutkan UID untuk memastikan urutan yang konsisten
        const sortedUids = [userId, user.uid].sort();
      
        // Menghasilkan id room yang tetap
        const roomId = sortedUids.join("-");
      
        setRoomId(roomId);
        console.log(roomId);
      
        history.push(`/chat/${roomId}`);
      }
      

    return (
        <IonPage>
            <IonContent>
                <div className='flex flex-col gap-4 w-full p-6'>
                    <div className='flex gap-2 w-full'>
                    <button onClick={() => history.goBack()}>
                                <IoArrowBack size={25}></IoArrowBack>
                                </button>
                        <input
                            type='text'
                            value={search}
                            placeholder='Cari nama atau email'
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full rounded-xl p-4 py-2 focus:outline-none bg-gray-100'
                        />
                        <button onClick={searchUser} >
                            <IoSearch size={25}></IoSearch>
                        </button>
                    </div>
                    {filteredUsers &&
                        filteredUsers.map((user: any) => (
                            <button onClick={() => createRoom({userId: user.id})} key={user.id} >
                                <div className='border-b-[1px] p-4 flex flex-col gap-2 text-left'>
                                <h1 className='font-semibold'>{user.data()?.name}</h1>
                                <h1>{user.data()?.email}</h1>
                                </div>
                            </button>
                        ))
                    
                    
                    }
                    {
                        searched === true && searchedText != '' && filteredUsers.length === 0 ? <h1 className='text-center'>Tidak ada hasil untuk '{searchedText}'</h1> : ''

                    }
                </div>
            </IonContent>
        </IonPage>
    );
};

export default UserList;


