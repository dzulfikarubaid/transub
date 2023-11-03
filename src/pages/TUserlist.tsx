import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useHistory } from 'react-router';


const UserList: React.FC = () => {
    const [users, setUsers] = React.useState<any>([]);
    const history = useHistory();
    const [search, setSearch] = React.useState('');
    const [user, setUser] = React.useState<any>(null);
    const [roomId, setRoomId] = React.useState<any>('');
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

            setUsers(filteredUsers);
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
                    <div className='flex gap-4 w-full'>
                        <input
                            type='text'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full rounded-2xl p-3 bg-gray-100'
                        />
                        <button onClick={searchUser} className='bg-blue-500 text-white rounded-2xl p-3'>
                            Search
                        </button>
                    </div>
                    {users &&
                        users.map((user: any) => (
                            <button onClick={() => createRoom({userId: user.id})} key={user.id} >
                                <div className='bg-[#D8E5FD] rounded-xl p-4 flex flex-col gap-2 shadow-lg text-left'>
                                <h1>{user.data()?.name}</h1>
                                <h1>{user.data()?.email}</h1>
                                </div>
                            </button>
                        ))}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default UserList;


