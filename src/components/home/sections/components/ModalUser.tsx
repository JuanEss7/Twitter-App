import React, { useEffect, useState } from 'react'
import { Tweet } from '../../../../interfaces/tweet';
import { IoMdClose } from 'react-icons/io';
import ButtonFollow from './ButtonFollow';
import TweetComponent from './Tweet';
import { User } from '../../../../interfaces/user';
import { notification } from '../../../../utils/notification';
interface Props {
    userId: string
    dataTweets: Tweet[],
    userModalInfo: User,
    showModal: boolean,
    following: string[],
    closeModal: () => void,
    updateUsersFollowing: (users: string[]) => void,
}
type Select = "tweets" | "retweets";
function ModalUser({ userId, dataTweets, following, userModalInfo, showModal, closeModal, updateUsersFollowing }: Props) {
    const [tweetsUserModal, setTweetsUserModal] = useState<Tweet[]>([]);
    const [selectInfo, setSelectInfo] = useState<Select>("tweets");
    function handleChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        if (value === "tweets" || value === "retweets") {
            setSelectInfo(value);
        } else {
            notification({ message: 'Valor no es valido', type: 'error' })
        }
    }
    useEffect(() => {
        if (userModalInfo === undefined || userModalInfo === null) {
            return
        }
        if (dataTweets === null || dataTweets === undefined) {
            return
        }
        if (selectInfo === 'retweets') {
            setTweetsUserModal(dataTweets.filter((tweet: Tweet) => tweet.retweet.includes(userModalInfo.uid!)));
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
        <>
            <div className={`container-modal ${showModal ? 'visible' : ''}`}>
                <IoMdClose className='icon_close_modal' fill='#fff' size={30} onClick={closeModal} />
                <div className='container_user_info_modal'>
                    <img
                        src={`${userModalInfo?.photoURL}`}
                        alt={`Imagen del usurio ${userModalInfo.name}`}
                    />
                    <h3>{userModalInfo?.name}</h3>
                    <span className='nick'>@{userModalInfo?.nick}</span>
                    <ButtonFollow
                        userId={userModalInfo.uid!}
                        following={following}
                        updateUsersFollowing={updateUsersFollowing}
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
                                    userId={userId}
                                    key={tweet.tweetId}
                                />
                            })
                            :
                            <span>No hay {selectInfo}</span>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ModalUser