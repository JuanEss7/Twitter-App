import { db } from "../../../firebase/firebase";
import { Tweet } from "../../../interfaces/tweet";
import { doc, setDoc, collection } from 'firebase/firestore'
interface Props {
    tweet: Tweet
}
export async function updateInfoTweetInFb({ tweet }: Props) {
    if (!tweet.tweetId) {
        return false
    }
    try {
        const dbRef = collection(db, 'tweets');
        const docRef = doc(dbRef, tweet.tweetId);
        await setDoc(docRef, tweet)
        return true
    } catch (error) {
        console.log('Ocurrio un error al actualizar el tweet', error)
        return false
    }
}