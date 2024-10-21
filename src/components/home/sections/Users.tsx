import { useContext, useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { ImSearch } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { User } from '../../../interfaces/user';
import { getAllUsersOfDb } from '../../../actions/db/getAllUsers';
import { useDebounce } from '../../../hooks/useDebounce';
import { Tweet } from '../../../interfaces/tweet';
import ButtonFollow from './components/ButtonFollow';
import { updateUser } from '../../../actions/db/updateUser';
import TweetComponent from './components/Tweet';
import { Context } from '../../../context/context';
import './styles/users.css'
interface Props {
    user: User
    setUserProfile: (user: User) => void
}
function Users({ user, setUserProfile }: Props) {
    const { dataTweets } = useContext(Context);
    const [check, setCheck] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');
    const [userSeach, setUserSearch] = useState<User[]>([]);
    const [following, setFollowing] = useState<string[]>([]);
    const [userModalInfo, setUserModalInfo] = useState<User>();
    const [tweetsUserModal, setTweetsUserModal] = useState<Tweet[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectInfo, setSelectInfo] = useState<'tweets' | "retweets">('tweets');
    const [result] = useDebounce(search);
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearch(value)
    }
    function handleChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value as "tweet" | "retweet";
        setSelectInfo(value)
    }
    async function getAllUsers() {
        const { ok, usersInDb } = await getAllUsersOfDb({ uid: user?.uid });
        if (!ok) {
            setUsers([])
        }
        setUsers(usersInDb)
    }
    useEffect(() => {
        if (!user) {
            return
        }
        getAllUsers();
        setFollowing(user.following)
    }, [])

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
        updateUser({ newInfoUser })
            .then(res => console.log({ res }))
            .catch(err => console.log({ err }));
        setUserProfile(newInfoUser)
    }, [following])
    useEffect(() => {
        if (userModalInfo === undefined || userModalInfo === null) {
            return
        }
        if (dataTweets === null || dataTweets === undefined) {
            return
        }
        console.log({ selectInfo })
        if (selectInfo === 'retweets') {
            setTweetsUserModal(dataTweets.filter((tweet: Tweet) => tweet.retweet.includes(userModalInfo.uid)));
        } else {
            setTweetsUserModal(dataTweets.filter((tweet: Tweet) => tweet.uid === userModalInfo.uid));
        }
    }, [userModalInfo, dataTweets, selectInfo])
    useEffect(() => {
        const body = document.querySelector('body') as HTMLBodyElement;
        if (showModal) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }

        return () => {
            body.classList.remove('no-scroll');
        };
    }, [showModal])
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
                                return <li
                                    className='user_card'
                                    key={user?.uid}
                                >
                                    <img src={user?.photoURL} alt={`Imagen del usurio ${user.name}`} />
                                    <div>
                                        <h5
                                            onClick={() => {
                                                setUserModalInfo(user);
                                                setShowModal(true)
                                            }}
                                        >{user?.name}</h5>
                                        <span className='nick'>@{user?.nick}</span>
                                    </div>
                                    <ButtonFollow
                                        user={user}
                                        following={following}
                                        setFollowing={setFollowing}
                                        style={{ position: 'absolute', right: '.4rem', padding: '.5rem .4rem' }}
                                    />
                                </li>
                            })
                            :
                            <p style={{ marginBottom: '1rem' }}>No hay usuarios</p>
                    }
                </ul>

                {(userModalInfo && showModal) && <div className='container-modal'>
                    <IoMdClose className='icon_close_modal' fill='#fff' size={30} onClick={() => setShowModal(false)} />
                    <div className='container_user_info_modal'>
                        <img
                            src={`${userModalInfo?.photoURL}`}
                            alt={`Imagen del usurio ${userModalInfo.name}`}
                        />
                        <h3>{userModalInfo?.name}</h3>
                        <span className='nick'>@{userModalInfo?.nick}</span>
                        <ButtonFollow
                            user={userModalInfo}
                            following={following}
                            setFollowing={setFollowing}
                        />
                        <select value={selectInfo} onChange={handleChangeSelect}>
                            <option value="tweets">Tweets</option>
                            <option value="retweets">Retweets</option>
                        </select>
                        <ul>
                            {tweetsUserModal.length >= 1 ?
                                tweetsUserModal.map(tweet => {
                                    return <TweetComponent
                                        tweet={tweet}
                                        user={user}
                                        key={tweet.tweetId}
                                    />
                                })
                                :
                                <span>No hay {selectInfo}</span>
                            }
                        </ul>
                    </div>
                </div>}
            </div>
        </aside>
    )
}

export default Users