import { deleteTweetFromFb } from "../db/tweets/deleteTweet";
interface Props {
    tweetId: string,
}
export async function deleteTweet({ tweetId }: Props) {
    console.log('delete')
    const response = await deleteTweetFromFb(tweetId);
    if (!response) {
        return { ok: false }
    }
    return { ok: true }
}