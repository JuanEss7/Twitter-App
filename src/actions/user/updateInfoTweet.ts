import { Tweet } from "../../interfaces/tweet";
import { User } from "../../interfaces/user";
import { updateInfoTweetInFb } from "../db/tweets/updateInfoTweet";
interface Props {
    tweet: Tweet,
    action: 'like' | 'retweet',
    user: User
}
export async function updateInfoTweet({ tweet, action, user }: Props) {
    console.log('click')
    console.log(action)
    if (action === 'like') {
        const likesArray = !tweet.like.includes(user.uid) ? [...tweet.like, user.uid] : tweet.like.filter(id => id !== user.uid)
        const newTweet: Tweet = { ...tweet, like: likesArray };
        const response = await updateInfoTweetInFb({ tweet: newTweet });
        if (!response) {
            return { ok: false, newTweet: null }
        }
        return { ok: true, newTweet }
    } else if (action === 'retweet' && tweet.uid !== user.uid) {
        const retweetsArray = !tweet.retweet.includes(user.uid) ? [...tweet.retweet, user.uid] :
            tweet.retweet.filter(id => id !== user.uid)
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