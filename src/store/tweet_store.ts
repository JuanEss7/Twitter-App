import { create } from "zustand";
import { Tweet } from "../interfaces/tweet";
import { getAllTweets } from "../actions/db/tweets/getAllTweets";
import { notification } from "../utils/notification";
import { updateInfoTweet } from "../actions/user/updateInfoTweet";
import { deleteTweet } from "../actions/user/deleteTweet";
interface ActionTweetInterface {
    tweet: Tweet
    action: 'like' | 'retweet'
    userId: string
}
interface DeleteTweetInterface {
    tweetId: string
    creatorTweetId: string
    userId: string
}
interface TweetStoreInterface {
    tweets: Tweet[]
    addNewTweet: (tweet: Tweet) => void
    fillStateDataTweets: () => Promise<void>
    handleActionTweet: ({ action, tweet, userId }: ActionTweetInterface) => Promise<void>
    handleDeleteTweet: ({ tweetId, creatorTweetId }: DeleteTweetInterface) => Promise<void>
}
export const useTweetStore = create<TweetStoreInterface>((set, get) => ({
    tweets: [],
    addNewTweet: (tweet: Tweet) => {
        set((state) => ({ tweets: [tweet, ...state.tweets] }))
    },
    fillStateDataTweets: async () => {
        //Obtengo los datos de firebase db
        const { ok, tweets } = await getAllTweets();
        if (!ok) {
            set(() => ({ tweets: [] }))
            notification({ message: 'Ocurrio un error al obtener los Tweets', type: 'error' })
            return
        }
        set(() => ({ tweets }))
    },
    handleActionTweet: async ({ action, tweet, userId }) => {
        if (!tweet.uid || !tweet.tweetId || !userId) {
            return
        }
        const tweets = get().tweets;
        //Devuelve el tweet actualizado
        const res = await updateInfoTweet({ tweet, action, userId });
        if (!res.ok) {
            notification({ message: 'Ocurrio un erro al realizar la accion', type: 'error' })
            return
        }
        const newDataTweets = tweets.map((tweet) => {
            if (tweet.tweetId === res?.newTweet?.tweetId) {
                return res.newTweet //Devuelvo el nuevo tweet con la informacion nueva
            }
            return tweet
        })
        //Actulizando informacion de estado
        set(() => ({ tweets: newDataTweets }))
        return
    },
    handleDeleteTweet: async ({ tweetId, creatorTweetId,userId }) => {
        //Si el creador del tweet es difente a el usuario que esta en session
        if (creatorTweetId !== userId) {
            return
        }
        //ELiminando tweet en firebase db
        const response = await deleteTweet({ tweetId });
        if (!response?.ok) {
            notification({ message: 'Ocurrio un error al eliminar el tweet', type: 'error' })
            return
        }
        const tweets = get().tweets;
        //Eliminando tweet del estado
        const newDataTweets = tweets.filter((tweet) => tweet.tweetId !== tweetId)
        //Actulizando informacion de estado
        set(()=> ({tweets: newDataTweets}))
        notification({ message: 'Tweet eliminado correctamente', type: 'success' })
    },
}))