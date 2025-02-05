import { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { ImSearch } from "react-icons/im";
import { User } from '../../../interfaces/user';
import { useDebounce } from '../../../hooks/useDebounce';
import { getAllUsers } from './functions/users/getAllUsers';
import ModalUser from './components/ModalUser';
import UserCard from './components/UserCard';
import './styles/users.css'
import { useUserStore } from '../../../store/user_store';
import { useTweetStore } from '../../../store/twitter_store';
function Users() {
    const user = useUserStore(state=> state.user)
    const updateInfoFollwingUser= useUserStore(state => state.updateInfoFollwingUser)
    const dataTweets = useTweetStore(state => state.tweets)
    const [check, setCheck] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');
    const [userSeach, setUserSearch] = useState<User[]>([]);
    const [following, setFollowing] = useState<string[]>([]);
    const [userModalInfo, setUserModalInfo] = useState<User>();
    const [showModal, setShowModal] = useState(false);
    const [result] = useDebounce(search);
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearch(value)
    }
    function closeModal() {
        setShowModal(false)
    }
    function openModal() {
        setShowModal(true)
    }
    //Actualiza la informacion de usuarios que sigue al momento de dar click,en state(following) y db
    function updateUsersFollowing(usersFollowing: string[]) {
        setFollowing((prev)=> [...prev,...usersFollowing])
        updateInfoFollwingUser(usersFollowing);
    }
    //Se encarga de cargar la informacion de usurio respectiva en el modal
    function updateUserModalInfo(user: User) {
        setUserModalInfo(user)
    }
    useEffect(() => {
        if (!user) {
            return
        }
        //Al momento de cargar el componente cargar los usuarios existentes
        getAllUsers({ user}).then(users =>  setUsers(users));
        //Actualiza todos los usuarios que sigue
        setFollowing(user.following!)
    }, [user])
    //Efecto relacionado con la busqueda de usuario
    //Filtrara los usuarios alamacenados en el estaro users
    useEffect(() => {
        if (result === '') {
            setUserSearch(users)
            return
        }
        const userFind = users.filter(user => user.nick?.toLocaleLowerCase().includes(result.toLocaleLowerCase()));
        setUserSearch(userFind)
    }, [result, users])
    return (
        <aside className='section_users'>
            <label>
                <input
                    type="checkbox"
                    checked={check}
                    onChange={(e) => setCheck(e.target.checked)}
                />
                {!check ? <ImSearch size={15} /> : <FaArrowRight size={15} />}
            </label>
            <div className='content_search_user'>
                <div>
                    <input
                        type="text"
                        placeholder='Buscar @user...'
                        onChange={handleChange}
                        value={search}
                    />
                </div>
                <ul>
                    {
                        userSeach.length >= 1 ?
                            userSeach.map(userinfo => {
                                return <UserCard
                                    following={following}
                                    openModal={openModal}
                                    updateUserModalInfo={updateUserModalInfo}
                                    updateUsersFollowing={updateUsersFollowing}
                                    user={userinfo}
                                    key={userinfo.uid}
                                />
                            })
                            :
                            <p style={{ marginBottom: '1rem' }}>No hay usuarios</p>
                    }
                </ul>

                {(userModalInfo && showModal && user) &&
                    <ModalUser
                        closeModal={closeModal}
                        dataTweets={dataTweets}
                        following={following}
                        showModal={showModal}
                        userId={user.uid!}
                        userModalInfo={userModalInfo}
                        updateUsersFollowing={updateUsersFollowing}
                    />
                }
            </div>
        </aside>
    )
}

export default Users