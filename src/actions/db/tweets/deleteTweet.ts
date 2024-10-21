import { doc, deleteDoc, collection } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
export async function deleteTweetFromFb(tweetId: string) {
    if (!tweetId) {
        return false
    }
    try {
        const dbRef = collection(db, 'tweets');
        const docRef = doc(dbRef, tweetId);
        await deleteDoc(docRef)
        return true
    } catch (error) {
        console.log('Ocurrio un error al eliminar el tweet', error)
        return false
    }
}