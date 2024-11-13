import { collection, getDocs, where, query } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { User } from "../../interfaces/user";

interface Props {
    uid: string
}
export async function getAllUsersOfDb({ uid }: Props) {
    try {
        const dbRef = collection(db, 'users');
        const q = query(dbRef, where('uid', '!=', uid));
        const userDocs = await getDocs(q);
        const usersInDb = userDocs.docs.map(doc => doc.data()) as User[];
        return {
            ok: true,
            usersInDb
        }
    } catch (error) {
        console.log('Error al traer usuarios de db', error);
        return {
            ok: false,
            usersInDb: []
        }
    }
}