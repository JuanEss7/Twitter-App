import { AiOutlineRetweet } from 'react-icons/ai'
import { IoMdHeart, IoMdHeartEmpty, IoMdTrash } from 'react-icons/io'
import { User } from '../../../../interfaces/user'
import { Tweet } from '../../../../interfaces/tweet'
import { useContext } from 'react';
import { Context } from '../../../../context/context';
interface Props {
    user: User,
    tweet: Tweet,
}
function TweetComponent({ tweet, user }: Props) {
    const context = useContext(Context);
    const { handleClickDeleteTweet, handleClickUpdateTweet } = context!;
    return (
        <li className='tweet'>
            <img src={tweet.photoUser} alt={`Imagen del usuario ${tweet.name}`} />
            <div>
                <div><h3>{tweet.name}</h3><span className="nick">@{tweet.nick} - {tweet.date}</span></div>
                <p>{tweet.tweet}</p>
                {tweet.imageTweet && <img src={tweet.imageTweet} alt="Imagen de publicacion" className='image_user' />}
                <section className="icons_container">
                    <div
                        className="icons_container-div"
                        onClick={() => handleClickUpdateTweet({ tweet, action: 'like' })}>
                        {tweet.like.includes(user.uid) ?
                            <IoMdHeart
                                size={20}
                                className="icon"
                                fill="red"
                            />
                            :
                            <IoMdHeartEmpty
                                size={20}
                                className="icon"
                            />
                        }
                        {tweet.like.length}
                    </div>
                    <div
                        className="icons_container-div"
                        onClick={() => handleClickUpdateTweet({ tweet, action: 'retweet' })}>
                        <AiOutlineRetweet
                            size={20}
                            className="icon"
                            fill={`${tweet.retweet.includes(user.uid) ? '#19aee6' : '#fff'}`}
                        />
                        {tweet.retweet.length}
                    </div>

                    {user.uid === tweet.uid &&
                        <div
                            className="icons_container-div delete"
                            onClick={() => handleClickDeleteTweet({ tweetId: tweet.tweetId, creatorTweetId: tweet.uid })}>
                            <IoMdTrash
                                size={20}
                                className="icon"
                            />
                        </div>}
                </section>
            </div>
        </li>
    )
}

export default TweetComponent