export interface Tweet {
    uid: string,
    tweetId: string,
    photoUser: string,
    nick: string,
    name: string,
    tweet: string,
    date: string,
    imageTweet?: string,
    like: string[],
    retweet: string[]
}