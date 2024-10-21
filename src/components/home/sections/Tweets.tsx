import { IoImageOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useFileReader } from "../../../hooks/useFileReader";
import { notification } from "../../../utils/notification";
import { saveTweetPhotoInStorage } from "../../../actions/storage/tweets/saveTweetImage";
import { Tweet } from '../../../interfaces/tweet';
import { User } from "../../../interfaces/user";
import { addTweet } from "../../../actions/db/tweets/addTweet";
import { getTweetImageOfStorage } from "../../../actions/storage/tweets/getImageTweet";
import TweetComponent from "./components/Tweet";
import './styles/tweets.css'
import { Context } from "../../../context/context";
interface Props {
    user: User,
}
function Tweets({ user }: Props) {
    const { dataTweets, setDataTweets } = useContext(Context);
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
        const tweetId = crypto.randomUUID();
        let imageTweetUrl;
        if (src) {
            const response = await saveTweetPhotoInStorage({ base64: result, image: imageFile, tweetId })
            if (!response?.ok) {
                notification({ message: 'Ocurrio un error al subir la imagen del tweet, intentalo mas tarde', type: 'error' });
                return
            }
            const urlImg = response.uploadRef?.metadata.fullPath;
            const { ok, imageUrl, message } = await getTweetImageOfStorage({ photoURL: urlImg! });
            if (!ok) {
                notification({ message, type: 'error' });
                return
            }
            imageTweetUrl = imageUrl;
        }
        const date = new Date().toDateString().split(' ');
        const newTweet: Tweet = {
            uid: user.uid,
            tweetId,
            photoUser: user.photoURL!,
            nick: user.nick!,
            name: user.name!,
            date: `${date[2]} ${date[1]} ${date[3]}`,
            tweet,
            imageTweet: imageTweetUrl ?? '',
            like: [],
            retweet: []
        }
        console.log({ newTweet, imageTweetUrl })
        //Agregar tweet a la base de datos
        const success = await addTweet({ tweet: newTweet });
        if (!success) {
            notification({ message: 'Ocurrio un error al hacer el tweet, intentalo mas tarde', type: 'error' });
            return
        }
        //Actualizar el estado
        setDataTweets(prev => [newTweet, ...prev])
        setSrc(undefined);
        setFileReader(undefined)
        data.set('tweet', '')
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
                <img src={user?.photoURL} alt="Imagen del usuario" />
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