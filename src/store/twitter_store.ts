import { create } from "zustand";
import { Tweet } from "../interfaces/tweet";
import { getAllTweets } from "../actions/db/tweets/getAllTweets";
import { notification } from "../utils/notification";
import { updateInfoTweet } from "../actions/user/updateInfoTweet";
import { deleteTweet } from "../actions/user/deleteTweet";
import { User } from "../interfaces/user";
import { saveTweetPhotoInStorage } from "../actions/storage/tweets/saveTweetImage";
import { getTweetImageOfStorage } from "../actions/storage/tweets/getImageTweet";
import { addTweet } from "../actions/db/tweets/addTweet";
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
interface MakeTweetInterface {
    src?: string,
    user: User,
    tweet: string,
    imageFile?: File | null
}
interface TweetStoreInterface {
    tweets: Tweet[]
    addNewTweet: (tweet: Tweet) => void
    fillStateDataTweets: () => Promise<void>
    handleActionTweet: ({ action, tweet, userId }: ActionTweetInterface) => Promise<void>
    handleDeleteTweet: ({ tweetId, creatorTweetId }: DeleteTweetInterface) => Promise<void>
    makeTweet: ({ tweet, user, imageFile, src }: MakeTweetInterface) => Promise<Tweet | undefined>
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
    handleDeleteTweet: async ({ tweetId, creatorTweetId, userId }) => {
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
        set(() => ({ tweets: newDataTweets }))
        notification({ message: 'Tweet eliminado correctamente', type: 'success' })
    },
    makeTweet: async ({ tweet, user, imageFile, src }) => {
        const tweetId = crypto.randomUUID();
        const addNewTweet = get().addNewTweet;
        let imageTweetUrl;
        if (src) {
            const response = await saveTweetPhotoInStorage({ base64: src, image: imageFile!, tweetId })
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
            uid: user.uid!,
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
        //Agregar tweet a la base de datos
        const success = await addTweet({ tweet: newTweet });
        if (!success) {
            notification({ message: 'Ocurrio un error al hacer el tweet, intentalo mas tarde', type: 'error' });
            return
        }
        //Agregando el nuevo tweet al store
        addNewTweet(newTweet)
        return newTweet
    },
}))