import { AiOutlineRetweet } from 'react-icons/ai'
import { IoMdHeart, IoMdHeartEmpty, IoMdTrash } from 'react-icons/io'
import { Tweet } from '../../../../interfaces/tweet'
import { useTweetStore } from '../../../../store/twitter_store';
interface Props {
    userId: string,
    tweet: Tweet,
}
function TweetComponent({ tweet, userId}: Props) {
    const handleActionTweet = useTweetStore(state => state.handleActionTweet)
    const handleDeleteTweet = useTweetStore(state => state.handleDeleteTweet)
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
                        onClick={() => handleActionTweet({ tweet, action: 'like',userId })}>
                        {tweet.like.includes(userId) ?
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
                        onClick={() => handleActionTweet({ tweet, action: 'retweet',userId })}>
                        <AiOutlineRetweet
                            size={20}
                            className="icon"
                            fill={`${tweet.retweet.includes(userId) ? '#19aee6' : '#fff'}`}
                        />
                        {tweet.retweet.length}
                    </div>

                    {userId === tweet.uid &&
                        <div
                            className="icons_container-div delete"
                            onClick={() => handleDeleteTweet({ tweetId: tweet.tweetId, creatorTweetId: tweet.uid, userId })}>
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