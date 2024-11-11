import { doc, collection, setDoc } from "firebase/firestore";
import { User } from "../../interfaces/user";
import { db } from "../../firebase/firebase";

interface Props {
    newInfoUser: User 
}
export async function updateUser({ newInfoUser }: Props) {
    if (!newInfoUser) {
        return
    }
    const { uid } = newInfoUser;
    try {
        const dbRef = collection(db, 'users');
        const docRef = doc(dbRef, uid)
        await setDoc(docRef, newInfoUser)
        return {
            save: true
        }
    } catch (error) {
        console.log(error)
        return {
            save: false
        }
    }
}