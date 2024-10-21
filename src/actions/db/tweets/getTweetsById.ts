import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { Tweet } from "../../../interfaces/tweet";
interface Props {
    uid: string
}
export async function getTweetsById({ uid }: Props) {
    try {
        const dbRef = collection(db, 'tweets');
        const q = query(dbRef, where('uid', '==', uid));
        const querySnapchot = await getDocs(q);
        const tweets = querySnapchot.docs.map(doc => doc.data()) as Tweet[];
        return {
            ok: true,
            tweets
        }
    } catch (error) {
        console.error('Error al obtener los tweets del usario:' + uid, error);
        return {
            ok: false,
            tweets: []
        }
    }

}