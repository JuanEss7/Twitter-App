import { Tweet } from "./tweet";
import { User } from "./user";

export interface ContextInterface {
    user: User | null,
    setUserProfile: (user: User | null) => void,
    dataTweets: Tweet[],
    updateDataTweets: (tweet: Tweet) => void,
    handleClickDeleteTweet: ({ tweetId, creatorTweetId }: { tweetId: string; creatorTweetId: string; }) => Promise<void>,
    handleClickUpdateTweet: ({ tweet, action }: { tweet: Tweet, action: 'like' | 'retweet' }) => Promise<void>,
    fillStateDataTweets: () => Promise<void>
}