import { IoImageOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useFileReader } from "../../../hooks/useFileReader";
import { notification } from "../../../utils/notification";
import { Tweet } from '../../../interfaces/tweet';
import { User } from "../../../interfaces/user";
import TweetComponent from "./components/Tweet";
import { makeTweet } from "./functions/tweets/MakeTweet";
import './styles/tweets.css'
interface Props {
    user: User,
    dataTweets: Tweet[]
    updateDataTweets: (tweet: Tweet) => void
}
function Tweets({ user, dataTweets, updateDataTweets }: Props) {
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [src, setSrc] = useState<string | undefined>();
    const { result, setFileReader, errorMessage } = useFileReader();
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputFile = e.target.files?.[0];
        if (!inputFile) {
            return;
        }
        setFileReader(inputFile)
        setImageFile(inputFile)
    }
    function handleClick() {
        inputFileRef?.current?.click();
    }
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        const tweet = data.get('tweet') as string;
        if (!src || !imageFile || typeof src !== 'string') return
        const newTweet = await makeTweet({ src, imageFile, tweet, user })
        //Actualizar el estado
        if (newTweet) {
            updateDataTweets(newTweet)
            setSrc(undefined);
            setFileReader(undefined)
            data.set('tweet', '')
        }
    }
    useEffect(() => {
        if (errorMessage) {
            notification({ message: errorMessage, type: 'error' });
            return
        }
        if (!result) return
        setSrc(result)
    }, [result, errorMessage])
    return (
        <main className='section_tweets'>
            <div><FaTwitter size={20} /><BsStars size={20} /></div>
            <form className='container_make_tweet' onSubmit={handleSubmit}>
                <img src={user.photoURL!} alt="Imagen del usuario" />
                <div className="container_tweet">
                    <textarea name='tweet' placeholder='Escribe algo...' />
                    {src && <img className='image_tweet' src={src} alt="Imagen de tweet" />}
                    <div className="container_buttons_tweet">
                        <IoImageOutline
                            size={25}
                            onClick={handleClick}
                            className="icon"
                        />
                        <input
                            ref={inputFileRef}
                            name='image'
                            accept='image/*'
                            type="file"
                            onChange={handleChange}
                        />
                        <button type="submit">Tweet</button>
                    </div>
                </div>
            </form>
            <ul className='tweets'>
                {
                    (dataTweets !== null && dataTweets.length >= 1) ?
                        dataTweets.map((tweet: Tweet) => {
                            return <TweetComponent
                                user={user}
                                tweet={tweet}
                                key={tweet.tweetId}
                            />
                        })
                        :
                        <p style={{ textAlign: 'center' }}>No hay tweets</p>
                }
            </ul>
        </main>
    )
}

export default Tweets