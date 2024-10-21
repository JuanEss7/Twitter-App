import { db } from "../../../firebase/firebase";
import { Tweet } from "../../../interfaces/tweet";
import { collection, doc, setDoc } from 'firebase/firestore';

interface Props {
    tweet: Tweet
}
export async function addTweet({ tweet }: Props) {
    try {
        const dbRef = collection(db, 'tweets');
        const docTweet = doc(dbRef, tweet.tweetId);
        await setDoc(docTweet, tweet);
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}