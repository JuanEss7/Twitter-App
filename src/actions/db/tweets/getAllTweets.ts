import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { Tweet } from '../../../interfaces/tweet';
export async function getAllTweets() {
    try {
        const dbRef = collection(db, 'tweets');
        const info = await getDocs(dbRef);
        const tweets = info.docs.map(doc => doc.data()) as Tweet[];
        return {
            ok: true,
            tweets
        }
    } catch (error) {
        console.error('Error al obtener los tweets:', error);
        return {
            ok: false,
            tweets: []
        }
    }
}