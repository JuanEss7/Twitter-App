import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import Header from "../components/header/Header";
import { User } from "../interfaces/user";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebase/firebase";
import { deleteTweet } from "../actions/user/deleteTweet";
import { notification } from "../utils/notification";
import { updateInfoTweet } from "../actions/user/updateInfoTweet";
import { Tweet } from "../interfaces/tweet";
import { getAllTweets } from "../actions/db/tweets/getAllTweets";
import { ContextInterface } from "../interfaces/context";
interface ContextProviderProps {
    children: ReactNode;
}

export const Context = createContext<ContextInterface | null>(null);

export default function ContextProvider({ children }: ContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    //Estado que representara todos los tweets que se mostraran en el home
    const [dataTweets, setDataTweets] = useState<Tweet[]>([]);
    //Funcion encargada de rellenar el estado "dataTweets" al momento de renderizar el home
    async function fillStateDataTweets() {
        const { ok, tweets } = await getAllTweets();
        if (!ok) {
            setDataTweets([])
            return
        }
        setDataTweets(tweets)
    }
    //Funcion que se ejecutara al momento de eliminar un tweet
    async function handleClickDeleteTweet({ tweetId, creatorTweetId }: { tweetId: string, creatorTweetId: string }) {
        if (creatorTweetId !== user?.uid) {
            return
        }
        const response = await deleteTweet({ tweetId });
        if (!response?.ok) {
            notification({ message: 'Ocurrio un error al eliminar el tweet', type: 'error' })
            return
        }
        const newDataTweets = dataTweets.filter((tweet) => tweet.tweetId !== tweetId)
        setDataTweets(newDataTweets)
        notification({ message: 'Tweet eliminado correctamente', type: 'success' })
    }
    //Funcion que se ejecutara al momento de darle like o retweet a un tweet
    async function handleClickUpdateTweet({ tweet, action }: { tweet: Tweet, action: 'like' | 'retweet' }) {
        if (!tweet.uid || !tweet.tweetId || !user?.uid) {
            return
        }
        const res = await updateInfoTweet({ tweet, action, user });
        if (!res?.ok) {
            notification({ message: 'Ocurrio un erro al realizar la accion', type: 'error' })
            return
        }
        const newDataTweets = dataTweets.map((tweet) => {
            if (tweet.tweetId === res?.newTweet?.tweetId) {
                return res.newTweet
            }
            return tweet
        })
        setDataTweets(newDataTweets)
        return
    }
    function updateDataTweets(tweet: Tweet) {
        setDataTweets(prev => [tweet, ...prev])
    }
    const setUserProfile = useCallback((userInfo: User | null) => {
        setUser(userInfo)
    }, [])
    useEffect(() => {
        onAuthStateChanged(auth, (usercount) => {
            if (usercount) {
                const { email, photoURL, uid } = usercount;
                setUser({ email, photoURL, uid });
            } else {
                setUser(null)
                console.log('No hay usuario')
            }
        })
    }, [])
    return (
        <Context.Provider value={{
            user,
            setUserProfile,
            dataTweets,
            updateDataTweets,
            handleClickDeleteTweet,
            handleClickUpdateTweet,
            fillStateDataTweets
        }}>
            <Header />
            {children}
        </Context.Provider >
    )
}