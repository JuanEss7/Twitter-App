import { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { ImSearch } from "react-icons/im";
import { User } from '../../../interfaces/user';
import { useDebounce } from '../../../hooks/useDebounce';
import { Tweet } from '../../../interfaces/tweet';
import { updateUser } from '../../../actions/db/updateUser';
import { getAllUsers } from './functions/users/getAllUsers';
import ModalUser from './components/ModalUser';
import UserCard from './components/UserCard';
import './styles/users.css'
interface Props {
    user: User
    setUserProfile: (user: User) => void,
    dataTweets: Tweet[]

}
function Users({ dataTweets, setUserProfile, user }: Props) {
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
    function setStateUsers(users: User[] | []) {
        setUsers(users)
    }
    function closeModal() {
        setShowModal(false)
    }
    function openModal() {
        setShowModal(true)
    }
    function updateUsersFollowing(usersFollowing: string[]) {
        setFollowing(usersFollowing)
    }
    function updateUserModalInfo(user: User) {
        setUserModalInfo(user)
    }
    useEffect(() => {
        if (!user) {
            return
        }
        getAllUsers({ user, setStateUsers });
        setFollowing(user.following!)
    }, [user])
    useEffect(() => {
        if (result === '') {
            setUserSearch(users)
            return
        }
        const userFind = users.filter(user => user.nick?.toLocaleLowerCase().includes(result.toLocaleLowerCase()));
        setUserSearch(userFind)
    }, [result, users])
    useEffect(() => {
        const newInfoUser = { ...user, following: following };
        const updateUserInfo = async () => {
            try {
                const res = await updateUser({ newInfoUser });
                if (res) {
                    setUserProfile(newInfoUser);
                    return
                }
            } catch (err) {
                console.error('Error al actualizar el usuario:', err);
            }
        };
        updateUserInfo();
    }, [following, user, setUserProfile])
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
                            userSeach.map(user => {
                                return <UserCard
                                    following={following}
                                    openModal={openModal}
                                    updateUserModalInfo={updateUserModalInfo}
                                    updateUsersFollowing={updateUsersFollowing}
                                    user={user}
                                    key={user.uid}
                                />
                            })
                            :
                            <p style={{ marginBottom: '1rem' }}>No hay usuarios</p>
                    }
                </ul>

                {(userModalInfo && showModal) &&
                    <ModalUser
                        closeModal={closeModal}
                        dataTweets={dataTweets}
                        following={following}
                        showModal={showModal}
                        user={user!}
                        userModalInfo={userModalInfo}
                        updateUsersFollowing={updateUsersFollowing}
                    />
                }
            </div>
        </aside>
    )
}

export default Users