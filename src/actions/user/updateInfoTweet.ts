import { Tweet } from "../../interfaces/tweet";
import { updateInfoTweetInFb } from "../db/tweets/updateInfoTweet";
interface Props {
    tweet: Tweet,
    action: 'like' | 'retweet',
    userId:string
}
//Funcion que actualiza la informacion en likes y retweet de un tweet en la firebase store
export async function updateInfoTweet({ tweet, action, userId }: Props) {
    if (action === 'like') {
        //Si no incluye la id del usurio la agrega sino, la elimina
        const likesArray = !tweet.like.includes(userId) ? [...tweet.like, userId] : tweet.like.filter(id => id !== userId)
        const newTweet: Tweet = { ...tweet, like: likesArray };
        const response = await updateInfoTweetInFb({ tweet: newTweet });
        if (!response) {
            return { ok: false, newTweet: null }
        }
        return { ok: true, newTweet }
    } else if (action === 'retweet' && tweet.uid !== userId) {
         //Si no incluye la id del usurio la agrega sino, la elimina
        const retweetsArray = !tweet.retweet.includes(userId) ? [...tweet.retweet, userId] :
            tweet.retweet.filter(id => id !== userId)
        const newTweet: Tweet = { ...tweet, retweet: retweetsArray };
        const response = await updateInfoTweetInFb({ tweet: newTweet })
        if (!response) {
            return { ok: false, newTweet: null }
        }
        return { ok: true, newTweet }
    } else {
        return { ok: false, newTweet: null }
    }
}