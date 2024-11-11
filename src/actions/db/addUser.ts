import { db } from '../../firebase/firebase';
import { User } from '../../interfaces/user';
import { collection, doc, setDoc } from 'firebase/firestore'
export async function addUserToDb(user: User) {
    try {
        const dbRef = collection(db, 'users');
        const docUser = doc(dbRef, user.uid);
        await setDoc(docUser, user)
        return {
            ok: true,
            message: ''
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Ocurrio un error intentalo mas tarde.'
        }
    }
}